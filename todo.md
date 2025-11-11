Task: Fix All Text Colors Site-Wide (Contrast + Consistency)
Goal

Make every piece of text readable and on-brand by enforcing dark ink on light backgrounds and white on dark sections. Remove any pale blue mixes and hard-coded blues used for text.

Acceptance Criteria (WCAG AA)

Body text contrast ≥ 4.5:1 on its background.

Headings contrast ≥ 3:1.

Buttons/links readable in all states (default/hover/active/focus).

No opacity applied to text containers to “soften” content.

1) Enforce new tokens (single source of truth)

Add to the end of src/styles.scss (or your global CSS):

:root{
  --ink-strong:#0b1f3d;   /* headings & default text on light */
  --ink-medium:#2b3a54;   /* body paragraphs on light */
  --ink-soft:#5f6c82;     /* helper/muted on light */
  --ink-on-dark:#ffffff;  /* text on dark/navy */
  --link:#b98b2f;
  --link-hover:#c9a24a;
}

/* Global defaults */
html, body { color: var(--ink-strong); }

/* Light sections */
p, li, .section-subtext { color: var(--ink-medium); }

/* Dark sections (navy/gradients) */
.section--dark, .navy, .has-dark-bg {
  color: var(--ink-on-dark);
}
.section--dark p, .section--dark .section-subtext,
.navy p, .navy .section-subtext { color:#e9eef5; }

/* Headings always strong on light, white on dark */
:where(h1,h2,h3,h4,h5,h6,.section-title){ color: var(--ink-strong); }
:where(.section--dark,.navy) :where(h1,h2,h3,h4,h5,h6,.section-title){ color:#fff; }

/* Links */
a{ color: var(--link); }
a:hover{ color: var(--link-hover); }
:where(.section--dark,.navy) a{ color:#ffe6a7; }
:where(.section--dark,.navy) a:hover{ color:#fff1c6; }

2) Kill the bad patterns globally

Search & replace (case-insensitive) across the repo:

Replace any soft mixes:

Find: color:\s*color-mix\(.*\);

Replace with:

For headings/labels → color: var(--ink-strong);

For paragraphs → color: var(--ink-medium);

Remove blue text utilities:

Find: color:\s*(#1d3557|var\(--accent-blue\)|navy|#123|#1d3+57);

Replace with color: var(--ink-strong); (unless on a dark section).

Stop dimming text via opacity:

Find: opacity:\s*0\.[0-9]+;

If on a text container, DELETE it and instead tone the background with RGBA.

Nix inherited “soft” classes for core text:

Replace .text-blue, .text-soft, .muted, .subtitle to use:

.text-soft { color: var(--ink-soft) !important; }

Remove any blue values from those utilities.

Tip: If you use SCSS, centralize utilities in one partial and delete per-page overrides.

3) Buttons (no blue text on blue)
.button--primary{
  background: linear-gradient(135deg,#c9a24a,#f5d79b);
  color:#1c1404; /* readable on gold */
}
.button--navy{
  background: linear-gradient(135deg,#0b1f3d,#102947);
  color:#fff;
}
.section--dark .button--light{ background:#fff; color:var(--ink-strong); }


Replace any .btn-blue or blue text on blue background.

4) Lint & guardrails (so it stays fixed)

Add Stylelint rules (in .stylelintrc):

{
  "rules": {
    "declaration-no-important": null,
    "color-named": "never",
    "color-no-hex": null,
    "plugin/no-low-contrast-colors": [true, { "minContrastRatio": 4.5 }],
    "declaration-property-value-disallowed-list": {
      "color": ["/color-mix\\(/i", "#1d3557", "navy", "var(--accent-blue)"]
    }
  }
}


If you don’t have the plugin, at least keep the declaration-property-value-disallowed-list rule to block color-mix( and the blue tones for text.

5) Quick DOM audit snippet (optional)

Run this in the browser console to highlight low-contrast text on the page:

(function(){
  function luminance(r,g,b){ [r,g,b]=[r,g,b].map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)}); return 0.2126*r+0.7152*g+0.0722*b; }
  function hex(c){const m=c.match(/\d+/g).slice(0,3).map(Number); return m; }
  function ratio(fg,bg){
    const [fr,fgc,fb]=hex(fg), [br,bgC,bb]=hex(bg);
    const L1=luminance(fr,fgc,fb), L2=luminance(br,bgC,bb);
    const [hi,lo]=L1>L2?[L1,L2]:[L2,L1]; return (hi+0.05)/(lo+0.05);
  }
  function rgbStr(c){return c.startsWith('rgb')?c:null}

  const bad=[];
  document.querySelectorAll('*').forEach(el=>{
    const cs=getComputedStyle(el);
    if(cs.visibility==='hidden'||cs.display==='none') return;
    const fg=rgbStr(cs.color), bg=rgbStr(cs.backgroundColor)||rgbStr(getComputedStyle(el.parentElement||document.body).backgroundColor);
    if(!fg||!bg) return;
    const r=ratio(fg,bg);
    if(r<4.5){
      el.style.outline='2px solid red';
      bad.push({el,ratio:r,fg,bg});
    }
  });
  console.log('Low-contrast nodes:', bad.length, bad);
})();

6) Definition of Done

No elements flagged red by the console snippet on key pages (Home, Services, Pricing).

Lighthouse Accessibility ≥ 95; Contrast checks pass.

Manual spot check: that “Complete Cleaning Solutions for Miami” heading renders dark ink, not pale blue.

All “overline/eyebrow” labels read clearly (no washed-out pastel).

7) PR title & summary (use this)

Title: Improve global text contrast and color system (WCAG AA)

Summary:

Enforced strong ink for all headings/body on light sections; white on dark sections.

Removed color-mix() and hard-coded blue text usage.

Normalized link and button colors; ensured readable CTAs.

Added Stylelint guardrails to prevent regressions.

Verified with Lighthouse and custom DOM contrast audit.

ALSO VERY IMPORTANT, WHATSAPP BUTTONS THAT ARE GREEN! CHANGE THEM TO MATCH OUR THEME