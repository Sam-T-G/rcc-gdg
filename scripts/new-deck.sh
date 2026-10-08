#!/usr/bin/env bash
# Create a weekly meeting deck next to its session card, from deck-kit/weekly.html.
#
# Usage: scripts/new-deck.sh <YYYY-term> <YYYY-MM-DD>
# Example: scripts/new-deck.sh 2026-fall 2026-09-24
#
# Reads the session card semesters/<YYYY-term>/sessions/<YYYY-MM-DD>-<slug>.md and the sessions
# index, fills every fact the deck can carry (title, arc, slot, week, room, start time, receipt,
# rung, and the whole semester for the rail slide with this week marked), and leaves a fill marker
# wherever a person has to decide. Creates semesters/<YYYY-term>/sessions/<YYYY-MM-DD>-<slug>-deck.html.
# Refuses to overwrite. node deck-kit/check.mjs refuses the deck until every marker is gone.
# Works with bash 3.2 (macOS default) and Linux bash. Run from anywhere; paths resolve from the script.
set -euo pipefail

usage() {
  cat <<'USAGE'
usage: scripts/new-deck.sh <YYYY-term> <YYYY-MM-DD>

  <YYYY-term>    existing semester folder, e.g. 2026-fall
  <YYYY-MM-DD>   the session date; its card must exist in semesters/<YYYY-term>/sessions/
                 and have a row in that folder's README.md index

Creates semesters/<YYYY-term>/sessions/<YYYY-MM-DD>-<slug>-deck.html from deck-kit/weekly.html.
USAGE
}

die() { printf 'new-deck.sh: %s\n' "$*" >&2; exit 1; }

if [ "$#" -eq 1 ] && { [ "$1" = "-h" ] || [ "$1" = "--help" ]; }; then usage; exit 0; fi
if [ "$#" -ne 2 ]; then usage; exit 2; fi

sem="$1"; date="$2"
sem_re='^[0-9]{4}-(fall|spring|summer|winter)$'
date_re='^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$'
[[ "$sem" =~ $sem_re ]] || die "bad semester name '$sem' (want e.g. 2026-fall)"
[[ "$date" =~ $date_re ]] || die "bad date '$date' (want YYYY-MM-DD)"

root="$(cd "$(dirname "$0")/.." && pwd)"
sdir="$root/semesters/$sem/sessions"
template="$root/deck-kit/weekly.html"
index="$sdir/README.md"

[ -d "$sdir" ] || die "sessions folder not found: semesters/$sem/sessions"
[ -f "$template" ] || die "template missing: deck-kit/weekly.html"
[ -f "$index" ] || die "sessions index missing: semesters/$sem/sessions/README.md"

# Exactly one card for the date. The deck takes the card's slug.
card=""
for f in "$sdir/$date-"*.md; do
  [ -f "$f" ] || continue
  case "$f" in *-deck.html) continue;; esac
  [ -n "$card" ] && die "more than one card for $date in semesters/$sem/sessions"
  card="$f"
done
[ -n "$card" ] || die "no session card for $date in semesters/$sem/sessions (want $date-<slug>.md)"
slug="$(basename "$card" .md)"; slug="${slug#"$date-"}"
dest="$sdir/$date-$slug-deck.html"
[ -e "$dest" ] && die "refusing to overwrite: semesters/$sem/sessions/$(basename "$dest") already exists"

# --- Read the card. The front-matter table and section grammar are fixed (components.md §7.4). ---
row() { sed -n "s/^| $1 | \(.*\) |[[:space:]]*$/\1/p" "$card" | head -1; }
section() { awk -v pat="$1" '/^## / { if (on) exit; if ($0 ~ pat) { on = 1; next } } on { print }' "$card"; }
first_para() { grep -v '^[[:space:]]*$' | head -1 || true; }
first_bold() { grep -o '\*\*[^*]*\*\*' | head -1 | sed 's/\*\*//g' || true; }
html() { sed -e 's/&/\&amp;/g' -e 's/</\&lt;/g' -e 's/>/\&gt;/g'; }
comment_safe() { sed -e 's/--/-/g' -e 's/<//g' -e 's/>//g'; }
cap() { printf '%s' "$(printf '%s' "${1:0:1}" | tr '[:lower:]' '[:upper:]')${1:1}"; }

h1="$(sed -n '1s/^# *//p' "$card")"
[ -n "$h1" ] || die "the card's first line is not an H1: $(basename "$card")"
case "$h1" in
  *" - "*) index_id="${h1%% - *}"; title="${h1#* - }";;
  *) index_id=""; title="$h1";;
esac

arcslot="$(row 'Arc and slot')"
[ -n "$arcslot" ] || die "no 'Arc and slot' row in $(basename "$card")"
week=""; slot=""
case "$arcslot" in
  hook*|Hook*) arc="hook"; arc_name="Hook";;
  *,*)
    arc_name="$(printf '%s' "${arcslot%%,*}" | sed 's/^ *//;s/ *$//')"
    slot="$(printf '%s' "${arcslot#*,}" | sed 's/^ *//;s/ *$//' | tr '[:upper:]' '[:lower:]')"
    arc="$(printf '%s' "$arc_name" | tr '[:upper:]' '[:lower:]')";;
  *) die "cannot read the 'Arc and slot' row: '$arcslot'";;
esac
case "$slot" in install) week=1;; pressure) week=2;; transfer) week=3;; ship) week=4;; esac

room="$(row 'Room')"
receipt="$(row 'Receipt due' | sed 's/\*\*//g')"
rung="$(row 'Rung named')"
sentence="$(section '^## In one sentence' | first_para | html)"
warm="$(section '^## [0-9:]* Warm rep' | first_bold | html)"
ask="$(section '^## [0-9:]* The Ask' | first_para | comment_safe)"

# Start time, from the Room row ("..., 2:30 to 3:30 PM"), as HH:MM for the cover countdown.
starts_attr=""
start="$(printf '%s' "$room" | sed -n 's/.*[^0-9]\([0-9]\{1,2\}\):\([0-9]\{2\}\) to [0-9]\{1,2\}:[0-9]\{2\} \([AP]M\).*/\1 \2 \3/p')"
if [ -n "$start" ]; then
  h="${start%% *}"; rest="${start#* }"; m="${rest%% *}"; ap="${rest#* }"
  if [ "$ap" = "PM" ] && [ "$h" -ne 12 ]; then h=$((h + 12)); fi
  if [ "$ap" = "AM" ] && [ "$h" -eq 12 ]; then h=0; fi
  starts_attr=" data-starts=\"$(printf '%02d:%s' "$h" "$m")\""
fi

# --- The semester, from the sessions index. Names are copied verbatim (visual-voice.md §9.2). ---
rail_items="$(awk -F'|' -v today="$date" '
  function trim(s) { sub(/^[[:space:]]+/, "", s); sub(/[[:space:]]+$/, "", s); return s }
  function esc(s) { gsub(/&/, "\\&amp;", s); gsub(/</, "\\&lt;", s); gsub(/>/, "\\&gt;", s); return s }
  /^\| *(H[0-9]+|[0-9]+) *\|/ {
    d = trim($3); arc = tolower(trim($4)); name = trim($6); receipt = trim($8)
    # Only the index table: its Date column is ISO. The rotation table further down
    # starts its rows the same way but dates them "Sep 3".
    if (d !~ /^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]$/) next
    if (arc == "dark") next
    sub(/^\[/, "", name); sub(/\].*$/, "", name)
    attrs = " data-arc=\"" arc "\""
    if (receipt != "none" && receipt != "-" && receipt != "") attrs = attrs " data-receipt"
    if (d == today) { attrs = attrs " aria-current=\"step\""; found = 1 }
    printf "    <li%s>%s</li>\n", attrs, esc(name)
    if (arc != "hook" && !(arc in seen)) { seen[arc] = 1; arcs++ }
  }
  END { if (!found) exit 3; print "ARCS=" arcs > "/dev/stderr" }
' "$index" 2>"$root/.new-deck.$$")" || {
  rm -f "$root/.new-deck.$$"
  die "no row for $date in semesters/$sem/sessions/README.md; add it there first (the index is the source of truth)"
}
arcs="$(sed -n 's/^ARCS=//p' "$root/.new-deck.$$")"; rm -f "$root/.new-deck.$$"
case "$arcs" in 1) arcs_word="One";; 2) arcs_word="Two";; 3) arcs_word="Three";; 4) arcs_word="Four";; 5) arcs_word="Five";; *) arcs_word="$arcs";; esac

# --- What the deck says about itself. ---
if [ "$arc" = "hook" ]; then
  eyebrow="Hook session${index_id:+ · $index_id}"
  ledger="GDG on Campus RCC · Hook session${index_id:+ $index_id}"
  rail_head="$arcs_word arcs. This week is a hook, before the first one."
else
  slot_name="$(cap "$slot")"
  eyebrow="$arc_name · $slot_name${week:+ · Week $week of 4}"
  ledger="GDG on Campus RCC · $arc_name${week:+ · Week $week of 4}"
  rail_head="$arcs_word arcs. This is $arc_name week ${week:-?}."
fi
[ -n "$warm" ] && warm="$(cap "$warm")"
[ -n "$warm" ] || warm='<!-- fill: the warm rep prompt in the room'"'"'s words; the card'"'"'s 2:35 Warm rep has none in bold -->'
[ -n "$sentence" ] || sentence='<!-- fill: one line on what this session is, from the card -->'
[ -n "$rung" ] || rung='(the card has no Rung named row)'
[ -n "$ask" ] || ask='(the card has no 3:22 The Ask section)'
receipt_meta=""
case "$receipt" in
  ""|none*) ;;
  *) receipt_meta="    <p class=\"ask__meta\">Receipt due: $(printf '%s' "$receipt" | html)</p>";;
esac

# --- Fill the template. Literal replacement, so & and / in card text survive. ---
export TPL_UP='../../..' TPL_TITLE="$(printf '%s' "$title" | html)" TPL_INDEX="$index_id" TPL_CARD="$(basename "$card")"
export TPL_DATE="$date" TPL_ARC="$arc" TPL_EYEBROW="$eyebrow" TPL_LEDGER="$ledger" TPL_DECK_ID="$sem-$date-$slug"
export TPL_STARTS_ATTR="$starts_attr" TPL_SENTENCE="$sentence" TPL_RAIL_HEAD="$rail_head" TPL_RAIL_ITEMS="$rail_items"
export TPL_WARM="$warm" TPL_RUNG="$(printf '%s' "$rung" | comment_safe)" TPL_ASK="$ask"
export TPL_ROOM_LINE="$(printf '%s' "$room" | html)" TPL_RECEIPT_META="$receipt_meta"
awk '
  function rep(s, tok, val,   i, out) {
    out = ""
    while ((i = index(s, tok)) > 0) { out = out substr(s, 1, i - 1) val; s = substr(s, i + length(tok)) }
    return out s
  }
  BEGIN { n = split("UP TITLE INDEX CARD DATE ARC EYEBROW LEDGER DECK_ID STARTS_ATTR SENTENCE RAIL_HEAD RAIL_ITEMS WARM RUNG ASK ROOM_LINE RECEIPT_META", keys, " ") }
  { line = $0; for (k = 1; k <= n; k++) line = rep(line, "@@" keys[k] "@@", ENVIRON["TPL_" keys[k]]); if (line != "" || $0 != "@@RECEIPT_META@@") print line }
' "$template" > "$dest"

if grep -q '@@[A-Z_]*@@' "$dest"; then
  left="$(grep -o '@@[A-Z_]*@@' "$dest" | sort -u | tr '\n' ' ')"
  rm -f "$dest"; die "template token(s) not filled: $left"
fi

fills="$(grep -o '<!-- *fill:' "$dest" | wc -l | tr -d ' ')"
printf 'created semesters/%s/sessions/%s\n' "$sem" "$(basename "$dest")"
printf 'from    %s and the sessions index (%s)\n' "$(basename "$card")" "$eyebrow"
printf 'next:   fill the %s markers (grep -n "fill:"), then run  node deck-kit/check.mjs semesters/%s/sessions/%s\n' "$fills" "$sem" "$(basename "$dest")"
