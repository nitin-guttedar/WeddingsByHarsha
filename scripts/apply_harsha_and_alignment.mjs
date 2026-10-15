import fs from 'fs';

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

// A. Update .services-hero background inline style to center 0% and scroll
html = html.replace(
  `<section class="services-hero" style="background-image: url('/assets/Weddings/WhatsApp Image 2026-10-15 at 7.29.47 PM.jpeg');">`,
  `<section class="services-hero" style="background-image: url('/assets/Weddings/WhatsApp Image 2026-10-15 at 7.29.47 PM.jpeg'); background-position: center 0% !important; background-attachment: scroll !important; background-size: cover !important;">`
);
console.log('Updated services-hero inline style for zero cutting');

// B. Update services-hero-overlay gradient to allow the top deity image to shine brightly
html = html.replace(
  `style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(22,22,22,0.7) 0%, rgba(22,22,22,0.95) 100%);"`,
  `style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(16,14,13,0.2) 0%, rgba(16,14,13,0.5) 30%, rgba(22,22,22,0.92) 100%);"`
);
console.log('Updated services-hero-overlay gradient');

// C. Update About Story Section with Harsha Founder Story and Side-by-side Image
const oldAboutStoryRegex = /<div class="about-story-grid">[\s\S]*?<\/div>\s*<\/div>\s*<!-- Leadership Team Section/;
const newAboutStory = `<div class="about-story-grid">

              <!-- Harsha Founder Portrait & Credentials Card -->
              <div class="story-image-wrapper" style="position: relative;">
                <div class="luxury-frame-gold"
                  style="border-radius: 16px; overflow: hidden; border: 1px solid rgba(205, 170, 124, 0.45); box-shadow: 0 30px 70px rgba(0,0,0,0.6); position: relative; background: #1c1a18;">
                  <img src="/assets/Clients&Vips/WhatsApp Image 2026-09-23 at 12.00.45 PM.jpeg" alt="Harsha - Founder of Weddings by Harsha"
                    style="width: 100%; height: 560px; object-fit: cover; object-position: center 10%; display: block;" />
                  
                  <!-- Founder Floating Overlay Card -->
                  <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(180deg, transparent 0%, rgba(18,16,14,0.92) 25%, #12100e 100%); padding: 2rem 1.8rem 1.6rem; text-align: left;">
                    <span style="font-family: var(--font-secondary); font-size: 0.72rem; letter-spacing: 3px; text-transform: uppercase; color: var(--color-gold, #cdaa7c); font-weight: 600; display: block; margin-bottom: 0.3rem;">
                      Founder & Master Event Architect
                    </span>
                    <h3 style="font-family: var(--font-primary, serif); font-size: 1.85rem; color: #fff; margin: 0 0 0.4rem 0;">
                      Harsha
                    </h3>
                    <p style="color: #ccc; font-size: 0.88rem; margin: 0; line-height: 1.5;">
                      Hotel Management Graduate • Kasthuriba Godown Owner
                    </p>
                  </div>
                </div>

                <!-- Floating Achievement Pill -->

              </div>

              <!-- Harsha Founder Story Content -->
              <div class="story-text-content">
                <span class="section-subtitle-gold"
                  style="font-family: var(--font-secondary); font-size: 0.85rem; letter-spacing: 3px; text-transform: uppercase; color: var(--color-gold, #cdaa7c); margin-bottom: 0.8rem; display: block;">
                  The Visionary Behind The Brand
                </span>
                <h2 class="section-title-light"
                  style="font-family: var(--font-primary, serif); font-size: clamp(2.2rem, 4vw, 3.2rem); color: #fff; margin-bottom: 1.2rem; line-height: 1.2;">
                  Meet Harsha: From Humble Beginnings to Grand Palaces
                </h2>

                <div style="width: 50px; height: 2px; background: var(--color-gold, #cdaa7c); margin-bottom: 1.8rem;"></div>

                <p style="color: #d6d0c7; line-height: 1.85; margin-bottom: 1.2rem; font-size: 1.05rem;">
                  Every great institution is born from a spark of pure ambition. For <strong>Harsha</strong>, the founder of Weddings by Harsha, the journey into high-end event management was neither an inherited family enterprise nor an overnight phenomenon—it was forged through <strong>pure grit, tireless ground-work, and starting completely from scratch</strong>.
                </p>

                <p style="color: #bbb; line-height: 1.8; margin-bottom: 1.2rem; font-size: 0.98rem;">
                  Driven by a deep passion for authentic Indian rituals, royal aesthetics, and flawless hospitality, Harsha immersed himself in every nuance of the event industry. To master the art of five-star banquet operations, culinary orchestration, and luxury guest care, Harsha pursued and completed his degree in <strong>Hotel Management</strong>. This professional foundation infused Weddings by Harsha with military-precision timing, hospitality etiquette, and crisis-proof on-ground coordination.
                </p>

                <p style="color: #bbb; line-height: 1.8; margin-bottom: 1.2rem; font-size: 0.98rem;">
                  Refusing to operate as a middleman who merely rents equipment at inflated costs, Harsha took the bold initiative to establish his own central production warehouse and equipment godown near <strong>3rd Main Rd, Pipeline West, Kasthuriba Nagar, Azad Nagar, Bengaluru</strong>. Directly owning royal mandaps, heavy metal trussing, line-array audio rigs, ambient lighting, and floral props gave him total control over quality, zero last-minute delays, and transparent, direct pricing.
                </p>

                <p style="color: #bbb; line-height: 1.8; margin-bottom: 1.6rem; font-size: 0.98rem;">
                  Today, Weddings by Harsha is trusted by Karnataka’s most <strong>reputed clients</strong>—including senior police dignitaries, spiritual gurus, prominent doctors, prestigious institutions (such as orchestrating mega-scale productions like the <em>KIMS Graduation Day</em>), and hundreds of celebrated families across Bengaluru and Mysuru. Harsha remains personally involved on the ground for every celebration, ensuring that your dream milestone is executed with royal opulence and genuine care.
                </p>

                <!-- Personal Founder Quote Card -->
                <div style="background: rgba(205, 170, 124, 0.08); border-left: 3px solid var(--color-gold, #cdaa7c); border-radius: 0 10px 10px 0; padding: 1.2rem 1.6rem; margin-bottom: 2rem;">
                  <p style="font-family: var(--font-primary, serif); font-style: italic; font-size: 1.15rem; color: #fff; margin: 0 0 0.5rem 0; line-height: 1.6;">
                    “A wedding is not just an event; it is a family’s most sacred dream. Having completed my hotel management degree and built our inventory with our own hands from scratch, my promise to every family is complete personal ownership, genuine hospitality, and absolute peace of mind.”
                  </p>
                  <span style="font-family: var(--font-secondary); font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; color: var(--color-gold, #cdaa7c); font-weight: 600;">
                    — Harsha, Founder & Creative Director
                  </span>
                </div>

                <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
                  <a href="https://wa.me/919108619752?text=Hello%20Harsha%2C%20I%20would%20like%20to%20discuss%20our%20upcoming%20event%20with%20you"
                    target="_blank" rel="noopener noreferrer" class="btn-hero-cta"
                    style="background: var(--color-gold, #cdaa7c); color: #1a1a1a; font-weight: 600; display: inline-flex; align-items: center; gap: 8px; text-decoration: none; padding: 0.85rem 1.8rem; border-radius: 6px; font-size: 0.9rem;">
                    <span>Talk Directly with Harsha</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                  <a href="#/gallery" class="btn-hero-secondary" data-route="/gallery"
                    style="border: 1px solid rgba(205,170,124,0.4); color: #fff; padding: 0.85rem 1.8rem; border-radius: 6px; text-decoration: none; font-size: 0.9rem;">
                    View Our Real Portfolio
                  </a>
                </div>
              </div>

            </div>
          </div>
          <!-- Leadership Team Section`;

if (!oldAboutStoryRegex.test(html)) {
  console.error('ERROR: oldAboutStoryRegex did not match');
} else {
  html = html.replace(oldAboutStoryRegex, newAboutStory);
  console.log('Updated About Story Section with Harsha Founder Story and Side-by-side Image');
}

// Write back updated index.html
fs.writeFileSync('index.html', html, 'utf8');

// 2. Update src/style.css to ensure top alignment for all heroes and images
let css = fs.readFileSync('src/style.css', 'utf8');

// Ensure services-hero and all heroes are top-aligned so God pictures and crowns are never cut
const heroCssOld = `.about-hero-section,
.services-hero,
.gallery-hero,
.areas-hero,
.blog-hero,
.contact-hero-mini {
  position: relative !important;
  box-sizing: border-box !important;
  padding-top: 150px !important; /* Critical: provides 60px+ safe space below 85px fixed navbar */
  padding-bottom: 75px !important;
  min-height: 420px !important;
  height: auto !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  background-size: cover !important;
  background-position: center !important;
  overflow: hidden !important;
  text-align: center !important;
}`;

const heroCssNew = `.about-hero-section,
.services-hero,
.gallery-hero,
.areas-hero,
.blog-hero,
.contact-hero-mini {
  position: relative !important;
  box-sizing: border-box !important;
  padding-top: 170px !important; /* Safe space below 85px fixed navbar */
  padding-bottom: 85px !important;
  min-height: 520px !important;
  height: auto !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  background-size: cover !important;
  background-position: center 0% !important; /* CRITICAL: 0% keeps top of image / deity crown completely visible without cutting */
  background-attachment: scroll !important; /* CRITICAL: cancels fixed attachment which causes mobile & desktop viewport clipping */
  overflow: hidden !important;
  text-align: center !important;
}`;

if (css.includes(heroCssOld)) {
  css = css.replace(heroCssOld, heroCssNew);
  console.log('Updated hero CSS with center 0% top alignment and scroll attachment');
} else {
  console.log('heroCssOld did not match exactly, appending specific rule');
  css += `
.services-hero {
  background-position: center 0% !important;
  background-attachment: scroll !important;
  background-size: cover !important;
  min-height: 520px !important;
  padding-top: 170px !important;
}
`;
}

// Add global safety rules so no images in cards or gallery cut deity/heads from above
const alignmentRule = `
/* ==========================================================================
   SACRED DEITY & PORTRAIT ALIGNMENT SAFEGUARDS
   Ensures crowns, deities, kalashas, and portraits are never cut from above
   ========================================================================== */
.services-hero {
  background-position: center 0% !important;
  background-attachment: scroll !important;
  background-size: cover !important;
  min-height: 520px !important;
  padding-top: 170px !important;
}

.gallery-img-bg {
  background-position: center 15% !important;
}

.service-slide-img {
  object-position: center 15% !important;
}

.story-image-wrapper img {
  object-position: center 10% !important;
}
`;

css += alignmentRule;
fs.writeFileSync('src/style.css', css, 'utf8');
console.log('Successfully updated src/style.css with alignment safeguards!');
