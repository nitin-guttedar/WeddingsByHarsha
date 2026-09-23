import confetti from 'canvas-confetti';

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initRouter();
  initNavbarScrolled();
  initMobileMenu();
  initHeroSlider();
  initIntroVideo();
  initParallaxDestinations();
  initGalleryAndLightbox();
  initContactForm();
});

/* ==========================================================================
   1. ROYAL PRELOADER (1.4s Timer with Auto-Dismissal)
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  function dismissPreloader() {
    preloader.classList.add('preloader-hidden');
    document.body.classList.remove('preloader-active');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 800);
  }

  // Dismiss after royal reveal animation
  setTimeout(dismissPreloader, 1400);

  // User click on preloader dismisses immediately
  preloader.addEventListener('click', dismissPreloader);

  // Safety fallback if page load or timer delays
  window.addEventListener('load', () => {
    setTimeout(dismissPreloader, 1600);
  });
}

/* ==========================================================================
   2. CLIENT-SIDE SPA ROUTER (Home, About, Services, Gallery, Areas, Blog, Contact)
   ========================================================================== */
function initRouter() {
  const views = {
    '/': document.getElementById('view-home'),
    '/about': document.getElementById('view-about'),
    '/services': document.getElementById('view-services'),
    '/gallery': document.getElementById('view-gallery'),
    '/areas': document.getElementById('view-areas'),
    '/blog': document.getElementById('view-blog'),
    '/contact': document.getElementById('view-contact')
  };

  const navLinks = document.querySelectorAll('[data-route]');

  function navigateTo(route) {
    const cleanRoute = views[route] ? route : '/';

    // Switch view
    Object.keys(views).forEach((key) => {
      const view = views[key];
      if (view) {
        if (key === cleanRoute) {
          view.classList.add('active');
        } else {
          view.classList.remove('active');
        }
      }
    });

    // Update active nav links
    navLinks.forEach((link) => {
      if (link.getAttribute('data-route') === cleanRoute) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile menu if open
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    if (mobileOverlay) mobileOverlay.classList.remove('open');

    // Scroll to top with instantaneous behavior like Lenis
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  function handleRoute() {
    let hash = window.location.hash.replace(/^#/, '');
    if (!hash || hash === '') hash = '/';
    navigateTo(hash);
  }

  // Intercept route clicks
  document.addEventListener('click', (e) => {
    const targetLink = e.target.closest('[data-route]');
    if (targetLink) {
      e.preventDefault();
      const route = targetLink.getAttribute('data-route');
      
      // If user clicked an area specific CTA button, pre-select that area in the contact form
      const areaSelect = targetLink.getAttribute('data-area-select');
      if (areaSelect) {
        const areaDropdown = document.getElementById('lead-area');
        if (areaDropdown) {
          areaDropdown.value = areaSelect;
        }
      }

      window.location.hash = '#' + route;
      navigateTo(route);
    }
  });

  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('popstate', handleRoute);

  // Initial Route Load
  handleRoute();
}

/* ==========================================================================
   3. STICKY NAVBAR SCROLLED STATE
   ========================================================================== */
function initNavbarScrolled() {
  const navbar = document.getElementById('main-navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   4. MOBILE DRAWER MENU
   ========================================================================== */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const overlay = document.getElementById('mobile-menu-overlay');

  if (!toggleBtn || !overlay) return;

  toggleBtn.addEventListener('click', () => {
    overlay.classList.toggle('open');
  });

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('open');
    }
  });
}

/* ==========================================================================
   5. HOME HERO IMAGE SLIDER
   ========================================================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('#hero-slider .hero-bg-slide');
  if (!slides.length) return;

  let currentIndex = 0;

  setInterval(() => {
    slides[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('active');
  }, 5000);
}

/* ==========================================================================
   6. SIGNATURE INTRO VIDEO CONTROLS
   ========================================================================== */
function initIntroVideo() {
  const video = document.getElementById('intro-feature-video');
  const toggleBtn = document.getElementById('intro-sound-toggle');
  const icon = document.getElementById('intro-sound-icon');
  const text = document.getElementById('intro-sound-text');

  if (!video) return;

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      if (video.muted) {
        if (icon) icon.textContent = '🔇';
        if (text) text.textContent = 'Unmute Sound';
      } else {
        if (icon) icon.textContent = '🔊';
        if (text) text.textContent = 'Mute Sound';
      }
    });
  }

  // Optimize performance: pause video when scrolled away
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (video.paused) video.play().catch(() => {});
        } else {
          if (!video.paused) video.pause();
        }
      });
    }, { threshold: 0.15 });
    observer.observe(video);
  }
}

/* ==========================================================================
   7. DESTINATIONS PARALLAX DUAL-RAIL TRACK
   ========================================================================== */
function initParallaxDestinations() {
  const section = document.getElementById('destinations-parallax');
  const rowTop = document.getElementById('dest-row-top');
  const rowBottom = document.getElementById('dest-row-bottom');

  if (!section || !rowTop || !rowBottom) return;

  let ticking = false;

  function updateParallax() {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.bottom > -100 && rect.top < windowHeight + 100) {
      const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      const moveTop = (progress - 0.5) * 180;
      const moveBottom = (0.5 - progress) * 180;

      rowTop.style.transform = `translateX(${moveTop}px)`;
      rowBottom.style.transform = `translateX(${moveBottom}px)`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

/* ==========================================================================
   8. ROYAL GALLERY FILTERS & FULLSCREEN VIDEO/IMAGE LIGHTBOX (XK)
   ========================================================================== */
function initGalleryAndLightbox() {
  const filterBtns = document.querySelectorAll('#gallery-filter-tabs .filter-btn');
  const galleryItems = document.querySelectorAll('#main-gallery-grid .gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxVideo = document.getElementById('lightbox-video');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxClose = document.getElementById('lightbox-close');

  // Filter Buttons
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach((item) => {
        const categories = (item.getAttribute('data-category') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  function openLightbox(type, src, title, category) {
    if (!lightboxModal) return;

    if (type === 'video') {
      if (lightboxImg) lightboxImg.style.display = 'none';
      if (lightboxVideo) {
        lightboxVideo.style.display = 'block';
        lightboxVideo.src = src;
        lightboxVideo.muted = false;
        lightboxVideo.play().catch(() => {});
      }
    } else {
      if (lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.style.display = 'none';
        lightboxVideo.src = '';
      }
      if (lightboxImg) {
        lightboxImg.style.display = 'block';
        lightboxImg.src = src;
        lightboxImg.alt = title || 'Weddings by Harsha Portfolio';
      }
    }

    if (lightboxTitle) lightboxTitle.textContent = title || 'Weddings by Harsha Event';
    if (lightboxCategory) lightboxCategory.textContent = category || 'Royal Portfolio';

    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  // Clicking any gallery card
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const type = item.getAttribute('data-type') || 'image';
      const src = item.getAttribute('data-src');
      const title = item.getAttribute('data-title');
      const category = item.getAttribute('data-cat-name');
      openLightbox(type, src, title, category);
    });
  });

  function closeLightbox() {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lightboxVideo) {
        lightboxVideo.pause();
        lightboxVideo.src = '';
      }
    }
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   9. INTERACTIVE LEAD & QUOTE FORM WITH WHATSAPP DISPATCHER
   ========================================================================== */
function initContactForm() {
  const leadForm = document.getElementById('harsha-lead-form') || document.getElementById('harsha-contact-form');
  const chips = document.querySelectorAll('#services-chips .service-chip');

  if (!leadForm) return;

  // Toggle selection on chips if present
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
    });
  });

  leadForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Read full lead parameters
    const name = (document.getElementById('lead-name') || document.getElementById('contact-name'))?.value?.trim() || '';
    const phone = (document.getElementById('lead-phone') || document.getElementById('contact-phone'))?.value?.trim() || '';
    const email = (document.getElementById('lead-email') || document.getElementById('contact-email'))?.value?.trim() || '';
    const city = document.getElementById('lead-city')?.value || 'Bengaluru';
    const area = document.getElementById('lead-area')?.value || 'Bengaluru';
    const eventType = document.getElementById('lead-event-type')?.value || 'Wedding';
    const guests = document.getElementById('lead-guests')?.value || 'Not specified';
    const date = document.getElementById('lead-date')?.value?.trim() || 'Flexible / To be finalized';
    const budget = document.getElementById('lead-budget')?.value || 'Standard';
    const message = (document.getElementById('lead-message') || document.getElementById('contact-message'))?.value?.trim() || '';

    // Trigger celebration confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#cdaa7c', '#eaddcb', '#ffffff', '#25D366', '#d4af37']
    });

    const whatsappMessage = `*New Event Quotation Enquiry — Weddings by Harsha*
----------------------------------------
*Client Name:* ${name}
*Phone / WhatsApp:* ${phone}
*Email:* ${email}
*City:* ${city}
*Locality / Area:* ${area}
*Event Type:* ${eventType}
*Expected Guests:* ${guests}
*Preferred Date:* ${date}
*Budget Range:* ${budget}
*Special Notes / Venue:* ${message || 'Looking forward to discussing our upcoming celebration with Harsha.'}
----------------------------------------
_Sent from Weddings by Harsha Official Website_`;

    const whatsappUrl = `https://wa.me/919108619752?text=${encodeURIComponent(whatsappMessage)}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      leadForm.reset();
    }, 700);
  });
}

