#!/usr/bin/env bash
# Build the club landing page into site/ and, with --push, publish it to the gh-pages branch.
#
# Usage: scripts/publish-site.sh <YYYY-term> [--push]
# Example: scripts/publish-site.sh 2026-fall --push
#
# Source: semesters/<YYYY-term>/landing-page/ (index.html, favicon.svg, og.png, apple-touch-icon.png).
# The build copies that folder, docs/04-brand/design-system/tokens.css, and the horizontal logo the
# page uses into site/ (gitignored). Without --push it stops there so you can open site/index.html.
# With --push it commits site/ to the gh-pages branch on origin, which GitHub Pages serves at
# https://sam-t-g.github.io/rcc-gdg/. gh-pages holds build output only; never edit it by hand.
# Works with bash 3.2 (macOS default) and Linux bash. Run from anywhere; paths resolve from the script.
set -euo pipefail

usage() {
  cat <<'USAGE'
usage: scripts/publish-site.sh <YYYY-term> [--push]

  <YYYY-term>  semester folder that holds landing-page/, e.g. 2026-fall
  --push       also commit the build to the gh-pages branch on origin

Builds site/ from semesters/<YYYY-term>/landing-page/ plus tokens.css and the horizontal logo.
USAGE
}

die() { printf 'publish-site.sh: %s\n' "$*" >&2; exit 1; }

term=""; push=0
for a in "$@"; do
  case "$a" in
    -h|--help) usage; exit 0;;
    --push) push=1;;
    -*) usage >&2; exit 2;;
    *) [ -z "$term" ] || { usage >&2; exit 2; }; term="$a";;
  esac
done
[ -n "$term" ] || { usage >&2; exit 2; }

root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"

src="semesters/$term/landing-page"
[ -f "$src/index.html" ] || die "no $src/index.html"

rm -rf site
mkdir -p site/assets
cp "$src/index.html" "$src/favicon.svg" "$src/og.png" "$src/apple-touch-icon.png" site/
cp docs/04-brand/design-system/tokens.css site/
cp assets/gdg-on-campus-horizontal-light.svg site/assets/
touch site/.nojekyll   # serve files as-is; no Jekyll processing

# Every file the page references must exist in the build.
missing=0
for ref in tokens.css favicon.svg apple-touch-icon.png assets/gdg-on-campus-horizontal-light.svg; do
  grep -q "$ref" site/index.html || { printf '  page no longer references %s\n' "$ref"; }
  [ -f "site/$ref" ] || { printf '  missing from build: %s\n' "$ref"; missing=1; }
done
[ "$missing" -eq 0 ] || die "build incomplete"

# The independence sentence is required on any page that carries the logo (bright-lines.md §1.4).
sentence='GDG on Campus Riverside City College is an independent group; our activities and the opinions expressed here should in no way be linked to Google, the corporation.'
grep -qF "$sentence" site/index.html || die "the independence sentence is missing or altered in $src/index.html"

printf 'built site/ from %s\n' "$src"
[ "$push" -eq 1 ] || exit 0

[ -z "$(git status --porcelain -- "$src" docs/04-brand/design-system/tokens.css assets)" ] \
  || die "commit the page source first; the gh-pages commit records the source commit"
source_rev="$(git rev-parse --short HEAD)"
remote="$(git remote get-url origin)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

if git ls-remote --exit-code --heads origin gh-pages >/dev/null 2>&1; then
  git clone --quiet --branch gh-pages --single-branch "$remote" "$tmp"
  find "$tmp" -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
else
  git init --quiet "$tmp"
  git -C "$tmp" checkout --quiet --orphan gh-pages
  git -C "$tmp" remote add origin "$remote"
fi

cp -R site/. "$tmp"/
git -C "$tmp" add -A
if git -C "$tmp" diff --cached --quiet; then
  printf 'gh-pages already matches this build; nothing to push\n'
  exit 0
fi
git -C "$tmp" commit --quiet -m "Publish landing page from $source_rev ($src)"
git -C "$tmp" push --quiet origin gh-pages
printf 'pushed gh-pages from %s; GitHub Pages serves it at https://sam-t-g.github.io/rcc-gdg/\n' "$source_rev"
