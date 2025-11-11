CMK Home Services — Readable & Motivational UI Patch
0) Token Tweaks (safe contrast)
:root {
  /* Existing (kept) */
  --ts-bg:        #fdfaf4;
  --ts-bg-soft:   #f6efe3;
  --ts-paper:     #ffffff;
  --ts-ink:       #0b1f3d;  /* ~14:1 on white */
  --ts-ink-soft:  #5f6c82;
  --ts-accent:    #c9a24a;  /* Gold */
  --ts-accent-soft:#f4d8a4;
  --ts-line:      rgba(9,33,58,0.1);
  --surface-border: rgba(9,33,58,0.08);
  --surface-glass: rgba(255,255,255,0.85);

  /* Navy is now background-only */
  --navy-900:     #0b1f3d;
  --navy-800:     #102947;
  --accent-blue:  #1d3557; /* keep for subtle bg only */

  /* CTAs */
  --cta-primary-bg: linear-gradient(135deg, #c9a24a, #f5d79b);
  --cta-primary-text: #1c1404; /* deep brown for max contrast on gold */
  --cta-dark-text: #ffffff;    /* for buttons on dark/navy */

  /* Links */
  --link:        #b98b2f;  /* darker gold for contrast */
  --link-hover:  #c9a24a;

  /* Shadows & radius */
  --shadow-soft: 0 10px 24px rgba(9,33,58,0.06);
  --radius-xl:   1.5rem;

  /* Spacing rhythm */
  --section-spacing: clamp(3rem, 5vw, 6rem);
}

1) Typography Utilities (consistent, readable)
.eyebrow {
  color: color-mix(in oklab, var(--ts-ink) 70%, white);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-weight: 700;
  font-size: 0.85rem;
}

.section-title {
  font-family: 'Cormorant Garamond', 'Times New Roman', serif;
  color: var(--ts-ink);
  font-weight: 700;
  line-height: 1.1;
  font-size: clamp(1.8rem, 2.5vw + 1rem, 3rem);
}

.section-subtext {
  font-family: 'Source Sans 3', 'Inter', system-ui, sans-serif;
  color: color-mix(in oklab, var(--ts-ink) 60%, white);
  font-size: clamp(1rem, 0.5vw + 0.9rem, 1.125rem);
  line-height: 1.65;
  max-width: 60ch;
}

2) Buttons (fixed contrast + simple variants)

Replace any “blue button” with these. Navy is only used as a background; button text becomes white on dark and deep-brown on gold.

.button {
  --btn-padding-y: 0.85rem;
  --btn-padding-x: 1.25rem;
  --btn-radius: 999px;
  --btn-shadow: 0 8px 18px rgba(0,0,0,0.08);

  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  border-radius: var(--btn-radius);
  padding: var(--btn-padding-y) var(--btn-padding-x);
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  border: 1px solid transparent;
  transition: transform .06s ease, box-shadow .2s ease, background .2s ease, color .2s ease;
  cursor: pointer;
  min-height: 44px; /* tap target */
  outline: none;

  &:active { transform: translateY(1px); }
  &:focus-visible {
    box-shadow: 0 0 0 3px #fff, 0 0 0 6px color-mix(in oklab, var(--ts-accent) 70%, #000);
  }
}

/* Primary (GOLD) – default CTA on light backgrounds */
.button--primary {
  background: var(--cta-primary-bg);
  color: var(--cta-primary-text);
  box-shadow: var(--btn-shadow);

  &:hover { filter: brightness(1.03); }
  &:active { filter: brightness(0.98); }
}

/* Ghost (outline) – secondary on light backgrounds */
.button--ghost {
  background: transparent;
  border-color: color-mix(in oklab, var(--ts-ink) 20%, transparent);
  color: var(--ts-ink);

  &:hover {
    background: color-mix(in oklab, var(--ts-ink) 6%, transparent);
  }
}

/* Light button for dark sections (navy hero/stats) */
.button--light {
  background: #ffffff;
  color: var(--ts-ink);
  box-shadow: var(--btn-shadow);

  &:hover { filter: brightness(0.98); }
}

/* Navy-filled button for dark sections when you *need* color */
.button--navy {
  background: linear-gradient(135deg, var(--navy-900), var(--navy-800));
  color: var(--cta-dark-text);
  border-color: rgba(255,255,255,0.1);
  box-shadow: 0 10px 20px rgba(11,31,61,0.25);

  &:hover { filter: brightness(1.06); }
}

/* Text button */
.button--link {
  background: transparent;
  color: var(--link);
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover { color: var(--link-hover); }
}

/* WhatsApp CTA */
.button--whatsapp {
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: #ffffff;

  svg { width: 1.2rem; height: 1.2rem; flex: 0 0 auto; }
}

/* Size helpers */
.button--lg { --btn-padding-y: 1rem; --btn-padding-x: 1.5rem; font-size: 1.05rem; }
.button--xl { --btn-padding-y: 1.1rem; --btn-padding-x: 1.75rem; font-size: 1.15rem; }

Replace these patterns (critical)

❌ .btn-blue, .text-blue, button text colored #1d3557 on blue/navy backgrounds

✅ .button.button--primary on light sections

✅ On dark/blue sections: .button.button--light or .button.button--navy (white text)

3) Sections, Cards, Stats (legible on every background)
.section-spacing { padding-block: var(--section-spacing); }
.page-container {
  width: min(1120px, 92vw);
  margin-inline: auto;
}

.card {
  background: var(--ts-paper);
  border: 1px solid var(--surface-border);
  box-shadow: var(--shadow-soft);
  border-radius: var(--radius-xl);
}

.section--dark {
  background: linear-gradient(180deg, rgba(5,12,24,0.94) 0%, rgba(14,26,45,0.9) 100%);
  color: #ffffff;

  /* make all text readable by default */
  p, .section-subtext, .eyebrow { color: color-mix(in oklab, white 92%, black); }
  .section-title { color: #fff; }

  /* links & accents on dark */
  a { color: #ffe6a7; }
  a:hover { color: #ffefc7; }
}

4) Navbar & Drawer (no blue text; gold highlights only)
.navbar {
  background: linear-gradient(180deg, rgba(5,12,24,0.96) 0%, rgba(14,26,45,0.94) 100%);
  color: #ffffff;
  border-bottom: 1px solid rgba(255,255,255,0.06);

  .nav-link {
    color: color-mix(in oklab, white 90%, black);
    font-weight: 600;
  }
  .nav-link:hover { color: #fff4df; }

  .nav-cta { /* top-right CTA */
    @extend .button;
    @extend .button--primary;
  }
}

5) Reviews & Social Proof (clear, friendly)
.reviews-label { color: var(--ts-ink); font-size: 1rem; }
.stars { color: #f4c384; } /* warm star color, not blue */

6) Link System (motivational but accessible)
a { color: var(--link); transition: color .15s ease; }
a:hover { color: var(--link-hover); }

7) Example CTA blocks (copy/paste)

Hero on light background

<div class="page-container section-spacing">
  <p class="eyebrow">Premium Cleaning in Your Area</p>
  <h1 class="section-title">A spotless home you’ll love coming back to</h1>
  <p class="section-subtext">Reliable pros, eco-friendly products, and a 100% happiness guarantee.</p>
  <div style="display:flex; gap:.75rem; flex-wrap:wrap; margin-top:1rem;">
    <a href="#quote" class="button button--primary button--xl">Get a Free Quote</a>
    <a href="https://wa.me/1XXXXXXXXXX" class="button button--whatsapp button--xl">
      <!-- include your WhatsApp svg icon -->
      Chat on WhatsApp
    </a>
  </div>
</div>


CTA on a dark/navy section

<section class="section--dark section-spacing">
  <div class="page-container">
    <h2 class="section-title">Weekend slots fill fast</h2>
    <p class="section-subtext">Grab your preferred time—most customers book in under a minute.</p>
    <a href="#booking" class="button button--light button--lg">Book My Cleaning</a>
  </div>
</section>

8) Quick Fix Checklist (use this today)

Stop using blue for button text. Replace any .btn-blue with .button--primary on light, or .button--light/.button--navy on dark.

Never set color: var(--accent-blue) on text. Blue is background-only now.

Ensure CTAs always have ≥ 4.5:1 contrast:

Gold (bg) + deep-brown text ✅

Navy (bg) + white text ✅

Make every CTA at least 44px tall (already in the .button base).

Links = darker gold, not blue.

Reviews/stars = warm gold, not blue.

Navbar CTA uses .button--primary (gold), not a blue pill.

9) Why this works (motivation psychology)

Warm palette (cream + gold) signals hospitality and care—perfect for home services.

Clear contrast reduces cognitive load; people act faster when CTAs are instantly legible.

Consistent CTA colors train visitors what to click; gold = action, green = chat.

Navy as a background adds premium feel without hurting readability.