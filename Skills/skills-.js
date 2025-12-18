// ========== SKILLS GRID MODULE JAVASCRIPT ==========

(function() {
  'use strict';

  const module = document.querySelector('[data-module="skills-grid"]');
  
  if (!module) return;

  const skillCards = module.querySelectorAll('.skill-card-item');

  // ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = `slideInCard 0.6s ease-out ${index * 0.1}s forwards`;
        entry.target.style.opacity = '1';
      }
    });
  }, observerOptions);

  // Observe skill cards
  skillCards.forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
  });

  // ========== ADD ANIMATION KEYFRAMES ==========
  if (!document.querySelector('#skills-grid-animations')) {
    const style = document.createElement('style');
    style.id = 'skills-grid-animations';
    style.textContent = `
      @keyframes slideInCard {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ========== HOVER EFFECTS ==========
  skillCards.forEach(card => {
    const icon = card.querySelector('.skill-card-icon');

    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-12px)';
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });

    // Icon animation on hover
    if (icon) {
      card.addEventListener('mouseenter', function() {
        icon.style.transform = 'scale(1.1)';
      });

      card.addEventListener('mouseleave', function() {
        icon.style.transform = 'scale(1)';
      });
    }
  });

  // ========== KEYBOARD NAVIGATION ==========
  skillCards.forEach((card, index) => {
    card.setAttribute('tabindex', '0');
    
    card.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight' && index < skillCards.length - 1) {
        e.preventDefault();
        skillCards[index + 1].focus();
      } else if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault();
        skillCards[index - 1].focus();
      }
    });

    card.addEventListener('focus', function() {
      this.style.outline = '2px solid #5a67d8';
      this.style.outlineOffset = '2px';
    });

    card.addEventListener('blur', function() {
      this.style.outline = 'none';
    });
  });

  // ========== LAZY LOAD IMAGES ==========
  const images = module.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = '1';
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease';
      imageObserver.observe(img);
    });
  }

  // ========== SMOOTH SCROLL TO SKILLS ==========
  const skillsLink = document.querySelector('a[href="#skills"]');
  if (skillsLink) {
    skillsLink.addEventListener('click', function(e) {
      e.preventDefault();
      
      const headerHeight = document.querySelector('[data-module="header"]')?.offsetHeight || 0;
      const moduleTop = module.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: moduleTop,
        behavior: 'smooth'
      });
    });
  }

  // ========== ACCESSIBILITY ==========
  module.setAttribute('role', 'region');
  module.setAttribute('aria-label', 'Skills showcase');

  skillCards.forEach((card, index) => {
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Skill ${index + 1} of ${skillCards.length}`);
  });

})();