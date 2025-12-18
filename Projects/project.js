/* ======================================================
     PROJECT LIST MODULE JS
  ====================================================== */
function initProjectModule() {
    const projects = document.querySelectorAll('.project-list-item');

    projects.forEach(project => {
      // تعديل الحركة لتكون للأعلى (Vertical) بدل الجنب
      project.addEventListener('mouseenter', () => {
        project.style.transform = 'translateY(-10px)';
      });

      project.addEventListener('mouseleave', () => {
        project.style.transform = 'translateY(0)';
      });
    });
 }
      project.addEventListener('mouseleave', () => {
        project.style.transform = 'translateX(0)';
      });
    });

    // Project buttons
    document.querySelectorAll('.view-project-btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => btn.style.transform = 'translateY(-3px)');
      btn.addEventListener('mouseleave', () => btn.style.transform = 'translateY(0)');
    });
  }

  /* ======================================================
     LAZY LOAD IMAGES (SHARED)
  ====================================================== */

  function initLazyImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    if (!('IntersectionObserver' in window)) return;

    const imgObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          imgObserver.unobserve(entry.target);
        }
      });
    });

    images.forEach(img => {
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.3s ease';
      imgObserver.observe(img);
    });
  }

  /* ======================================================
     INIT ALL MODULES
  ====================================================== */

  document.addEventListener('DOMContentLoaded', () => {
    initHeroModule();
    initSkillModule();
    initProjectModule();
    initLazyImages();
  });

})();