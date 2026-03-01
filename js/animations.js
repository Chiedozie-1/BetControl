document.addEventListener("DOMContentLoaded", function () {
  try {
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // Add float class to icon elements
    document
      .querySelectorAll(
        ".feature-icon, .bettor-icon, .stat-icon, .tool-icon, .device-icon, .author-avatar",
      )
      .forEach((el) => {
        el.classList.add("float");
      });

    // Hero CTA pulse
    const ctas = document.querySelectorAll(
      ".btn-cta-green, .btn-primary-cta, .btn-primary-hero",
    );
    ctas.forEach((btn, i) => {
      if (i === 0) btn.classList.add("hero-cta-pulse");
    });

    // 3D tilt effect (desktop only)
    if (!isTouch) {
      const tiltTargets = document.querySelectorAll(
        ".feature-card, .bettor-card, .tool-card, .step-card, .device-card, .age-card",
      );
      tiltTargets.forEach((card) => {
        card.classList.add("tilt-card");
        // wrap inner content to preserve layout
        const inner = document.createElement("div");
        inner.className = "tilt-inner";
        while (card.firstChild) inner.appendChild(card.firstChild);
        card.appendChild(inner);

        let raf = null;
        function onMove(e) {
          const rect = card.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const mouseX = e.clientX || (e.touches && e.touches[0].clientX);
          const mouseY = e.clientY || (e.touches && e.touches[0].clientY);
          const dx = (mouseX - cx) / rect.width;
          const dy = (mouseY - cy) / rect.height;
          const rotateX = (dy * 8).toFixed(2);
          const rotateY = (-dx * 8).toFixed(2);
          if (raf) cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          });
        }

        function onLeave() {
          if (raf) cancelAnimationFrame(raf);
          inner.style.transform = "rotateX(0deg) rotateY(0deg)";
        }

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        card.addEventListener("blur", onLeave);
      });
    }

    // SVG line-draw reveal using IntersectionObserver
    const svgItems = document.querySelectorAll("svg.line-draw");
    if (svgItems.length) {
      const svgObserver = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("revealed");
              // add revealed class also to animate stroke via CSS
              entry.target.classList.add("revealed");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 },
      );
      svgItems.forEach((s) => svgObserver.observe(s));
    }

    // Add staggered delays to existing fade-in-up items for a nicer reveal
    const staggerSelectors = [
      ".feature-card",
      ".tool-card",
      ".step-card",
      ".bettor-card",
      ".feature-icon",
      ".benefit-item",
      ".why-item",
      ".age-card",
    ];
    staggerSelectors.forEach((selector) => {
      const list = Array.from(document.querySelectorAll(selector));
      list.forEach((el, idx) => {
        const delay = (idx % 6) * 0.08; // cycle up to 6
        el.style.animationDelay = el.style.animationDelay || `${delay}s`;
      });
    });

    // Line-draw specific: ensure stroke-dasharray set for paths if not already
    document.querySelectorAll("svg.line-draw").forEach((svg) => {
      svg
        .querySelectorAll("path, polyline, rect, circle, line")
        .forEach((shape) => {
          const len = shape.getTotalLength ? shape.getTotalLength() : 1000;
          shape.style.strokeDasharray = len;
          shape.style.strokeDashoffset = len;
        });
    });

    // Respect reduced-motion: remove heavy transforms if requested
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq && mq.matches) {
      document
        .querySelectorAll(".float, .tilt-card, .hero-cta-pulse")
        .forEach((el) => {
          el.classList.remove("float");
          el.classList.remove("hero-cta-pulse");
        });
    }

    // Prevent body scrolling when Bootstrap offcanvas is open.
    (function handleOffcanvasNoScroll() {
      const body = document.body;
      function setNoScroll(on) {
        if (on) {
          body.classList.add("no-scroll");
          document.documentElement.classList.add("no-scroll");
        } else {
          body.classList.remove("no-scroll");
          document.documentElement.classList.remove("no-scroll");
        }
      }

      // If Bootstrap is available, listen to its events
      try {
        const offcanvasEls = Array.from(
          document.querySelectorAll(".offcanvas"),
        );
        if (offcanvasEls.length) {
          offcanvasEls.forEach((el) => {
            el.addEventListener("shown.bs.offcanvas", () => setNoScroll(true));
            el.addEventListener("hidden.bs.offcanvas", () =>
              setNoScroll(false),
            );
          });

          // Fallback: observe class changes on offcanvas elements
          const mo = new MutationObserver((records) => {
            records.forEach((r) => {
              const target = r.target;
              if (target.classList && target.classList.contains("show")) {
                setNoScroll(true);
              } else {
                // if any offcanvas still has show, keep no-scroll
                const anyShow = offcanvasEls.some((o) =>
                  o.classList.contains("show"),
                );
                setNoScroll(anyShow);
              }
            });
          });
          offcanvasEls.forEach((o) =>
            mo.observe(o, { attributes: true, attributeFilter: ["class"] }),
          );
        }
      } catch (e) {
        // silent
      }
    })();
  } catch (err) {
    console.error("animations.js error", err);
  }
});
