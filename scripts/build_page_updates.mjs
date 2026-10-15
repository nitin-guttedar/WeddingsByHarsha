import fs from 'fs';
import path from 'path';

// Read existing index.html
const indexHtml = fs.readFileSync('index.html', 'utf8');

// 1. Generate Gallery Items HTML
const categoryConfig = {
  Weddings: { filterClass: 'weddings', categoryName: 'Weddings' },
  Engagement: { filterClass: 'engagement', categoryName: 'Engagement' },
  Haldi: { filterClass: 'haldi', categoryName: 'Haldi & Mehendi' },
  HouseWarming: { filterClass: 'housewarming', categoryName: 'Housewarming' },
  BabyShower: { filterClass: 'babyshower', categoryName: 'Baby Shower' },
  NamingCeremony: { filterClass: 'naming', categoryName: 'Naming Ceremony' },
  Birthdays: { filterClass: 'birthdays', categoryName: 'Birthdays' },
  GraduationDay: { filterClass: 'graduation', categoryName: 'KIMS Graduation Day' },
  Logistics: { filterClass: 'logistics', categoryName: 'Logistics & Baraat' },
  'Clients&Vips': { filterClass: 'vips', categoryName: "Clients & VIP's" }
};

const customTitles = {
  // Weddings
  'IMG_7799.JPG.jpeg': 'Royal Wedding Reception Stage Architecture',
  'WhatsApp Image 2026-10-15 at 7.29.47 PM.jpeg': 'Grand Muhurtham Floral Mandap Canopy',
  'WhatsApp Image 2026-10-15 at 7.29.48 PM (1).jpeg': 'Traditional Brass Urli & Rose Petal Floral Decor',
  'WhatsApp Image 2026-10-15 at 7.29.48 PM.jpeg': 'South Indian Heritage Stage Styling',
  'WhatsApp Image 2026-10-15 at 7.29.49 PM (1).jpeg': 'Grand Floral Archway & Guest Walkway',
  'WhatsApp Image 2026-10-15 at 7.29.49 PM.jpeg': 'Traditional Muhurtham Pooja Sanctum',
  'WhatsApp Image 2026-10-15 at 7.29.50 PM.jpeg': 'Majestic Wedding Stage Backdrop & Lighting',
  'WhatsApp Image 2026-10-15 at 7.29.51 PM.jpeg': 'Intimate Couple Mandap with Fresh Blooms',
  'WhatsApp Image 2026-10-15 at 7.29.52 PM (1).jpeg': 'Royal Golden Temple Pillars Mandap',
  'WhatsApp Image 2026-10-15 at 7.29.52 PM.jpeg': 'Carved Wooden Heritage Pillars with Jasmine',
  'WhatsApp Image 2026-10-15 at 7.29.53 PM.jpeg': 'Grand Banquet Hall Entrance Floral Gateway',
  'WhatsApp Image 2026-10-15 at 7.29.54 PM.jpeg': 'Bespoke Traditional Wedding Aisle Styling',
  'WhatsApp Image 2026-10-15 at 7.29.55 PM.jpeg': 'Opulent Reception Stage with Crystal Chandelier',
  'WhatsApp Image 2026-10-15 at 7.29.56 PM.jpeg': 'Sacred Kalyana Mantapa Traditional Setup',

  // Engagement
  'WhatsApp Image 2026-10-15 at 8.57.57 AM.jpeg': 'Modern Pastel Engagement Stage Backdrop',
  'WhatsApp Image 2026-10-15 at 8.57.57 AM (1).jpeg': 'Rings Ceremony Intimate Couple Seating',
  'WhatsApp Image 2026-10-15 at 8.57.57 AM (2).jpeg': 'Floral Monogram & Romantic Backdrop Styling',
  'WhatsApp Image 2026-10-15 at 8.57.58 AM.jpeg': 'Contemporary Geometric Backdrop with Warm Lights',
  'WhatsApp Image 2026-10-15 at 8.57.58 AM (1).jpeg': 'Festive Sangeet & Engagement Canopy Décor',
  'WhatsApp Image 2026-10-15 at 8.57.58 AM (2).jpeg': 'Shimmer Sequin & Floral Engagement Arch',
  'WhatsApp Image 2026-10-15 at 8.57.59 AM.jpeg': 'Exotic Orchid & Rose Engagement Photo Stage',

  // Haldi
  'WhatsApp Image 2026-10-15 at 8.58.08 AM.jpeg': 'Vibrant Yellow Marigold Haldi Backdrop',
  'WhatsApp Image 2026-10-15 at 8.58.08 AM (1).jpeg': 'Traditional Brass Urli Floral Bath Setup',
  'WhatsApp Image 2026-10-15 at 8.58.08 AM (2).jpeg': 'Playful Haldi Canopy with Hanging Tassels',
  'WhatsApp Image 2026-10-15 at 8.58.09 AM.jpeg': 'Sunflower & Marigold Mehendi Seating Lounge',

  // Graduation Day (KIMS)
  'IMG_5170.JPG.jpeg': 'KIMS Convocation Main Auditorium Stage Rigging',
  'IMG_5173.JPG.jpeg': 'KIMS Graduation Day Presidential Podium & Lighting',
  'IMG_5174.JPG.jpeg': 'KIMS Academic Regalia & Stage Trussing Production',

  // Logistics & Baraat
  'baraat_horse_procession.jpg': 'Royal Groom Baraat Procession with Adorned Horse & Band',
  'luxury_wedding_transport.jpg': 'Luxury Chauffeur Fleet & VIP Guest Transit Logistics',
  'vintage_baraat_entry.jpg': 'Grand Vintage Classic Convertible Baraat Entry with Rose Petals',

  // Housewarming
  'IMG_3298.JPG.jpeg': 'Traditional Marigold & Jasmine Door Torana',
  'IMG_3299.JPG.jpeg': 'Sacred Griha Pravesh Pooja Sanctum Styling',
  'IMG_3303.JPG.jpeg': 'Grand Floral Entrance Gateway for New Home',
  'IMG_3310.JPG.jpeg': 'Banana Tree & Mango Leaves Auspicious Doorway',
  'IMG_3844.JPG.jpeg': 'Handcrafted Rangoli & Brass Samayi Urli Setup',
  'IMG_6160.JPG.jpeg': 'Heritage Ganapathi Pooja Stage Architecture',
  'IMG_8170.JPG.jpeg': 'Festive Family Gathering & Floral Archway',
  'IMG_8204.jpeg': 'Intimate Home Mandir Floral Garland Backdrop',
  'IMG_9119.JPG.jpeg': 'Handcrafted Floral Chandelier Installation',
  'IMG_9121.JPG.jpeg': 'Sacred Kalasha & Traditional Deepam Arrangement',
  'IMG_9123.JPG.jpeg': 'Artisanal Brass Urli with Floating Petals',
  'IMG_9125.JPG.jpeg': 'Royal Griha Pravesh Living Room Ambience',
  'IMG_9127.JPG.jpeg': 'Traditional South Indian Havan Sanctum',
  'IMG_9129.JPG.jpeg': 'Grand Welcome Corridor for Griha Pravesh',
  'WhatsApp Image 2026-10-15 at 8.58.00 AM.jpeg': 'Festive Floral Door Frame & Jasmine Drops',
  'WhatsApp Image 2026-10-15 at 8.58.00 AM (1).jpeg': 'Traditional Deity Altar Floral Garlands',
  'WhatsApp Image 2026-10-15 at 8.58.01 AM (2).jpeg': 'Auspicious Home Entryway Floral Décor',
  'WhatsApp Image 2026-10-15 at 8.58.02 AM.jpeg': 'Sacred Homa Kunda & Vedic Ritual Setup',
  'WhatsApp Image 2026-10-15 at 8.58.02 AM (1).jpeg': 'Intimate Home Interior Floral Garland Borders',
  'WhatsApp Image 2026-10-15 at 8.58.03 AM.jpeg': 'Handcrafted Fresh Flower Mandala Rangoli',
  'WhatsApp Image 2026-10-15 at 8.58.03 AM (1).jpeg': 'Divine Griha Pravesh Threshold Styling',
  'WhatsApp Image 2026-10-15 at 8.58.03 AM (2).jpeg': 'Fresh Coconut & Mango Leaf Torana Arch',
  'WhatsApp Image 2026-10-15 at 8.58.03 AM (3).jpeg': 'Traditional Banana Stem Entrance Guardians',

  // Baby Shower (Seemantha)
  'WhatsApp Image 2026-10-15 at 8.58.06 AM.jpeg': 'Royal Seemantha Floral Swing (Jhula) Décor',
  'WhatsApp Image 2026-10-15 at 8.58.06 AM (1).jpeg': 'Gentle Pastel Seemantha Stage Backdrop',
  'WhatsApp Image 2026-10-15 at 8.58.06 AM (2).jpeg': 'Traditional Oyyali Bangles Ceremony Seating',
  'WhatsApp Image 2026-10-15 at 8.58.06 AM (3).jpeg': 'South Indian Baby Shower Blessing Backdrop',
  'WhatsApp Image 2026-10-15 at 8.58.07 AM.jpeg': 'Floral Archway & Baby Shower Photo Point',
  'WhatsApp Image 2026-10-15 at 8.58.07 AM (1).jpeg': 'Mom-to-Be Throne & Exotic Floral Ring',
  'WhatsApp Image 2026-10-15 at 8.58.07 AM (2).jpeg': 'Traditional Brass Bell & Marigold Stage Styling',
  'WhatsApp Image 2026-10-15 at 4.19.19 PM (1).jpeg': 'Opulent Seemantha Family Celebration Stage',

  // Naming Ceremony
  'WhatsApp Image 2026-10-15 at 8.58.04 AM.jpeg': 'Exquisite Handcrafted Floral Cradle (Jhula)',
  'WhatsApp Image 2026-10-15 at 8.58.04 AM (1).jpeg': 'Royal Naming Ceremony Stage with Cradle',
  'WhatsApp Image 2026-10-15 at 8.58.05 AM.jpeg': 'Divine Floral Canopy for Cradle Blessing',
  'WhatsApp Image 2026-10-15 at 8.58.05 AM (1).jpeg': 'Traditional South Indian Naming Ceremony Stage',

  // Birthdays
  'WhatsApp Image 2026-10-15 at 7.34.22 PM.jpeg': 'Themed Milestone Birthday Backdrop & Balloon Arch',
  'WhatsApp Image 2026-10-15 at 7.34.24 PM.jpeg': 'Grand Birthday Cake Table & Lighting Setup',
  'WhatsApp Image 2026-10-15 at 7.34.26 PM.jpeg': 'Playful Themed Birthday Celebration Stage',

  // Clients & VIPs
  'WhatsApp Image 2026-09-23 at 12.00.43 PM.jpeg': 'Harsha with Celebrated Dignitary Client',
  'WhatsApp Image 2026-09-23 at 12.00.44 PM.jpeg': 'VIP Hospitality & Stage Management',
  'WhatsApp Image 2026-09-23 at 12.00.45 PM.jpeg': 'Harsha with Respected Community Leaders',
  'WhatsApp Image 2026-09-23 at 12.00.46 PM.jpeg': 'Spiritual Dignitary Reception Protocol',
  'WhatsApp Image 2026-09-23 at 12.00.47 PM.jpeg': 'VIP Security & Guest Escort Management',
  'WhatsApp Image 2026-09-23 at 12.00.48 PM.jpeg': 'Harsha with Happy Wedding Couple',
  'WhatsApp Image 2026-09-23 at 12.00.49 PM.jpeg': 'Harsha with Senior Police Dignitaries',
  'WhatsApp Image 2026-09-23 at 12.00.50 PM.jpeg': 'Celebrity Guest Hospitality Coordination',
  'WhatsApp Image 2026-09-23 at 12.00.52 PM.jpeg': 'Harsha with Esteemed Client at Kasthuriba Godown'
};

// Layout aspect classes: distribute wide, tall, square for rhythm
const folderOrder = [
  'Weddings',
  'Engagement',
  'Haldi',
  'GraduationDay',
  'Logistics',
  'HouseWarming',
  'BabyShower',
  'NamingCeremony',
  'Birthdays',
  'Clients&Vips'
];

let galleryItemsHtml = `
              <!-- Video Item: Grand Wedding Production Film (Single Signature Cinematic Reel) -->
              <div class="gallery-item wide" data-category="video weddings" data-type="video"
                data-src="/videos/harsha-wedding-reel.mp4" data-title="Grand Wedding Production Film"
                data-cat-name="Cinematic Video">
                <div class="gallery-item-inner">
                  <video src="/videos/harsha-wedding-reel.mp4" muted loop playsinline preload="metadata"
                    class="gallery-img-bg" style="object-fit: cover;"></video>
                  <div class="video-play-indicator"><span>▶</span><span>FILM</span></div>
                  <div class="gallery-item-overlay">
                    <div class="gallery-item-content">
                      <span class="gallery-item-category">Cinematic Video</span>
                      <h4 class="gallery-item-title">Grand Wedding Production Film</h4>
                    </div>
                    <div class="gallery-view-btn"><span>▶</span></div>
                  </div>
                </div>
              </div>
`;

let itemIndex = 0;
folderOrder.forEach(folder => {
  const conf = categoryConfig[folder];
  const dirPath = path.resolve('assets', folder);
  if (!fs.existsSync(dirPath)) return;
  const files = fs.readdirSync(dirPath).filter(f => /\.(jpe?g|png)$/i.test(f));

  files.forEach((file, fIdx) => {
    itemIndex++;
    const title = customTitles[file] || `${conf.categoryName} Signature Styling ${fIdx + 1}`;
    const src = `/assets/${folder}/${file}`;

    // Elegant alternating shapes for luxury masonry flow
    let shape = 'square';
    if (itemIndex % 7 === 1) shape = 'wide';
    else if (itemIndex % 7 === 3 || itemIndex % 7 === 5) shape = 'tall';

    // Specific adjustments for prominent items
    if (file === 'baraat_horse_procession.jpg' || file === 'IMG_5170.JPG.jpeg' || file === 'WhatsApp Image 2026-10-15 at 7.29.47 PM.jpeg') {
      shape = 'wide';
    }

    galleryItemsHtml += `
              <!-- Gallery Item: ${title} -->
              <div class="gallery-item ${shape}" data-category="${conf.filterClass}" data-type="image"
                data-src="${src}"
                data-title="${title}" data-cat-name="${conf.categoryName}">
                <div class="gallery-item-inner">
                  <div class="gallery-img-bg"
                    style="background-image: url('${src}');">
                  </div>
                  <div class="gallery-item-overlay">
                    <div class="gallery-item-content">
                      <span class="gallery-item-category">${conf.categoryName}</span>
                      <h4 class="gallery-item-title">${title}</h4>
                    </div>
                    <div class="gallery-view-btn"><span>✦</span></div>
                  </div>
                </div>
              </div>`;
  });
});

console.log('Generated gallery items HTML with total items:', itemIndex + 1);
fs.writeFileSync('scripts/generated_gallery_items.html', galleryItemsHtml.trim());
