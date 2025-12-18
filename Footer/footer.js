(function() {
  'use strict';

  // 1. إضافة تأثير عند الضغط على الإيميل
  const initFooterActions = () => {
    const emailLink = document.querySelector('.footer-email-link');
    if (emailLink) {
      emailLink.addEventListener('click', function(e) {
        // تأثير نبض خفيف عند الضغط
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 150);
      });
    }
  };

  // 2. تحسين ظهور العناصر (Scroll Reveal)
  const revealOnScroll = () => {
    // نحدد الفوتر والكروت
    const elements = document.querySelectorAll('.skill-card-item, .project-list-item, .main-footer');
    const windowHeight = window.innerHeight;

    elements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 50) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  };

  // 3. تهيئة العناصر قبل التحريك
  const setupAnimations = () => {
    const elements = document.querySelectorAll('.skill-card-item, .project-list-item');
    elements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  };

  // تشغيل كل الوظائف عند تحميل الصفحة
  document.addEventListener('DOMContentLoaded', () => {
    setupAnimations();
    initFooterActions();
    
    // تشغيل التحريك عند التمرير
    window.addEventListener('scroll', revealOnScroll);
    // تشغيل مرة واحدة عند التحميل لرؤية العناصر الموجودة بالفعل
    revealOnScroll();
  });

})(); 