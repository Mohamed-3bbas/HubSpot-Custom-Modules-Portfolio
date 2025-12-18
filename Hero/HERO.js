ل (function () {
  'use strict';

  /* ======================================================
     SHARED UTILITIES
  ====================================================== */

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  };

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.animation =
          `slideInUp 0.6s ease-out ${index * 0.1}s forwards`;
        entry.target.style.opacity = '1';
      }
    });
  }, observerOptions);

  /* ======================================================
     HERO MODULE JS
  ====================================================== */

  function initHeroModule() {

    // Smooth Scroll
    document.querySelectorAll('.hero-module a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        e.preventDefault();
        const headerHeight =
          document.querySelector('[data-module="header"]')?.offsetHeight || 0;

        const position =
          target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({ top: position, behavior: 'smooth' });
      });
    });

    // Hero Buttons Interaction
    document.querySelectorAll('.hero-cta').forEach(btn => {
      btn.addEventListener('mouseenter', () => btn.style.transform = 'translateY(-3px)');
      btn.addEventListener('mouseleave', () => btn.style.transform = 'translateY(0)');

      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          btn.click();
        }
      });
    });
  }
