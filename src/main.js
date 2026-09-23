import confetti from 'canvas-confetti';

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initLiveHours();
  initStickyHeader();
  initMobileNav();
  initPortfolio();
  initBudgetEstimator();
  initAreaTabs();
  initChecklistModal();
  initContactForm();
});

/* ==========================================================================
   1. Ambient Canvas — Golden Shimmer & Petals
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = window.innerWidth < 768 ? 20 : 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3.5 + 1.2,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: Math.random() * 0.6 + 0.3,
      opacity: Math.random() * 0.5 + 0.2,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.5,
      isPetal: Math.random() > 0.4
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotSpeed;

      if (p.y > height + 20) {
        p.y = -10;
        p.x = Math.random() * width;
      }
      if (p.x > width + 20) p.x = -10;
      if (p.x < -20) p.x = width + 10;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.isPetal) {
        ctx.fillStyle = `rgba(224, 185, 122, ${p.opacity})`;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 2, p.size, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();
      } else {
        ctx.fillStyle = `rgba(197, 155, 39, ${p.opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. Live Operating Hours (9:00 AM - 9:00 PM IST)
   ========================================================================== */
function initLiveHours() {
  const statusElem = document.getElementById('business-status-text');
  if (!statusElem) return;

  function updateStatus() {
    const now = new Date();
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    const istOffset = 5.5 * 3600000;
    const istDate = new Date(utcTime + istOffset);

    const hours = istDate.getHours();
    const isOpen = hours >= 9 && hours < 21;

    if (isOpen) {
      statusElem.textContent = 'Open Today: 9:00 AM – 9:00 PM (Kasthuriba Nagar Godown Consultations)';
    } else {
      statusElem.textContent = 'Opens 9:00 AM Tomorrow • 24/7 WhatsApp Consultations Active';
    }
  }

  updateStatus();
  setInterval(updateStatus, 60000);
}

/* ==========================================================================
   3. Sticky Header
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   4. Mobile Navigation Drawer
   ========================================================================== */
function initMobileNav() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuToggle || !mobileDrawer) return;

  // Create a backdrop element dynamically if it doesn't exist
  let backdrop = document.querySelector('.drawer-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'drawer-backdrop';
    document.body.appendChild(backdrop);
  }

  function openDrawer() {
    mobileDrawer.classList.add('active');
    backdrop.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('active');
    backdrop.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.contains('active');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  backdrop.addEventListener('click', closeDrawer);

  const allDrawerLinks = document.querySelectorAll('.mobile-nav-link, .mobile-subnav-link');
  allDrawerLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   5. Portfolio Gallery Filter & Lightbox
   ========================================================================== */
function initPortfolio() {
  const filterTabs = document.querySelectorAll('.gallery-filter-bar .filter-tab');
  const galleryItems = document.querySelectorAll('.gallery-masonry-grid .gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  // Filter tabs
  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.dataset.filter;

      galleryItems.forEach((item) => {
        const category = item.dataset.category;
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Lightbox opening
  const zoomBtns = document.querySelectorAll('.btn-zoom');
  zoomBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const src = btn.dataset.src;
      const caption = btn.dataset.caption || 'Weddings by Harsha Portfolio';

      if (lightboxModal && lightboxImg) {
        lightboxImg.src = src;
        lightboxImg.alt = caption;
        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightboxModal.classList.add('active');
        lightboxModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Also clicking any gallery card opens lightbox
  const galleryCards = document.querySelectorAll('.gallery-card');
  galleryCards.forEach((card) => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.querySelector('.gallery-item-title') ? card.querySelector('.gallery-item-title').textContent : '';

      if (lightboxModal && lightboxImg && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = title;
        if (lightboxCaption) lightboxCaption.textContent = title;
        lightboxModal.classList.add('active');
        lightboxModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }
}

/* ==========================================================================
   6. Interactive Wedding Budget & Cost Estimator
   ========================================================================== */
function initBudgetEstimator() {
  const guestSlider = document.getElementById('guest-slider');
  const guestBadge = document.getElementById('guest-count-badge');
  const radioButtons = document.querySelectorAll('input[name="event-type"]');
  const checkboxes = document.querySelectorAll('.checkbox-pill input[type="checkbox"]');
  const locationSelect = document.getElementById('calc-location-select');

  const minPriceEl = document.getElementById('calc-min-price');
  const maxPriceEl = document.getElementById('calc-max-price');
  const summaryEventText = document.getElementById('summary-event-text');
  const summaryGuestText = document.getElementById('summary-guest-text');
  const summaryServicesCount = document.getElementById('summary-services-count');
  const summaryLocationText = document.getElementById('summary-location-text');
  const btnWhatsApp = document.getElementById('btn-whatsapp-estimate');

  if (!guestSlider || !minPriceEl || !maxPriceEl) return;

  function calculateEstimate() {
    const guests = parseInt(guestSlider.value, 10);
    if (guestBadge) guestBadge.textContent = `${guests} Guests`;
    if (summaryGuestText) summaryGuestText.textContent = `${guests} Guests`;

    let selectedEventType = 'Full Wedding & Reception';
    radioButtons.forEach((radio) => {
      if (radio.checked) selectedEventType = radio.value;
    });
    if (summaryEventText) summaryEventText.textContent = selectedEventType;

    // Multipliers for event types
    const eventMultipliers = {
      'Full Wedding & Reception': 1.0,
      'Mandap & Muhurtham Only': 0.55,
      'Engagement / Sangeet Night': 0.45,
      'Royal Destination Wedding': 1.35
    };
    const multiplier = eventMultipliers[selectedEventType] || 1.0;

    // Service costs
    const serviceCosts = {
      'svc-decor': 140000,
      'svc-light': 60000,
      'svc-photo': 75000,
      'svc-coord': 35000,
      'svc-pandal': 55000,
      'svc-hosp': 30000
    };

    let selectedServices = [];
    let servicesTotal = 0;

    checkboxes.forEach((cb) => {
      if (cb.checked) {
        servicesTotal += serviceCosts[cb.id] || 30000;
        selectedServices.push(cb.value);
      }
    });

    if (summaryServicesCount) {
      summaryServicesCount.textContent = `${selectedServices.length} Services Selected`;
    }

    if (locationSelect && summaryLocationText) {
      const locName = locationSelect.options[locationSelect.selectedIndex].text;
      summaryLocationText.textContent = locName.split(' - ')[1] || locName.split(' (')[0];
    }

    const guestLogisticsFactor = guests * 380;
    const subtotal = (servicesTotal + guestLogisticsFactor) * multiplier;

    const minEstimate = Math.round((subtotal * 0.88) / 5000) * 5000;
    const maxEstimate = Math.round((subtotal * 1.22) / 5000) * 5000;

    minPriceEl.textContent = Number(minEstimate).toLocaleString('en-IN');
    maxPriceEl.textContent = Number(maxEstimate).toLocaleString('en-IN');

    // Update WhatsApp link
    if (btnWhatsApp) {
      btnWhatsApp.onclick = () => {
        const msg = `Namaskara Harsha! I used your online Wedding Budget Estimator.%0A%0A*Event Details:*%0A• Celebration: ${encodeURIComponent(selectedEventType)}%0A• Expected Guests: ${guests}%0A• Location: ${encodeURIComponent(summaryLocationText ? summaryLocationText.textContent : 'Bengaluru')}%0A• Services (${selectedServices.length}): ${encodeURIComponent(selectedServices.join(', '))}%0A• Estimated Range: ₹${minPriceEl.textContent} - ₹${maxPriceEl.textContent}%0A%0ACould we schedule a visit to your Kasthuriba Nagar godown to discuss the dates and decor themes?`;
        window.open(`https://wa.me/919108619752?text=${msg}`, '_blank');
      };
    }
  }

  guestSlider.addEventListener('input', calculateEstimate);
  radioButtons.forEach((r) => r.addEventListener('change', calculateEstimate));
  checkboxes.forEach((cb) => cb.addEventListener('change', calculateEstimate));
  if (locationSelect) locationSelect.addEventListener('change', calculateEstimate);

  calculateEstimate();
}

/* ==========================================================================
   7. Local SEO Areas We Serve Switcher
   ========================================================================== */
function initAreaTabs() {
  const localityButtons = document.querySelectorAll('.locality-nav-scroll .locality-btn');
  const localityBadge = document.getElementById('locality-badge');
  const localityTitle = document.getElementById('locality-title');
  const localityDesc = document.getElementById('locality-desc');
  const localityVenues = document.getElementById('locality-venues');
  const localityAdvantage = document.getElementById('locality-advantage');
  const localityCtaBtn = document.getElementById('locality-cta-btn');
  const localityImg = document.getElementById('locality-img');
  const localityImgCaption = document.getElementById('locality-img-caption');

  if (!localityButtons.length || !localityTitle) return;

  const areaData = {
    'kengeri': {
      zone: 'Bengaluru South-West Zone',
      title: 'Wedding Planners in Kengeri, Bengaluru',
      desc: 'Kengeri offers a vibrant mix of grand traditional kalyana mantapas and modern convention halls along the Mysuru Road expressway, making it ideal for family-centric weddings with effortless highway connectivity. Weddings by Harsha manages custom floral mandaps, catering logistics, and guest shuttles for Kengeri venues with rapid response from our nearby warehouse.',
      venues: 'Kalyana mantapas, open lawn venues, traditional South Indian theme pandals',
      advantage: 'Just 15-20 mins via Mysore Road from our Kasthuriba Nagar godown',
      img: '/assets/IMG_9145.JPG.jpeg',
      caption: 'Weddings by Harsha • Kengeri Mandap Setup'
    },
    'whitefield': {
      zone: 'Bengaluru East Tech Corridor',
      title: 'Luxury Weddings & Receptions in Whitefield & ITPL',
      desc: 'Crafting royal, sleek, and modern celebrations at five-star hotels and luxury lawns across Whitefield and East Bengaluru. From high-tech intelligent lighting to bespoke floral canopies for cosmopolitan couples.',
      venues: 'Five-star hotel ballrooms (Sheraton, Marriott, Palm Meadows lawns)',
      advantage: 'Experienced rigging team with intelligent moving heads & LED walls',
      img: '/assets/IMG_9135.JPG.jpeg',
      caption: 'Weddings by Harsha • Whitefield Ballroom Production'
    },
    'marathahalli': {
      zone: 'Bengaluru Outer Ring Road Corridor',
      title: 'Grand Weddings & Haldi Events in Marathahalli',
      desc: 'Seamless decor and production for wedding halls, tech-park clubhouses, and banquet spaces around Outer Ring Road and Marathahalli. Complete audio-visual rigs and stage backdrops at honest factory rates.',
      venues: 'Convention centers, tech-park clubhouses, banquet halls',
      advantage: 'Direct transport from godown with overnight stage turnover',
      img: '/assets/IMG_8170.JPG.jpeg',
      caption: 'Weddings by Harsha • Marathahalli Stage Setup'
    },
    'jayanagar': {
      zone: 'South Bengaluru Cultural Heart',
      title: 'Heritage & Traditional Weddings in Jayanagar & Basavanagudi',
      desc: 'Rooted in Karnataka tradition. We design breathtaking authentic areca leaf, coconut frond, and fragrant mogra mandaps for traditional Kalyana Mantapas across South Bangalore.',
      venues: 'Historic Kalyana Mantapas, heritage community centers, temple halls',
      advantage: 'Own inventory of pure brass urns, traditional bells, and temple fabrics',
      img: '/assets/IMG_9145.JPG.jpeg',
      caption: 'Weddings by Harsha • Jayanagar Heritage Mandap'
    },
    'btm': {
      zone: 'Bengaluru South Central',
      title: 'Banquet & Community Hall Weddings in BTM Layout',
      desc: 'Compact or grand, our team brings tailored decor packages for banquets, terrace parties, and intimate marriage halls throughout BTM 1st & 2nd Stage.',
      venues: 'Boutique banquets, rooftop wedding terraces, mid-sized halls',
      advantage: 'Space-saving modular stage designs and customized photo corners',
      img: '/assets/IMG_9133.JPG.jpeg',
      caption: 'Weddings by Harsha • BTM Layout Reception Décor'
    },
    'electronic-city': {
      zone: 'Hosur Road & Electronic City Corridor',
      title: 'Resort & Open-Lawn Weddings in Electronic City & Bommasandra',
      desc: 'Specializing in open-air fairytale decor across Hosur Road, Electronic City Phase 1 & 2, and lush suburban garden resorts. Our in-house sound systems and weather-proof pandals withstand outdoor elements effortlessly.',
      venues: 'Open-air garden resorts, farmhouse estates, poolside lawns',
      advantage: 'Heavy aluminum box trusses for large weather-safe canopies',
      img: '/assets/WhatsApp Image 2026-09-23 at 12.00.41 PM.jpeg',
      caption: 'Weddings by Harsha • Open-Lawn Resort Styling'
    },
    'hebbal': {
      zone: 'North Bengaluru & Palace Grounds',
      title: 'Palatial Palace Grounds & Luxury Weddings in Hebbal',
      desc: 'Serving prestigious venues across Bellary Road, Hebbal, and Palace Grounds gates. Harsha’s team handles colossal 100ft+ stage fabrication, aluminum trussing, and mega banquet coordination.',
      venues: 'Palace Grounds (Sheesh Mahal, Gayatri Vihar, King Court), luxury lake resorts',
      advantage: 'Equipped to construct 100ft+ mega stages and VIP green rooms',
      img: '/assets/IMG_9138.JPG.jpeg',
      caption: 'Weddings by Harsha • Hebbal & Palace Grounds Mega Rig'
    },
    'yelahanka': {
      zone: 'North Bengaluru Country Estates',
      title: 'Garden Farmhouse Weddings in Yelahanka',
      desc: 'Designing rustic-chic and royal outdoor weddings at private farmhouses and luxury estates surrounding Yelahanka and the Airport highway.',
      venues: 'Private farmhouse estates, luxury villa communities, amphitheaters',
      advantage: 'Bespoke pampas grass, warm fairy-light canopies, and cocktail bars',
      img: '/assets/WhatsApp Image 2026-09-23 at 12.00.43 PM.jpeg',
      caption: 'Weddings by Harsha • Yelahanka Sunset Ceremony'
    },
    'majestic': {
      zone: 'Central Bengaluru Heritage Hub',
      title: 'Central Bengaluru & Majestic Choultry Weddings',
      desc: 'Historic Kalyana Mantapas around Majestic, Gandhinagar, and Rajajinagar receive the pinnacle of our attention with timeless floral craftsmanship and live Nadaswaram coordination.',
      venues: 'Traditional choultries, community wedding mantapas',
      advantage: 'Rapid logistics turnaround in central Bangalore',
      img: '/assets/IMG_9145.JPG.jpeg',
      caption: 'Weddings by Harsha • Central Bangalore Auspicious Mandap'
    },
    'yeshwanthpur': {
      zone: 'West Bengaluru Corridor',
      title: 'Convention Center & Expo Weddings in Yeshwanthpur',
      desc: 'Equipped to furnish mega venues around Yeshwanthpur and Tumkur Road with 4K LED screens, acoustic line arrays, and grand bride/groom entry pathways.',
      venues: 'Mega convention centers and multi-level banquet complexes',
      advantage: 'Capacity to handle 2,500+ guests with synchronized catering flow',
      img: '/assets/IMG_8169.JPG.jpeg',
      caption: 'Weddings by Harsha • Grand Convocation & Wedding Stage'
    },
    'bommasandra': {
      zone: 'South Hosur Industrial Hub',
      title: 'Wedding Decorators in Bommasandra & Chandapura',
      desc: 'Providing budget-friendly, high-impact wedding setups for community halls, industrial clubhouses, and destination lawns along South Hosur Road.',
      venues: 'Community marriage halls and suburban garden plots',
      advantage: 'Complete packages including sound, photography, and mandap flowers',
      img: '/assets/IMG_9135.JPG.jpeg',
      caption: 'Weddings by Harsha • Bommasandra Stage Fabrications'
    },
    'mysuru': {
      zone: 'Heritage Capital of Karnataka',
      title: 'Royal Destination Weddings in Mysuru (Palaces & Lalitha Mahal)',
      desc: 'From royal heritage arches overlooking Chamundi Hills to grand banquets near Lalitha Mahal and Mysore Palace. Harsha’s full logistics fleet travels to Mysuru with zero middleman commissions.',
      venues: 'Lalitha Mahal Palace, Silent Shores, Windflower, Chamundi Hill lawns',
      advantage: 'Dedicated transport fleet via Bengaluru-Mysuru Expressway with zero vendor markup',
      img: '/assets/WhatsApp Image 2026-09-23 at 12.00.42 PM.jpeg',
      caption: 'Weddings by Harsha • Mysuru Palace Royal Celebration'
    }
  };

  localityButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      localityButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const locKey = btn.dataset.locality;
      const data = areaData[locKey] || areaData['kengeri'];

      if (localityBadge) localityBadge.textContent = data.zone;
      if (localityTitle) localityTitle.textContent = data.title;
      if (localityDesc) localityDesc.textContent = data.desc;
      if (localityVenues) localityVenues.textContent = data.venues;
      if (localityAdvantage) localityAdvantage.textContent = data.advantage;
      if (localityImg) {
        localityImg.src = data.img;
        localityImg.alt = data.title;
      }
      if (localityImgCaption) localityImgCaption.textContent = data.caption;
      if (localityCtaBtn) {
        localityCtaBtn.textContent = `Book ${btn.textContent.trim()} Wedding Consultation`;
      }
    });
  });
}

/* ==========================================================================
   8. Free 2026 Checklist Lead Magnet Modal
   ========================================================================== */
function initChecklistModal() {
  const openBtn = document.getElementById('btn-open-checklist-modal');
  const modal = document.getElementById('checklist-modal');
  const closeBtn = document.getElementById('checklist-close');
  const overlay = document.getElementById('checklist-modal-overlay');

  if (!modal) return;

  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#E2BF63', '#C59B27', '#F6EFEA']
    });
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   9. Main Consultation Lead Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('lead-inquiry-form');
  const banner = document.getElementById('form-success-banner');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('lead-name').value;
    const phone = document.getElementById('lead-phone').value;
    const email = document.getElementById('lead-email').value || 'Not provided';
    const city = document.getElementById('lead-city').value;
    const area = document.getElementById('lead-area').value;
    const eventType = document.getElementById('lead-event').value;
    const guests = document.getElementById('lead-guests').value || 'To be finalized';
    const date = document.getElementById('lead-date').value || 'To be finalized';
    const budget = document.getElementById('lead-budget').value;
    const notes = document.getElementById('lead-notes').value || 'Standard consultation';

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#C59B27', '#E7C970', '#25D366']
    });

    if (banner) {
      banner.classList.remove('hidden');
      form.style.display = 'none';
    }

    const msg = `*New Wedding Lead — Weddings by Harsha*%0A%0A• *Client Name:* ${encodeURIComponent(name)}%0A• *Phone:* ${encodeURIComponent(phone)}%0A• *Email:* ${encodeURIComponent(email)}%0A• *Event:* ${encodeURIComponent(eventType)}%0A• *City & Locality:* ${encodeURIComponent(city)} (${encodeURIComponent(area)})%0A• *Estimated Guests:* ${encodeURIComponent(guests)}%0A• *Tentative Date:* ${encodeURIComponent(date)}%0A• *Budget:* ${encodeURIComponent(budget)}%0A• *Notes:* ${encodeURIComponent(notes)}%0A%0A_Sent via online consultation form_`;

    setTimeout(() => {
      window.open(`https://wa.me/919108619752?text=${msg}`, '_blank');
    }, 800);
  });
}
