document.addEventListener("DOMContentLoaded", function () {
  try {
    console.log("script.js: DOMContentLoaded");

    //  preloader functionality
    window.addEventListener("load", function () {
      setTimeout(function () {
        const preloader = document.getElementById("preloader");
        if (preloader) {
          preloader.style.opacity = "0";
          preloader.style.pointerEvents = "none";
          setTimeout(() => (preloader.style.display = "none"), 600);
        }
      }, 1000);
    });

    // navbar sticky functionality
    const header = document.querySelector("header.main-header");
    if (header) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) header.classList.add("sticky");
        else header.classList.remove("sticky");
      });
    } else console.warn("script.js: header.main-header not found");

    // For option switching (Landing Page) - also toggle content panels
    const forOptions = document.querySelectorAll(".for-option");
    const contentPanels = document.querySelectorAll('[id^="content-"]');

    function showPanel(target) {
      contentPanels.forEach((panel) => {
        panel.style.display = panel.id === `content-${target}` ? "" : "none";
      });
    }

    if (forOptions.length > 0) {
      forOptions.forEach((option) => {
        option.addEventListener("click", function () {
          forOptions.forEach((opt) => opt.classList.remove("active"));
          this.classList.add("active");
          const target = this.dataset.target;
          console.log("script.js: option clicked ->", target);
          if (target) showPanel(target);
        });
      });

      const active = document.querySelector(".for-option.active");
      const initialTarget = active ? active.dataset.target : "bettor";
      showPanel(initialTarget);
    } else console.warn("script.js: .for-option elements not found");

    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("fade-in-up");
      });
    }, observerOptions);

    // Observe all cards and items that need animation
    const elementsToObserve = [
      ".feature-card",
      ".stat-card",
      ".step-card",
      ".tool-card",
      ".device-card",
      ".age-card",
      ".situation-card",
      ".org-card",
      ".scale-card",
      ".help-card",
      ".benefit-item",
      ".approach-item",
      ".why-item",
    ];

    elementsToObserve.forEach((selector) => {
      document.querySelectorAll(selector).forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
      });
    });

    // Count-up animation for stats (triggers when visible)
    const statElements = document.querySelectorAll(".stat-count");

    function animateCount(el, start, end, duration, prefix, suffix) {
      const startTime = performance.now();
      const range = end - start;
      function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(start + range * progress);
        el.textContent = `${prefix}${value}${suffix}`;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if (statElements.length > 0) {
      const statsObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const start = parseInt(el.dataset.start, 10) || 0;
              const end = parseInt(el.dataset.end, 10) || 0;
              const duration = parseInt(el.dataset.duration, 10) || 1500;
              const prefix = el.dataset.prefix || "";
              const suffix = el.dataset.suffix || "";
              console.log("script.js: animating stat", el, start, end);
              animateCount(el, start, end, duration, prefix, suffix);
              obs.unobserve(el);
            }
          });
        },
        { threshold: 0.3 },
      );

      statElements.forEach((el) => statsObserver.observe(el));
    } else console.warn("script.js: .stat-count elements not found");
  } catch (err) {
    console.error("script.js error:", err);
  }
});
