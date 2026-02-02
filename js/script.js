
//  preloader functionality
  window.addEventListener('load', function () {
   setTimeout(function () {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.pointerEvents = 'none';
        setTimeout(() => preloader.style.display = 'none', 600);
      }
    }, 1000);
  });

// navbar sticky functionality
  const header = document.querySelector('header.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });


  // For option switching (Landing Page)
    const forOptions = document.querySelectorAll('.for-option');
    if (forOptions.length > 0) {
        forOptions.forEach(option => {
            option.addEventListener('click', function() {
                forOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all cards and items that need animation
    const elementsToObserve = [
        '.feature-card',
        '.stat-card',
        '.step-card',
        '.tool-card',
        '.device-card',
        '.age-card',
        '.situation-card',
        '.org-card',
        '.scale-card',
        '.help-card',
        '.benefit-item',
        '.approach-item',
        '.why-item'
    ];

    elementsToObserve.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.style.animationDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    });


