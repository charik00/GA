(function () {
    var sections = [].slice.call(document.querySelectorAll('.phil-section'));

    function reveal(el) { el.classList.add('in-view'); }
    function revealAll() { sections.forEach(reveal); }

    // Reveal any section currently within (or near) the viewport.
    function revealInView() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      sections.forEach(function (el) {
        if (el.classList.contains('in-view')) return;
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > vh * 0.1) reveal(el);
      });
    }

    try {
      // Flag that JS is alive, so the hide rules take effect.
      document.documentElement.classList.add('reveal');

      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
        sections.forEach(function (el) { io.observe(el); });
      }

      // Immediately reveal what's already on screen (covers the first slide).
      revealInView();
      window.addEventListener('scroll', revealInView, { passive: true });
      window.addEventListener('load', revealInView);

      // Safety net: never leave content hidden.
      setTimeout(revealInView, 400);
      setTimeout(revealAll, 2500);
    } catch (err) {
      revealAll();
    }

    // Header drop-shadow when scrolled.
    var h = document.getElementById('header');
    if (h) {
      var onScroll = function () {
        if (window.scrollY > 12) h.classList.add('scrolled');
        else h.classList.remove('scrolled');
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  })();
