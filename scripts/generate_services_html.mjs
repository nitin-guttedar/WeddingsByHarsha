import fs from 'fs';

const servicesData = [
  {
    category: 'weddings',
    title: 'Full Wedding Planning & Coordination',
    desc: 'End-to-end planning, budgeting, vendor selection, muhurtham master timelines, and flawless on-day execution.',
    bullets: [
      'Venue selection & negotiation in Bengaluru & Mysuru',
      'Royal floral mandaps, kalyana mantapas & reception staging',
      'Complete muhurtham and reception master timeline execution'
    ],
    images: [
      { src: '/assets/Weddings/WhatsApp Image 2026-10-15 at 7.29.47 PM.jpeg', alt: 'Grand Muhurtham Floral Mandap Canopy' },
      { src: '/assets/Weddings/WhatsApp Image 2026-10-15 at 7.29.48 PM (1).jpeg', alt: 'Traditional Brass Urli Floral Decor' },
      { src: '/assets/Weddings/WhatsApp Image 2026-10-15 at 7.29.48 PM.jpeg', alt: 'South Indian Heritage Stage Styling' },
      { src: '/assets/Weddings/WhatsApp Image 2026-10-15 at 7.29.49 PM (1).jpeg', alt: 'Grand Floral Archway & Guest Walkway' },
      { src: '/assets/Weddings/WhatsApp Image 2026-10-15 at 7.29.49 PM.jpeg', alt: 'Traditional Muhurtham Pooja Sanctum' },
      { src: '/assets/Weddings/WhatsApp Image 2026-10-15 at 7.29.50 PM.jpeg', alt: 'Majestic Wedding Stage Backdrop & Lighting' },
      { src: '/assets/Weddings/WhatsApp Image 2026-10-15 at 7.29.51 PM.jpeg', alt: 'Intimate Couple Mandap with Fresh Blooms' },
      { src: '/assets/Weddings/WhatsApp Image 2026-10-15 at 7.29.52 PM (1).jpeg', alt: 'Royal Golden Temple Pillars Mandap' },
      { src: '/assets/Weddings/WhatsApp Image 2026-10-15 at 7.29.52 PM.jpeg', alt: 'Carved Wooden Heritage Pillars with Jasmine' },
      { src: '/assets/Weddings/WhatsApp Image 2026-10-15 at 7.29.53 PM.jpeg', alt: 'Grand Banquet Hall Entrance Floral Gateway' },
      { src: '/assets/Weddings/WhatsApp Image 2026-10-15 at 7.29.54 PM.jpeg', alt: 'Bespoke Traditional Wedding Aisle Styling' },
      { src: '/assets/Weddings/WhatsApp Image 2026-10-15 at 7.29.55 PM.jpeg', alt: 'Opulent Reception Stage with Crystal Chandelier' },
      { src: '/assets/Weddings/WhatsApp Image 2026-10-15 at 7.29.56 PM.jpeg', alt: 'Sacred Kalyana Mantapa Traditional Setup' },
      { src: '/assets/Weddings/IMG_7799.JPG.jpeg', alt: 'Royal Wedding Reception Stage Architecture' }
    ]
  },
  {
    category: 'engagement',
    title: 'Engagement & Reception Planning',
    desc: 'From rings exchange setups to lavish sangeets, cocktail dinners, and high-energy celebrations.',
    bullets: [
      'Customized floral & LED stage backdrops',
      'Choreography, bridal entry & couple introductions',
      'Seamless dinner coordination with banquet teams'
    ],
    images: [
      { src: '/assets/Engagement/WhatsApp Image 2026-10-15 at 8.57.57 AM.jpeg', alt: 'Modern Pastel Engagement Stage Backdrop' },
      { src: '/assets/Engagement/WhatsApp Image 2026-10-15 at 8.57.57 AM (1).jpeg', alt: 'Rings Ceremony Intimate Couple Seating' },
      { src: '/assets/Engagement/WhatsApp Image 2026-10-15 at 8.57.57 AM (2).jpeg', alt: 'Floral Monogram & Romantic Backdrop Styling' },
      { src: '/assets/Engagement/WhatsApp Image 2026-10-15 at 8.57.58 AM.jpeg', alt: 'Contemporary Geometric Backdrop with Warm Lights' },
      { src: '/assets/Engagement/WhatsApp Image 2026-10-15 at 8.57.58 AM (1).jpeg', alt: 'Festive Sangeet & Engagement Canopy decor' },
      { src: '/assets/Engagement/WhatsApp Image 2026-10-15 at 8.57.58 AM (2).jpeg', alt: 'Shimmer Sequin & Floral Engagement Arch' },
      { src: '/assets/Engagement/WhatsApp Image 2026-10-15 at 8.57.59 AM.jpeg', alt: 'Exotic Orchid & Rose Engagement Photo Stage' }
    ]
  },
  {
    category: 'haldi',
    title: 'Haldi & Mehendi Ceremonies',
    desc: 'Vibrant marigold styling, traditional brass urlis for holy baths, colorful canopy lounges, and joyful family rituals.',
    bullets: [
      'Authentic brass urlis with fresh rose & marigold petals',
      'Floral swings, photo backdrops & sunglasses/props counters',
      'Dhol players, folk music & mehendi artists coordination'
    ],
    images: [
      { src: '/assets/Haldi/WhatsApp Image 2026-10-15 at 8.58.08 AM.jpeg', alt: 'Vibrant Yellow Marigold Haldi Backdrop' },
      { src: '/assets/Haldi/WhatsApp Image 2026-10-15 at 8.58.08 AM (1).jpeg', alt: 'Traditional Brass Urli Floral Bath Setup' },
      { src: '/assets/Haldi/WhatsApp Image 2026-10-15 at 8.58.08 AM (2).jpeg', alt: 'Playful Haldi Canopy with Hanging Tassels' },
      { src: '/assets/Haldi/WhatsApp Image 2026-10-15 at 8.58.09 AM.jpeg', alt: 'Sunflower & Marigold Mehendi Seating Lounge' }
    ]
  },
  {
    category: 'housewarming',
    title: 'Housewarming (Griha Pravesh)',
    desc: 'Sacred entry ceremonies, traditional floral door threshold decor, Ganapathi pooja, and guest hospitality.',
    bullets: [
      'Fresh marigold, jasmine & banana plant entrances',
      'Vedic pandit coordination & homa kunda setup',
      'Traditional plantain leaf breakfast/lunch service'
    ],
    images: [
      { src: '/assets/HouseWarming/IMG_3310.JPG.jpeg', alt: 'Banana Tree & Mango Leaves Auspicious Doorway' },
      { src: '/assets/HouseWarming/IMG_3303.JPG.jpeg', alt: 'Grand Floral Entrance Gateway for New Home' },
      { src: '/assets/HouseWarming/IMG_3298.JPG.jpeg', alt: 'Traditional Marigold & Jasmine Door Torana' },
      { src: '/assets/HouseWarming/IMG_3299.JPG.jpeg', alt: 'Sacred Griha Pravesh Pooja Sanctum Styling' },
      { src: '/assets/HouseWarming/IMG_3844.JPG.jpeg', alt: 'Handcrafted Rangoli & Brass Samayi Urli Setup' },
      { src: '/assets/HouseWarming/IMG_6160.JPG.jpeg', alt: 'Heritage Ganapathi Pooja Stage Architecture' },
      { src: '/assets/HouseWarming/IMG_8170.JPG.jpeg', alt: 'Festive Family Gathering & Floral Archway' },
      { src: '/assets/HouseWarming/IMG_8204.jpeg', alt: 'Intimate Home Mandir Floral Garland Backdrop' },
      { src: '/assets/HouseWarming/IMG_9119.JPG.jpeg', alt: 'Handcrafted Floral Chandelier Installation' },
      { src: '/assets/HouseWarming/IMG_9121.JPG.jpeg', alt: 'Sacred Kalasha & Traditional Deepam Arrangement' },
      { src: '/assets/HouseWarming/IMG_9123.JPG.jpeg', alt: 'Artisanal Brass Urli with Floating Petals' },
      { src: '/assets/HouseWarming/IMG_9125.JPG.jpeg', alt: 'Royal Griha Pravesh Living Room Ambience' }
    ]
  },
  {
    category: 'babyshower',
    title: 'Baby Shower (Seemantha)',
    desc: 'Blessing the mother-to-be with gentle pastel floral themes, traditional seating, and joyful family rituals.',
    bullets: [
      'Floral swing & traditional South Indian oyyali decor',
      'Bangles ceremony setup & photography corner',
      'Customized gift favors & traditional delicacies'
    ],
    images: [
      { src: '/assets/BabyShower/WhatsApp Image 2026-10-15 at 8.58.06 AM.jpeg', alt: 'Royal Seemantha Floral Swing (Jhula) decor' },
      { src: '/assets/BabyShower/WhatsApp Image 2026-10-15 at 8.58.06 AM (1).jpeg', alt: 'Gentle Pastel Seemantha Stage Backdrop' },
      { src: '/assets/BabyShower/WhatsApp Image 2026-10-15 at 8.58.06 AM (2).jpeg', alt: 'Traditional Oyyali Bangles Ceremony Seating' },
      { src: '/assets/BabyShower/WhatsApp Image 2026-10-15 at 8.58.06 AM (3).jpeg', alt: 'South Indian Baby Shower Blessing Backdrop' },
      { src: '/assets/BabyShower/WhatsApp Image 2026-10-15 at 8.58.07 AM.jpeg', alt: 'Floral Archway & Baby Shower Photo Point' },
      { src: '/assets/BabyShower/WhatsApp Image 2026-10-15 at 8.58.07 AM (1).jpeg', alt: 'Mom-to-Be Throne & Exotic Floral Ring' },
      { src: '/assets/BabyShower/WhatsApp Image 2026-10-15 at 8.58.07 AM (2).jpeg', alt: 'Traditional Brass Bell & Marigold Stage Styling' },
      { src: '/assets/BabyShower/WhatsApp Image 2026-10-15 at 4.19.19 PM (1).jpeg', alt: 'Opulent Seemantha Family Celebration Stage' }
    ]
  },
  {
    category: 'naming',
    title: 'Cradle & Naming Ceremony',
    desc: 'Welcoming your little one with divine rituals, handcrafted floral cradle styling, and cherished memories.',
    bullets: [
      'Exquisite floral cradle (jhula) decorations',
      'Traditional pooja samagri & priest coordination',
      'Comfortable seating & hospitality for all generations'
    ],
    images: [
      { src: '/assets/NamingCeremony/WhatsApp Image 2026-10-15 at 8.58.04 AM.jpeg', alt: 'Exquisite Handcrafted Floral Cradle (Jhula)' },
      { src: '/assets/NamingCeremony/WhatsApp Image 2026-10-15 at 8.58.04 AM (1).jpeg', alt: 'Royal Naming Ceremony Stage with Cradle' },
      { src: '/assets/NamingCeremony/WhatsApp Image 2026-10-15 at 8.58.05 AM.jpeg', alt: 'Divine Floral Canopy for Cradle Blessing' },
      { src: '/assets/NamingCeremony/WhatsApp Image 2026-10-15 at 8.58.05 AM (1).jpeg', alt: 'Traditional South Indian Naming Ceremony Stage' }
    ]
  },
  {
    category: 'birthdays',
    title: 'Birthday Parties & Anniversaries',
    desc: '1st birthdays, sweet 16s, silver & golden jubilees planned with vibrant themes and interactive entertainment.',
    bullets: [
      'Custom balloon styling & themed floral arches',
      'Magicians, emcees, game stalls & live DJ',
      'Curated dessert tables & party favor distribution'
    ],
    images: [
      { src: '/assets/Birthdays/WhatsApp Image 2026-10-15 at 7.34.22 PM.jpeg', alt: 'Themed Milestone Birthday Backdrop & Balloon Arch' },
      { src: '/assets/Birthdays/WhatsApp Image 2026-10-15 at 7.34.24 PM.jpeg', alt: 'Grand Birthday Cake Table & Lighting Setup' },
      { src: '/assets/Birthdays/WhatsApp Image 2026-10-15 at 7.34.26 PM.jpeg', alt: 'Playful Themed Birthday Celebration Stage' }
    ]
  },
  {
    category: 'graduation',
    title: 'KIMS Graduation Day Event',
    desc: 'Comprehensive auditorium staging, presidential stage rigging, academic regalia processions, and celebratory institutional banquets.',
    bullets: [
      'Massive auditorium concert staging, trussing & line-array audio',
      'Presidential podium, LED video walls & stage lighting',
      'Convocation ceremony protocols, student degree felicitation & photo booths'
    ],
    images: [
      { src: '/assets/GraduationDay/IMG_5170.JPG.jpeg', alt: 'KIMS Convocation Main Auditorium Stage Rigging' },
      { src: '/assets/GraduationDay/IMG_5173.JPG.jpeg', alt: 'KIMS Graduation Day Presidential Podium & Lighting' },
      { src: '/assets/GraduationDay/IMG_5174.JPG.jpeg', alt: 'KIMS Academic Regalia & Stage Trussing Production' }
    ]
  },
  {
    category: 'logistics',
    title: 'Logistics, Baraat & Transport',
    desc: 'Royal groom baraat procession with adorned horses, luxury vintage car entries, airport/station VIP guest transfers, and parking logistics.',
    bullets: [
      'Royal baraat band, dhol players & luxury bridal entries',
      'Chauffeur-driven luxury car fleet & guest transfer coaches across Bengaluru',
      'Airport pickups, luggage tagging & hotel concierge desks'
    ],
    images: [
      { src: '/assets/Logistics/baraat_horse_procession.jpg', alt: 'Royal Groom Baraat Procession with Adorned Horse & Band' },
      { src: '/assets/Logistics/luxury_wedding_transport.jpg', alt: 'Luxury Chauffeur Fleet & VIP Guest Transit Logistics' },
      { src: '/assets/Logistics/vintage_baraat_entry.jpg', alt: 'Grand Vintage Classic Convertible Baraat Entry with Rose Petals' }
    ]
  },
  {
    category: 'vips',
    title: 'VIP Dignitary & Celebrity Hospitality',
    desc: 'White-glove protocol handling for senior police officers, spiritual leaders, celebrities, and esteemed clients.',
    bullets: [
      'High-profile protocol management & security liaison',
      'Reserved seating zones, VIP lounges & dedicated hospitality staff',
      'Kasthuriba Nagar central warehouse direct inventory dispatch'
    ],
    images: [
      { src: '/assets/Clients&Vips/WhatsApp Image 2026-09-23 at 12.00.43 PM.jpeg', alt: 'Harsha with Celebrated Dignitary Client' },
      { src: '/assets/Clients&Vips/WhatsApp Image 2026-09-23 at 12.00.44 PM.jpeg', alt: 'VIP Hospitality & Stage Management' },
      { src: '/assets/Clients&Vips/WhatsApp Image 2026-09-23 at 12.00.45 PM.jpeg', alt: 'Harsha with Respected Community Leaders' },
      { src: '/assets/Clients&Vips/WhatsApp Image 2026-09-23 at 12.00.46 PM.jpeg', alt: 'Spiritual Dignitary Reception Protocol' },
      { src: '/assets/Clients&Vips/WhatsApp Image 2026-09-23 at 12.00.47 PM.jpeg', alt: 'VIP Security & Guest Escort Management' },
      { src: '/assets/Clients&Vips/WhatsApp Image 2026-09-23 at 12.00.48 PM.jpeg', alt: 'Harsha with Happy Wedding Couple' },
      { src: '/assets/Clients&Vips/WhatsApp Image 2026-09-23 at 12.00.49 PM.jpeg', alt: 'Harsha with Senior Police Dignitaries' },
      { src: '/assets/Clients&Vips/WhatsApp Image 2026-09-23 at 12.00.50 PM.jpeg', alt: 'Celebrity Guest Hospitality Coordination' },
      { src: '/assets/Clients&Vips/WhatsApp Image 2026-09-23 at 12.00.52 PM.jpeg', alt: 'Harsha with Esteemed Client at Kasthuriba Godown' }
    ]
  }
];

let servicesHtml = '';

servicesData.forEach((svc, sIdx) => {
  const imagesHtml = svc.images.map((img, i) => `
                    <img src="${img.src}" alt="${img.alt}" class="service-slide-img ${i === 0 ? 'active' : ''}" loading="${i === 0 ? 'eager' : 'lazy'}" decoding="async" />`).join('');

  servicesHtml += `
              <!-- ${sIdx + 1}. ${svc.title} -->
              <div class="service-feature-card" data-category="${svc.category}">
                <div class="service-slider-container" title="Click or hover to browse photos">
                  <div class="service-slider-track">
${imagesHtml}
                  </div>
                  <div class="slider-controls-overlay">
                    <button class="slider-arrow slider-prev" aria-label="Previous photo">‹</button>
                    <div class="slider-badge">
                      <span class="slide-num">1</span> / <span class="slide-total">${svc.images.length}</span>
                    </div>
                    <button class="slider-arrow slider-next" aria-label="Next photo">›</button>
                  </div>
                  <div class="slider-hint-pill">Hover or click to slide photos</div>
                </div>
                <div class="service-card-body">
                  <h3>${svc.title}</h3>
                  <p>${svc.desc}</p>
                  <ul>
                    ${svc.bullets.map(b => `<li>${b}</li>`).join('\n                    ')}
                  </ul>
                  <a href="#/contact" class="service-card-cta-link" data-route="/contact">
                    <span>Plan This Event</span> <span>→</span>
                  </a>
                </div>
              </div>\n`;
});

console.log('Generated services HTML with total cards:', servicesData.length);
fs.writeFileSync('scripts/generated_services.html', servicesHtml.trim());
