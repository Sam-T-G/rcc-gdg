#!/usr/bin/env bash
# Bundle one standalone page (not a deck) and, with --push, publish it to the gh-pages branch at <path>/.
#
# Usage: scripts/publish-page.sh <page.html> <path> [--push]
# Example: scripts/publish-page.sh semesters/2026-fall/decks/2026-10-15-invent-a-product-media/cheatsheet.html guides/invent-a-product --push
#
# For pages that travel with a deck, like a cheat sheet behind a QR code or an organizers' page.
# The page is bundled into one file with deck-kit/bundle.mjs (local stylesheets, scripts, and images
# inlined; fonts stay on their CDN) and written to a temporary folder outside the repo. With --push,
# only <path>/index.html is replaced on gh-pages, so pages published under it (<path>/<child>/) and
# everything else, including decks/ (scripts/publish-deck.sh owns that), stay as published.
# GitHub Pages then serves it at https://sam-t-g.github.io/rcc-gdg/<path>/.
# Works with bash 3.2 (macOS default) and Linux bash. Run from anywhere; paths resolve from the script.
set -euo pipefail

usage() {
  cat <<'USAGE'
usage: scripts/publish-page.sh <page.html> <path> [--push]

  <page.html>  the source page, inside this repo
  <path>       where it is served: lowercase segments of letters, digits, and hyphens joined by /,
               e.g. guides/invent-a-product. Not decks/ (publish-deck.sh) and not the site root.
  --push       also replace <path>/index.html on the gh-pages branch on origin
USAGE
}

die() { printf 'publish-page.sh: %s\n' "$*" >&2; exit 1; }

page=""; path=""; push=0
for a in "$@"; do
  case "$a" in
    -h|--help) usage; exit 0;;
    --push) push=1;;
    -*) usage >&2; exit 2;;
    *) if [ -z "$page" ]; then page="$a"; elif [ -z "$path" ]; then path="$a"; else usage >&2; exit 2; fi;;
  esac
done
[ -n "$page" ] && [ -n "$path" ] || { usage >&2; exit 2; }
printf '%s' "$path" | grep -Eq '^[a-z0-9]+(-[a-z0-9]+)*(/[a-z0-9]+(-[a-z0-9]+)*)*$' || die "path must be lowercase segments joined by /: $path"
case "$path" in decks|decks/*) die "decks/ belongs to scripts/publish-deck.sh";; esac

page_abs="$(cd "$(dirname "$page")" && pwd)/$(basename "$page")"
[ -f "$page_abs" ] || die "no page at $page"
root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"
case "$page_abs" in "$root"/*) ;; *) die "the page must live inside this repo";; esac
page_rel="${page_abs#"$root"/}"

out="${TMPDIR:-/tmp}/rcc-gdg-site/$path"
rm -rf "$out"
mkdir -p "$out"
node deck-kit/bundle.mjs "$page_rel" "$out/index.html"

# A published page must not reach for a local file the bundler could not inline.
if grep -Eo '(src|href)="[^"]+"' "$out/index.html" | grep -Ev '"(https?:|data:|#|mailto:)' | grep -q .; then
  grep -Eo '(src|href)="[^"]+"' "$out/index.html" | grep -Ev '"(https?:|data:|#|mailto:)' | sed 's/^/  unresolved: /' >&2
  die "the bundle still points at local files"
fi

printf 'built %s/index.html from %s\n' "$out" "$page_rel"
[ "$push" -eq 1 ] || exit 0

remote="$(git remote get-url origin)"
owner_repo="$(printf '%s' "$remote" | sed -E 's#^(https://github.com/|git@github.com:)##; s#\.git$##')"
owner="$(printf '%s' "${owner_repo%%/*}" | tr '[:upper:]' '[:lower:]')"
url="https://$owner.github.io/${owner_repo#*/}/$path/"

source_rev="$(git rev-parse --short HEAD)"
[ -z "$(git status --porcelain -- "$page_rel")" ] || source_rev="$source_rev with uncommitted changes"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

git ls-remote --exit-code --heads origin gh-pages >/dev/null 2>&1 || die "no gh-pages branch on origin yet; publish a deck or the site first"
git clone --quiet --branch gh-pages --single-branch "$remote" "$tmp"

touch "$tmp/.nojekyll"   # serve files as-is; no Jekyll processing
mkdir -p "$tmp/$path"
cp "$out/index.html" "$tmp/$path/index.html"
git -C "$tmp" add -A
if git -C "$tmp" diff --cached --quiet; then
  printf 'gh-pages already has this build; nothing to push\n'
  exit 0
fi
git -C "$tmp" commit --quiet -m "Publish page $path from $source_rev ($page_rel)"
git -C "$tmp" push --quiet origin gh-pages
printf 'pushed %s to gh-pages; GitHub Pages serves it at %s\n' "$path" "$url"
