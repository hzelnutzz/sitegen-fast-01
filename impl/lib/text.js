// makefun-site's text rules: the HTML escape table, the slug rule and the long date (README.md, "Text").

/** The HTML escape table, in this order: & < > " ' (README.md). */
const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** `text` with & < > " and ' escaped. */
const AMP = /[^&<>"']+/y;
const HAS_ESC = /[&<>"']/;
export function escapeHtml(text) {
  const n = text.length;
  if (n === 0) return text;
  if (n === 1) {
    const c = ESCAPES[text];
    return c === undefined ? text : c;
  }
  if (!HAS_ESC.test(text)) return text;
  let out = '';
  let i = 0;
  while (i < n) {
    AMP.lastIndex = i;
    const m = AMP.exec(text);
    if (m !== null) {
      out += m[0];
      i = AMP.lastIndex;
      if (i >= n) break;
    }
    out += ESCAPES[text[i]];
    i++;
  }
  return out;
}

/** The most characters a slug keeps before a collision suffix. */
export const SLUG_MAX = 64;

/**
 * The slug of `text`: NFKD, combining marks dropped, A-Z lowered, every run of characters other than a-z and 0-9 one
 * "-", none at either end, at most SLUG_MAX characters (a "-" left at the cut dropped), and "untitled" when nothing is
 * left.
 */
const MARKS = /\p{M}/gu;
const PLAIN_ASCII = /^[\x20-\x7e]*$/;
export function slugify(text) {
  const plain = PLAIN_ASCII.test(text) ? text : text.normalize('NFKD').replace(MARKS, '');
  let out = '';
  let gap = false;
  for (const ch of plain) {
    let keep = null;
    if (ch >= 'A' && ch <= 'Z') keep = ch.toLowerCase();
    else if ((ch >= 'a' && ch <= 'z') || (ch >= '0' && ch <= '9')) keep = ch;
    if (keep === null) {
      gap = out.length > 0;
      continue;
    }
    if (gap) out += '-';
    gap = false;
    out += keep;
  }
  out = out.slice(0, SLUG_MAX).replace(/-+$/, '');
  return out === '' ? 'untitled' : out;
}

/** `slug` made unique against `taken` (and added to it): the first of slug, slug-2, slug-3 ... not taken. */
export function uniqueSlug(slug, taken) {
  let out = slug;
  for (let n = 2; taken.has(out); n++) out = `${slug}-${n}`;
  taken.add(out);
  return out;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** A YYYY-MM-DD date in words, from the string alone: "2026-11-09" is "9 November 2026". */
export function longDate(date) {
  const [y, m, d] = date.split('-');
  return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
}
