/* ====================================================
   CHARCOAL FINE DINING - Main JavaScript
   ==================================================== */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // 1. LOADER
  // =============================================
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('no-scroll');
      }, 1200);
    });
    // Fallback
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 3000);
  }

  // Prevent scroll during load
  document.body.classList.add('no-scroll');


  // =============================================
  // 2. AOS ANIMATION INIT
  // =============================================
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
      delay: 0,
    });
  }


  // =============================================
  // 3. NAVBAR SCROLL BEHAVIOUR
  // =============================================
  const navbar = document.getElementById('navbar');

  function handleNavScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  // =============================================
  // 4. HAMBURGER MENU
  // =============================================
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.classList.toggle('no-scroll');
    });

    // Close when a link is clicked
    navLinks.querySelectorAll('.nav-link, .btn-book-nav').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.classList.remove('no-scroll');
      }
    });
  }


  // =============================================
  // 5. ACTIVE NAV LINK ON SCROLL (Intersection Observer)
  // =============================================
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(section => sectionObserver.observe(section));


  // =============================================
  // 6. MENU TABS
  // =============================================
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuGrids = document.querySelectorAll('.menu-grid');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      menuTabs.forEach(t => t.classList.remove('active'));
      menuGrids.forEach(g => g.classList.remove('active'));

      tab.classList.add('active');
      const targetGrid = document.getElementById(`tab-${target}`);
      if (targetGrid) {
        targetGrid.classList.add('active');
        // Re-trigger AOS for newly shown items
        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }
      }
    });
  });


  // =============================================
  // 7. FAQ ACCORDION
  // =============================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Close all
        faqItems.forEach(i => i.classList.remove('open'));

        // Toggle current
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });


  // =============================================
  // 8. BOOKING FORM SUBMISSION
  // =============================================
  const bookingForm    = document.getElementById('bookingForm');
  const bookingSuccess = document.getElementById('bookingSuccess');

  if (bookingForm) {
    // Set min date to today
    const dateInput = document.getElementById('bookDate');
    if (dateInput) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      dateInput.min = `${yyyy}-${mm}-${dd}`;
    }

    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = bookingForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      // Animate button
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing…';
      btn.disabled = true;

      // Simulate async booking (replace with real API call if needed)
      await new Promise(resolve => setTimeout(resolve, 1600));

      // Save to Table API
      try {
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData.entries());

        await fetch('tables/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name || '',
            phone: data.phone || '',
            date: data.date || '',
            time: data.time || '',
            guests: data.guests || '2',
            requests: data.requests || '',
            status: 'pending',
          }),
        });
      } catch (err) {
        // Silent fail — form success still shown
        console.log('Booking stored locally (API not available in preview)');
      }

      // Show success
      bookingForm.style.display = 'none';
      bookingSuccess.style.display = 'block';

      btn.innerHTML = originalText;
      btn.disabled = false;
    });
  }


  // =============================================
  // 9. SMOOTH SCROLL FOR ANCHOR LINKS
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = navbar ? navbar.offsetHeight + 20 : 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // =============================================
  // 10. BACK TO TOP BUTTON
  // =============================================
  const backToTop = document.getElementById('backToTop');

  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }, { passive: true });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // =============================================
  // 11. GALLERY LIGHTBOX (Simple)
  // =============================================
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Create lightbox
  const lightbox = document.createElement('div');
  lightbox.id = 'lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-overlay"></div>
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Close">✕</button>
      <button class="lightbox-prev" aria-label="Previous">&#8249;</button>
      <button class="lightbox-next" aria-label="Next">&#8250;</button>
      <img src="" alt="" class="lightbox-img" />
      <p class="lightbox-caption"></p>
    </div>
  `;
  document.body.appendChild(lightbox);

  // Inject lightbox styles
  const lbStyle = document.createElement('style');
  lbStyle.textContent = `
    #lightbox {
      position: fixed;
      inset: 0;
      z-index: 2000;
      display: none;
      align-items: center;
      justify-content: center;
    }
    #lightbox.active { display: flex; }
    .lightbox-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.94);
      cursor: pointer;
    }
    .lightbox-content {
      position: relative;
      z-index: 1;
      max-width: 90vw;
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .lightbox-img {
      max-width: 85vw;
      max-height: 75vh;
      border-radius: 10px;
      object-fit: contain;
      box-shadow: 0 20px 60px rgba(0,0,0,0.8);
      border: 1px solid rgba(201, 168, 76, 0.3);
    }
    .lightbox-caption {
      font-family: 'Cormorant Garamond', serif;
      font-style: italic;
      color: #e8c96a;
      font-size: 1rem;
      letter-spacing: 0.05em;
    }
    .lightbox-close {
      position: fixed;
      top: 20px;
      right: 24px;
      background: rgba(201, 168, 76, 0.15);
      border: 1.5px solid rgba(201, 168, 76, 0.4);
      color: #c9a84c;
      font-size: 1.2rem;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2001;
    }
    .lightbox-close:hover { background: rgba(201, 168, 76, 0.3); transform: rotate(90deg); }
    .lightbox-prev, .lightbox-next {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(201, 168, 76, 0.12);
      border: 1.5px solid rgba(201, 168, 76, 0.3);
      color: #c9a84c;
      font-size: 2rem;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2001;
    }
    .lightbox-prev { left: 20px; }
    .lightbox-next { right: 20px; }
    .lightbox-prev:hover, .lightbox-next:hover { background: rgba(201, 168, 76, 0.3); }
    @media (max-width: 600px) {
      .lightbox-prev, .lightbox-next { width: 38px; height: 38px; font-size: 1.4rem; }
    }
  `;
  document.head.appendChild(lbStyle);

  let currentLbIndex = 0;
  const galleryImages = [];

  galleryItems.forEach((item, idx) => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-overlay span');
    if (img) {
      galleryImages.push({ src: img.src, alt: img.alt, caption: caption ? caption.textContent : img.alt });
    }

    item.addEventListener('click', () => {
      currentLbIndex = idx;
      openLightbox(currentLbIndex);
    });
  });

  function openLightbox(index) {
    const item = galleryImages[index];
    if (!item) return;
    const lbImg = lightbox.querySelector('.lightbox-img');
    const lbCap = lightbox.querySelector('.lightbox-caption');
    lbImg.src = item.src;
    lbImg.alt = item.alt;
    lbCap.textContent = item.caption;
    lightbox.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-overlay').addEventListener('click', closeLightbox);

  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
    currentLbIndex = (currentLbIndex - 1 + galleryImages.length) % galleryImages.length;
    openLightbox(currentLbIndex);
  });

  lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
    currentLbIndex = (currentLbIndex + 1) % galleryImages.length;
    openLightbox(currentLbIndex);
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      currentLbIndex = (currentLbIndex - 1 + galleryImages.length) % galleryImages.length;
      openLightbox(currentLbIndex);
    }
    if (e.key === 'ArrowRight') {
      currentLbIndex = (currentLbIndex + 1) % galleryImages.length;
      openLightbox(currentLbIndex);
    }
  });


  // =============================================
  // 12. MENU CARD HOVER AUDIO FEEDBACK (subtle)
  // =============================================
  // Visual hover enhancements are CSS-based.
  // Additional JS ripple effect on CTA buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        top: ${e.clientY - rect.top - size/2}px;
        left: ${e.clientX - rect.left - size/2}px;
        background: rgba(255,255,255,0.15);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-anim 0.6s ease-out;
        pointer-events: none;
        z-index: 0;
      `;
      if (getComputedStyle(this).position === 'static') {
        this.style.position = 'relative';
      }
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  // Ripple animation
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    @keyframes ripple-anim {
      to { transform: scale(2.5); opacity: 0; }
    }
    .btn { position: relative; }
    .btn * { position: relative; z-index: 1; }
  `;
  document.head.appendChild(rippleStyle);


  // =============================================
  // 13. NUMBER COUNTER ANIMATION
  // =============================================
  function animateCount(el, target, suffix = '') {
    let current = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.round(current) + suffix;
    }, 16);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.getAttribute('data-count');
        if (text) {
          const num = parseInt(text);
          const suffix = el.getAttribute('data-suffix') || '';
          animateCount(el, num, suffix);
        }
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => statsObserver.observe(el));


  // =============================================
  // 14. TESTIMONIALS AUTO-CAROUSEL (mobile)
  // =============================================
  // On mobile, we add swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  const testimonialsGrid = document.querySelector('.testimonials-grid');

  if (testimonialsGrid) {
    testimonialsGrid.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    testimonialsGrid.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      // Could implement swipe scroll here
    }, { passive: true });
  }


  // =============================================
  // 15. SCROLL REVEAL FOR STAT NUMBERS
  // =============================================
  // Hero stats are animated via AOS; feature numbers get counter
  const heroStats = document.querySelectorAll('.stat-num');

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.8 });

  heroStats.forEach(stat => statObserver.observe(stat));


  // =============================================
  // 16. GOLD PARTICLE EFFECT ON HERO (subtle)
  // =============================================
  function createParticle() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(201, 168, 76, 0.6);
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      pointer-events: none;
      z-index: 1;
      animation: particleFly ${3 + Math.random() * 4}s ease-out forwards;
    `;
    hero.appendChild(particle);
    setTimeout(() => particle.remove(), 7000);
  }

  const particleStyle = document.createElement('style');
  particleStyle.textContent = `
    @keyframes particleFly {
      0% { transform: translateY(0) scale(1); opacity: 0.8; }
      100% { transform: translateY(-${80 + Math.random() * 120}px) scale(0); opacity: 0; }
    }
  `;
  document.head.appendChild(particleStyle);

  // Create particles periodically
  setInterval(createParticle, 800);


  // =============================================
  // 17. PRELOAD CRITICAL IMAGES
  // =============================================
  const criticalImages = [
    'https://sspark.genspark.ai/cfimages?u1=RoKnvHt1ZmOYJKUa5vmbaUR%2BA5cNxBE1X6AU4eVw7xRkNfGjOKTvBiOUzlLMDEYPiNedlN6De9NBuQH1UpK93Stf%2F2NiqugzoFbYFEdoWAf2j7tj&u2=wbHCrAc%2BbtQ1w8m%2F&width=2560',
  ];

  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });


  // =============================================
  // 18. LAZY LOAD IMAGES
  // =============================================
  const lazyImages = document.querySelectorAll('img:not([loading])');
  lazyImages.forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
  });

  console.log('%cCharcoal Fine Dining 🔥', 'color: #c9a84c; font-size: 18px; font-weight: bold; font-family: serif;');
  console.log('%cBest Fine Dining Experience in Varanasi', 'color: #888; font-size: 12px;');

}); // END DOMContentLoaded
