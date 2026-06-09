(function () {
    var sections = [].slice.call(document.querySelectorAll('.phil-section'));
    function reveal(el) { el.classList.add('in-view'); }
    function revealAll() { sections.forEach(reveal); }
    function revealInView() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      sections.forEach(function (el) {
        if (el.classList.contains('in-view')) return;
        var r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > vh * 0.1) reveal(el);
      });
    }
    try {
      document.documentElement.classList.add('reveal');
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { reveal(e.target); io.unobserve(e.target); }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
        sections.forEach(function (el) { io.observe(el); });
      }
      revealInView();
      window.addEventListener('scroll', revealInView, { passive: true });
      window.addEventListener('load', revealInView);
      setTimeout(revealInView, 400);
      setTimeout(revealAll, 2500);
    } catch (err) { revealAll(); }

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

(function () {
    var items = [].slice.call(document.querySelectorAll('.faq-item'));
    items.forEach(function (item) {
      var btn = item.querySelector('.faq-q');
      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');
        item.classList.toggle('open', !isOpen);
        btn.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  })();
