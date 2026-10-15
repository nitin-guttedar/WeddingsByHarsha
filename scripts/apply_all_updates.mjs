import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

// 1. Read generated snippets
const servicesCardsHtml = fs.readFileSync('scripts/generated_services.html', 'utf8');
const galleryItemsHtml = fs.readFileSync('scripts/generated_gallery_items.html', 'utf8');

// 2. Update Home Page Pillars (lines ~590-625)
const oldPillarsRegex = /<!-- Pillar 3 -->[\s\S]*?<!-- Pillar 4 -->[\s\S]*?<\/p>\s*<\/div>/;
const newPillars = `<!-- Pillar 3 -->
            <div
              style="background: #1c1a18; border: 1px solid rgba(205, 170, 124, 0.25); border-radius: 10px; padding: 2.2rem; text-align: left; transition: transform 0.3s ease;">
              <h3
                style="font-family: var(--font-primary, serif); font-size: 1.55rem; color: #fff; margin-bottom: 0.8rem;">
                Logistics, Baraat & Transport</h3>
              <p style="color: #aaa; font-size: 0.92rem; line-height: 1.65; margin: 0;">
                Royal groom baraat horses, luxury vintage car entries, VIP chauffeur fleet, airport transfers, hotel check-ins, and parking logistics across Bengaluru.
              </p>
            </div>

            <!-- Pillar 4 -->
            <div
              style="background: #1c1a18; border: 1px solid rgba(205, 170, 124, 0.25); border-radius: 10px; padding: 2.2rem; text-align: left; transition: transform 0.3s ease;">
              <h3
                style="font-family: var(--font-primary, serif); font-size: 1.55rem; color: #fff; margin-bottom: 0.8rem;">
                Milestone & Institutional Events</h3>
              <p style="color: #aaa; font-size: 0.92rem; line-height: 1.65; margin: 0;">
                KIMS Graduation Day convocation staging, sacred Griha Pravesh, Seemantha baby showers, naming ceremonies, and milestone birthdays managed with direct warehouse inventory.
              </p>
            </div>`;

if (!oldPillarsRegex.test(html)) {
  console.error('ERROR: oldPillarsRegex did not match');
} else {
  html = html.replace(oldPillarsRegex, newPillars);
  console.log('Updated Home Page Pillars');
}

// 3. Update Home Page 9 Spectrum Cards (<div class="spectrum-9-grid"> ... </div>)
const oldSpectrumRegex = /<div class="spectrum-9-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>\s*<!-- Kasthuriba Nagar Godown/;
const newSpectrum = `<div class="spectrum-9-grid">
            <!-- 1. Wedding -->
            <a href="#/services" class="spectrum-9-card" data-route="/services">
              <img src="/assets/Weddings/WhatsApp Image 2026-10-15 at 7.29.47 PM.jpeg" alt="Royal Wedding Mandap" class="spectrum-9-img" />
              <div class="spectrum-9-overlay">
                <span class="spectrum-9-category">Sacred Muhurtham</span>
                <h3 class="spectrum-9-title">Weddings</h3>
              </div>
            </a>

            <!-- 2. Engagement & Reception -->
            <a href="#/services" class="spectrum-9-card" data-route="/services">
              <img src="/assets/Engagement/WhatsApp Image 2026-10-15 at 8.57.57 AM.jpeg" alt="Engagement & Reception" class="spectrum-9-img" />
              <div class="spectrum-9-overlay">
                <span class="spectrum-9-category">Galas & Sangeets</span>
                <h3 class="spectrum-9-title">Engagement & Reception</h3>
              </div>
            </a>

            <!-- 3. Haldi & Mehendi -->
            <a href="#/services" class="spectrum-9-card" data-route="/services">
              <img src="/assets/Haldi/WhatsApp Image 2026-10-15 at 8.58.08 AM.jpeg" alt="Haldi & Mehendi Ceremony" class="spectrum-9-img" />
              <div class="spectrum-9-overlay">
                <span class="spectrum-9-category">Festive Radiance</span>
                <h3 class="spectrum-9-title">Haldi & Mehendi</h3>
              </div>
            </a>

            <!-- 4. Housewarming (Griha Pravesh) -->
            <a href="#/services" class="spectrum-9-card" data-route="/services">
              <img src="/assets/HouseWarming/IMG_3310.JPG.jpeg" alt="Housewarming Griha Pravesh" class="spectrum-9-img" />
              <div class="spectrum-9-overlay">
                <span class="spectrum-9-category">Sacred Auspicious</span>
                <h3 class="spectrum-9-title">Housewarming</h3>
              </div>
            </a>

            <!-- 5. Baby Shower -->
            <a href="#/services" class="spectrum-9-card" data-route="/services">
              <img src="/assets/BabyShower/WhatsApp Image 2026-10-15 at 8.58.06 AM.jpeg" alt="Baby Shower Seemantha" class="spectrum-9-img" />
              <div class="spectrum-9-overlay">
                <span class="spectrum-9-category">Seemantha Rituals</span>
                <h3 class="spectrum-9-title">Baby Shower</h3>
              </div>
            </a>

            <!-- 6. Naming Ceremony -->
            <a href="#/services" class="spectrum-9-card" data-route="/services">
              <img src="/assets/NamingCeremony/WhatsApp Image 2026-10-15 at 8.58.04 AM.jpeg" alt="Naming Ceremony Cradle" class="spectrum-9-img" />
              <div class="spectrum-9-overlay">
                <span class="spectrum-9-category">Cradle Traditions</span>
                <h3 class="spectrum-9-title">Naming Ceremony</h3>
              </div>
            </a>

            <!-- 7. Birthday Parties -->
            <a href="#/services" class="spectrum-9-card" data-route="/services">
              <img src="/assets/Birthdays/WhatsApp Image 2026-10-15 at 7.34.22 PM.jpeg" alt="Milestone Birthday" class="spectrum-9-img" />
              <div class="spectrum-9-overlay">
                <span class="spectrum-9-category">Celebrations</span>
                <h3 class="spectrum-9-title">Birthday Parties</h3>
              </div>
            </a>

            <!-- 8. KIMS Graduation Day Event -->
            <a href="#/services" class="spectrum-9-card" data-route="/services">
              <img src="/assets/GraduationDay/IMG_5170.JPG.jpeg" alt="KIMS Graduation Day Production" class="spectrum-9-img" />
              <div class="spectrum-9-overlay">
                <span class="spectrum-9-category">Institutional Stage</span>
                <h3 class="spectrum-9-title">KIMS Graduation Day</h3>
              </div>
            </a>

            <!-- 9. Logistics, Baraat & Transport -->
            <a href="#/services" class="spectrum-9-card" data-route="/services">
              <img src="/assets/Logistics/baraat_horse_procession.jpg" alt="Logistics & Baraat Procession" class="spectrum-9-img" />
              <div class="spectrum-9-overlay">
                <span class="spectrum-9-category">Fleet & Procession</span>
                <h3 class="spectrum-9-title">Logistics & Baraat</h3>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- Kasthuriba Nagar Godown`;

if (!oldSpectrumRegex.test(html)) {
  console.error('ERROR: oldSpectrumRegex did not match');
} else {
  html = html.replace(oldSpectrumRegex, newSpectrum);
  console.log('Updated Home Page 9 Spectrum Cards');
}

// 4. Update Hero Backgrounds & Broken Image Links
html = html.replace(
  `url('/assets/Weddings/IMG_9137.JPG.jpeg')`,
  `url('/assets/Weddings/WhatsApp Image 2026-10-15 at 7.29.50 PM.jpeg')`
);
html = html.replace(
  `url('/assets/Weddings/IMG_9135.JPG.jpeg')`,
  `url('/assets/Weddings/WhatsApp Image 2026-10-15 at 7.29.47 PM.jpeg')`
);
html = html.replace(
  `url('/assets/Weddings/IMG_9143.JPG.jpeg')`,
  `url('/assets/Weddings/WhatsApp Image 2026-10-15 at 7.29.55 PM.jpeg')`
);
html = html.replace(
  `url('/assets/Weddings/IMG_9139.JPG.jpeg')`,
  `url('/assets/Weddings/WhatsApp Image 2026-10-15 at 7.29.52 PM (1).jpeg')`
);
html = html.replace(
  `url('/assets/Weddings/IMG_9131.JPG.jpeg')`,
  `url('/assets/Weddings/WhatsApp Image 2026-10-15 at 7.29.56 PM.jpeg')`
);
console.log('Updated Hero Backgrounds');

// 5. Update Our Services Grid
const oldServicesGridRegex = /<div class="services-glass-grid">[\s\S]*?<\/div>\s*<!-- Call to action inside Services -->/;
const newServicesGrid = `<div class="services-glass-grid">
${servicesCardsHtml}
            </div>

            <!-- Call to action inside Services -->`;

if (!oldServicesGridRegex.test(html)) {
  console.error('ERROR: oldServicesGridRegex did not match');
} else {
  html = html.replace(oldServicesGridRegex, newServicesGrid);
  console.log('Updated Our Services Grid with Interactive Slider Cards');
}

// 6. Update Gallery Filter Tabs
const oldGalleryFiltersRegex = /<div class="gallery-filters" id="gallery-filter-tabs">[\s\S]*?<\/div>/;
const newGalleryFilters = `<div class="gallery-filters" id="gallery-filter-tabs">
              <button class="filter-btn active" data-filter="all">All (79)</button>
              <button class="filter-btn" data-filter="weddings">Weddings</button>
              <button class="filter-btn" data-filter="engagement">Engagement</button>
              <button class="filter-btn" data-filter="haldi">Haldi & Mehendi</button>
              <button class="filter-btn" data-filter="housewarming">Housewarming</button>
              <button class="filter-btn" data-filter="babyshower">Baby Shower</button>
              <button class="filter-btn" data-filter="naming">Naming Ceremony</button>
              <button class="filter-btn" data-filter="birthdays">Birthdays</button>
              <button class="filter-btn" data-filter="graduation">KIMS Graduation Day</button>
              <button class="filter-btn" data-filter="logistics">Logistics & Baraat</button>
              <button class="filter-btn" data-filter="vips">Clients & VIP's</button>
              <button class="filter-btn" data-filter="video">▶ Cinematic Video</button>
            </div>`;

if (!oldGalleryFiltersRegex.test(html)) {
  console.error('ERROR: oldGalleryFiltersRegex did not match');
} else {
  html = html.replace(oldGalleryFiltersRegex, newGalleryFilters);
  console.log('Updated Gallery Filter Tabs');
}

// 7. Update Gallery Grid
const oldGalleryGridRegex = /<div class="luxury-masonry-grid" id="main-gallery-grid"[\s\S]*?<\/div>\s*<\/div>\s*<\/section>\s*<\/div>\s*<\/div>\s*<!-- ====================================================================\s*VIEW 5: AREAS WE SERVE/;
const newGalleryGrid = `<div class="luxury-masonry-grid" id="main-gallery-grid"
              style="display: grid; grid-template-columns: repeat(auto-fill, minmax(310px, 1fr)); grid-auto-rows: 260px; grid-auto-flow: dense; gap: 1.2rem;">
${galleryItemsHtml}
            </div>
          </div>
        </section>
      </div>
    </div>

    <!-- ====================================================================
         VIEW 5: AREAS WE SERVE`;

if (!oldGalleryGridRegex.test(html)) {
  console.error('ERROR: oldGalleryGridRegex did not match');
} else {
  html = html.replace(oldGalleryGridRegex, newGalleryGrid);
  console.log('Updated Main Gallery Grid with all 79 items');
}

// 8. Update Blog Post 5
const oldBlog5Regex = /<!-- Blog 5 -->[\s\S]*?<!-- Blog 6 -->/;
const newBlog5 = `<!-- Blog 5 -->
            <article class="blog-card">
              <div class="blog-img-wrap">
                <img src="/assets/GraduationDay/IMG_5173.JPG.jpeg" alt="KIMS Graduation Day Staging" />
              </div>
              <div class="blog-content">
                <div class="blog-meta-row">
                  <span class="blog-tag">Institutional Staging</span>
                  <span class="blog-read-time">4 min read</span>
                </div>
                <h3 class="blog-title">KIMS Graduation Day & Institutional Production: Direct Godown Rigging</h3>
                <p class="blog-excerpt">
                  Behind the scenes of setting up massive auditorium stages, presidential podiums, line array sound systems, and moving-head lighting rigs for KIMS Convocation ceremonies directly from our Kasthuriba warehouse.
                </p>
                <a href="#/contact" class="blog-read-btn" data-route="/contact">Enquire for Graduation / Institutional Event →</a>
              </div>
            </article>

            <!-- Blog 6 -->`;

if (!oldBlog5Regex.test(html)) {
  console.error('ERROR: oldBlog5Regex did not match');
} else {
  html = html.replace(oldBlog5Regex, newBlog5);
  console.log('Updated Blog Post 5');
}

// 9. Update Lead Capture Form select options
const oldOptionsRegex = /<option value="College Fest">College Fest<\/option>\s*<option value="School Day">School Day \/ Annual Function<\/option>\s*<option value="Corporate Event">Corporate Event \/ Gala<\/option>/;
const newOptions = `<option value="KIMS Graduation Day">KIMS Graduation Day Event</option>
                  <option value="Haldi Ceremony">Haldi & Mehendi Ceremony</option>
                  <option value="Logistics & Baraat">Logistics, Baraat & Transport</option>`;

if (!oldOptionsRegex.test(html)) {
  console.error('ERROR: oldOptionsRegex did not match');
} else {
  html = html.replace(oldOptionsRegex, newOptions);
  console.log('Updated Lead Capture Form options');
}

// Write back updated index.html
fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully written updated index.html!');
