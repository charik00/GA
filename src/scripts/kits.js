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

(function () {
    document.querySelectorAll('[data-pptabs]').forEach(function (root) {
      var tabs  = [].slice.call(root.querySelectorAll('.pp-tab'));
      var items = [].slice.call(root.querySelectorAll('.pp-tabitem'));
      var heads = [].slice.call(root.querySelectorAll('.pp-acc-head'));
      var mq = window.matchMedia('(min-width: 721px)');
      var active = 0;
      items.forEach(function (it, i) { if (it.classList.contains('open')) active = i; });

      function syncDesktop() {
        if (!mq.matches) return;
        items.forEach(function (it, i) { it.classList.toggle('open', i === active); });
        tabs.forEach(function (t, i) {
          var on = i === active;
          t.classList.toggle('active', on);
          t.setAttribute('aria-selected', String(on));
        });
        heads.forEach(function (h, i) { h.setAttribute('aria-expanded', String(i === active)); });
      }

      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { active = i; syncDesktop(); });
      });

      heads.forEach(function (head, i) {
        head.addEventListener('click', function () {
          var item = items[i];
          var willOpen = !item.classList.contains('open');
          item.classList.toggle('open', willOpen);
          head.setAttribute('aria-expanded', String(willOpen));
          if (willOpen) active = i;
        });
      });

      (mq.addEventListener ? mq.addEventListener('change', syncDesktop) : mq.addListener(syncDesktop));
      syncDesktop();
    });
  })();

(function () {
    var overlay = document.getElementById('qv');
    if (!overlay) return;
    var panel = overlay.querySelector('.qv-panel');
    var elName = document.getElementById('qv-name');
    var elSlogan = document.getElementById('qv-slogan');
    var elTagline = document.getElementById('qv-tagline');
    var elFocus = document.getElementById('qv-focus');
    var elPriceSub = document.getElementById('qv-price-sub');
    var elPhoto = document.getElementById('qv-photo');
    var elPhotoTag = document.getElementById('qv-photo-tag');
    var elTabDesc = document.getElementById('qv-tab-description');
    var elTabWho = document.getElementById('qv-tab-who');
    var elTabHow = document.getElementById('qv-tab-howto');
    var elTabIngredients = document.getElementById('qv-tab-ingredients');
    var elTabImportant = document.getElementById('qv-tab-important');
    var elTabsRoot = document.getElementById('qv-tabs');
    var lastFocus = null;

    var DISCLAIMER = 'This is a dietary supplement, not a medicine, and does not replace treatment prescribed by a doctor. Consult a specialist before use, especially if pregnant, breastfeeding, taking medication, or managing a medical condition.';

    var FC = {
      'Nephroxil':'#5B7CA8', 'XL Man Pro':'#5B7CA8', 'HemoVitalis':'#C97A6E',
      'Bioactive Elixir':'#7E9FC5', 'Gastirix':'#C9A86E', 'Hepadetox':'#4A7C59',
      'Pro Bio Tech':'#8C8C8C', 'Cardilex':'#A8443C', 'Drainalene':'#6B9BA8', 'Vaïotec':'#D08A4A'
    };

    var IMPORTANT = 'These products are not intended to diagnose, treat, cure or prevent any disease. Consult your physician if pregnant, breastfeeding, taking medication or managing a medical condition.';

    var KIT_DATA = {
      'vital-man': {
        name: 'ALPHA VITALITY KIT', accent: '#5B7CA8',
        slogan: 'Systemic Kit · 4 Formulas',
        tagline: 'Male strength. It starts from within.',
        ba: { before: ['Fatigue', 'Low libido', 'Prostate concerns'], after: ['Energy', 'Vitality', 'Male strength'] },
        focus: 'Kidneys, prostate, testosterone, energy, vitality.',
        description: 'Designed for the modern man, this premium vitality system supports libido, masculine performance, hormonal balance, circulation, prostate wellness, and natural energy production. By combining powerful botanical ingredients with essential minerals, it helps reignite vitality, restore confidence, enhance endurance, and support peak male wellness from the inside out.',
        whoFor: 'Men focused on prostate health, energy, sexual vitality and longevity.',
        howToTake: '2 capsules 2-3 times daily with a small amount of water. See the packaging for the course and exact regimen, or check with a specialist.',
        ingredients: [
          { name: 'Nephroxil', role: 'deep support for kidneys, bladder and prostate.' },
          { name: 'XL Man Pro', role: 'libido, testosterone and circulation support.' },
          { name: 'HemoVitalis', role: 'blood quality, energy and stamina.' },
          { name: 'Bioactive Elixir', role: 'natural minerals for cellular function and energy.' }
        ],
        important: IMPORTANT
      },
      'digestive-reset': {
        name: 'GUT RESTORATION SYSTEM', accent: '#4A7C59',
        slogan: 'Systemic Kit · 4 Formulas',
        tagline: 'A healthy gut is the foundation of everything.',
        ba: { before: ['Bloating', 'Reflux', 'Heaviness after eating'], after: ['Lightness', 'Comfort', 'A healthy gut'] },
        focus: 'Stomach, absorption, acidity, microbiome.',
        description: 'Optimal health begins in the digestive system. This advanced formula combination supports stomach comfort, digestive balance, liver function, nutrient absorption, and intestinal microbiome health. Designed to help create the foundation for improved wellness, energy, and overall body performance.',
        whoFor: 'Those experiencing reflux, bloating, absorption issues, IBS, or seeking to build a healthy foundation for any restorative process.',
        howToTake: '2 capsules 2-3 times daily with a small amount of water. Pro Bio Tech, 1 capsule daily with or immediately after a meal, refrigerate after opening. See the packaging for the course and exact regimen, or check with a specialist.',
        ingredients: [
          { name: 'Gastirix', role: 'stomach restoration and acidity normalization.' },
          { name: 'Hepadetox', role: 'bile regulation and liver support for proper fat digestion.' },
          { name: 'Pro Bio Tech', role: 'intestinal flora and microbiome renewal.' },
          { name: 'Bioactive Elixir', role: 'minerals for absorption and systemic balance.' }
        ],
        important: IMPORTANT
      },
      'female-blood': {
        name: 'FEMALE VITAL ESSENCE KIT', accent: '#C97A6E',
        slogan: 'Systemic Kit · 4 Formulas',
        tagline: 'Female vitality. Renewed from within.',
        ba: { before: ['Fatigue', 'Low energy', 'Heaviness'], after: ['Energy', 'Lightness', 'Female vitality'] },
        focus: 'Blood, energy, internal cleansing, vitality.',
        description: 'A premium wellness program created to support female vitality, healthy circulation, hormonal harmony, reproductive wellness, emotional balance, and natural energy levels. Designed for women seeking greater resilience, balance, and long-term wellness from within.',
        whoFor: 'Women dealing with fatigue, low energy, poor absorption, or a body that needs to rebuild healthy blood and gentle internal cleansing.',
        howToTake: '2 capsules 2-3 times daily with a small amount of water. See the packaging for the course and exact regimen, or check with a specialist.',
        ingredients: [
          { name: 'HemoVitalis', role: 'builds blood and reduces fatigue.' },
          { name: 'Gastirix', role: 'restores the stomach and supports healthy absorption.' },
          { name: 'Hepadetox', role: 'supports the liver and gentle internal detox.' },
          { name: 'Bioactive Elixir', role: 'minerals for blood and systemic balance.' }
        ],
        important: IMPORTANT
      },
      'calm-heart': {
        name: 'INNER HARMONY KIT', accent: '#A8443C',
        slogan: 'Systemic Kit · 4 Formulas',
        tagline: 'A quiet heart is a strong heart.',
        ba: { before: ['Anxiety', 'Restless sleep', 'Tension'], after: ['Calm', 'Deep sleep', 'A steady heart'] },
        focus: 'Heart, nervous system, sleep, emotional balance.',
        description: 'Formulated to support emotional balance, relaxation, cardiovascular wellness, nervous system function, and restorative sleep. This unique combination promotes a greater sense of calm, resilience, and overall well-being in today’s demanding lifestyle.',
        whoFor: 'Those dealing with anxiety, stress, sleep problems, palpitations or nervous exhaustion.',
        howToTake: '2 capsules 2-3 times daily with a small amount of water. See the packaging for the course and exact regimen, or check with a specialist.',
        ingredients: [
          { name: 'Cardilex', role: 'calms and regulates heart rhythm.' },
          { name: 'HemoVitalis', role: 'oxygenates the blood and supports the brain.' },
          { name: 'Drainalene', role: 'reduces fluid load and eases the heart\u2019s work.' },
          { name: 'Bioactive Elixir', role: 'magnesium and minerals for the nervous system.' }
        ],
        important: IMPORTANT
      },
      'men-hair': {
        name: 'HAIR REGENERATION SYSTEM', accent: '#5B7CA8',
        slogan: 'Systemic Kit · 4 Formulas',
        tagline: 'Real growth starts beneath the surface.',
        ba: { before: ['Thinning hair', 'Low vitality', 'Fatigue'], after: ['Stronger hair', 'Energy', 'Vitality'] },
        focus: 'Kidneys, blood, hormones, vitality.',
        description: 'Designed to nourish the body from within, supporting healthy hair growth, stronger roots, hormonal balance, circulation, and essential mineral replenishment. A comprehensive internal approach to maintaining fuller, healthier-looking hair.',
        whoFor: 'Men with increased hair loss, thinning or slowed growth.',
        howToTake: '2 capsules 2-3 times daily with a small amount of water. See the packaging for the course and exact regimen, or check with a specialist.',
        ingredients: [
          { name: 'HemoVitalis', role: 'nourishes the hair roots through the blood.' },
          { name: 'XL Man Pro', role: 'hormonal support.' },
          { name: 'Nephroxil', role: 'reduces systemic strain.' },
          { name: 'Bioactive Elixir', role: 'zinc and minerals for hair growth.' }
        ],
        important: IMPORTANT
      },
      'aesthetic': {
        name: 'AESTHETIC REGENERATION SYSTEM', accent: '#6B9BA8',
        slogan: 'Systemic Kit · 4 Formulas',
        tagline: 'Beauty is a biological process.',
        ba: { before: ['Dull skin', 'Slow recovery', 'Imbalance'], after: ['Glow', 'Renewal', 'Balance'] },
        focus: 'Liver, lymph, inflammation, skin.',
        description: 'An advanced internal wellness protocol designed to complement aesthetic treatments by supporting detoxification, tissue nourishment, gut-skin balance, cellular renewal, and overall skin vitality. Ideal for individuals seeking to maximize and maintain aesthetic results through a holistic inside-out approach.',
        whoFor: 'Those undergoing aesthetic procedures, caring for skin quality, or wanting to support regeneration from within.',
        howToTake: '2 capsules 2-3 times daily with a small amount of water. Pro Bio Tech, 1 capsule daily with or immediately after a meal, refrigerate after opening. See the packaging for the course and exact regimen, or check with a specialist.',
        ingredients: [
          { name: 'Hepadetox', role: 'internal cleansing.' },
          { name: 'HemoVitalis', role: 'nourishes tissue through the blood.' },
          { name: 'Pro Bio Tech', role: 'restores the gut to skin axis.' },
          { name: 'Bioactive Elixir', role: 'collagen support, minerals and regeneration.' }
        ],
        important: IMPORTANT
      }
    };

    var PHOTOS = {};

    function openQV(card) {
      var id = card.getAttribute('data-kit');
      var d = KIT_DATA[id];
      if (!d) return;
      var accent = d.accent;

      panel.style.setProperty('--pp-accent', accent);
      elName.textContent = d.name;
      elSlogan.textContent = d.slogan;
      elTagline.textContent = d.tagline;
      elFocus.innerHTML = '<b>Focus:</b> ' + d.focus;
      elPriceSub.textContent = d.priceSub || (d.ingredients.length + ' formulas · complete system');

      // tab: description
      elTabDesc.textContent = d.description || '';
      // tab: who it is for
      elTabWho.textContent = d.whoFor || '';
      // tab: how to take
      elTabHow.textContent = d.howToTake || '';
      // tab: ingredients
      elTabIngredients.innerHTML = d.ingredients.map(function (f) {
        var c = FC[f.name] || accent;
        var role = f.role ? '<span class="ki-role">' + f.role + '</span>' : '';
        return '<li><span class="ki-dot" style="background:' + c + '"></span>' +
          '<span><span class="ki-name">' + f.name + '</span>' + role + '</span></li>';
      }).join('');
      // tab: important
      elTabImportant.textContent = d.important || '';

      // before / after block under the cover photo
      var elBA = document.getElementById('qv-ba');
      if (elBA) {
        if (d.ba && d.ba.before && d.ba.after) {
          var mkList = function (arr) {
            return arr.map(function (t) { return '<li>' + t + '</li>'; }).join('');
          };
          elBA.innerHTML =
            '<div class="qv-ba-col is-before">' +
              '<div class="qv-ba-label">Before</div>' +
              '<ul class="qv-ba-list">' + mkList(d.ba.before) + '</ul>' +
            '</div>' +
            '<div class="qv-ba-divider" aria-hidden="true"></div>' +
            '<div class="qv-ba-col is-after">' +
              '<div class="qv-ba-label">After</div>' +
              '<ul class="qv-ba-list">' + mkList(d.ba.after) + '</ul>' +
            '</div>';
          elBA.style.display = '';
        } else {
          elBA.innerHTML = '';
          elBA.style.display = 'none';
        }
      }

      // reset to first tab each open
      if (elTabsRoot) {
        var resetItems = elTabsRoot.querySelectorAll('.pp-tabitem');
        var resetTabs = elTabsRoot.querySelectorAll('.pp-tab');
        var resetHeads = elTabsRoot.querySelectorAll('.pp-acc-head');
        resetItems.forEach(function (it, i) { it.classList.toggle('open', i === 0); });
        resetTabs.forEach(function (t, i) {
          t.classList.toggle('active', i === 0);
          t.setAttribute('aria-selected', String(i === 0));
        });
        resetHeads.forEach(function (hd, i) { hd.setAttribute('aria-expanded', String(i === 0)); });
      }

      // photo (placeholder until provided)
      // cover: clone the card's cover composition (same as on the card)
      var coverHolder = document.getElementById('qv-cover');
      var cardCover = card.querySelector('.kit-photo.has-bottles');
      if (coverHolder) coverHolder.innerHTML = '';
      if (coverHolder && cardCover) {
        coverHolder.appendChild(cardCover.cloneNode(true));
        coverHolder.style.display = '';
        elPhoto.style.display = 'none';
        elPhotoTag.style.display = 'none';
      } else {
        if (coverHolder) coverHolder.style.display = 'none';
        elPhoto.style.display = 'none';
        elPhotoTag.style.display = '';
      }

      lastFocus = document.activeElement;
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('qv-lock');
      panel.scrollTop = 0;
      var x = overlay.querySelector('.qv-close');
      if (x) x.focus();
    }

    function closeQV() {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('qv-lock');
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    document.querySelectorAll('.kit-card').forEach(function (card) {
      card.addEventListener('click', function () { openQV(card); });
    });
    overlay.querySelectorAll('[data-qv-close]').forEach(function (el) {
      el.addEventListener('click', closeQV);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeQV();
    });

    var vf = document.getElementById('qv-view-formulas');
    if (vf) vf.addEventListener('click', function () {
      var root = document.getElementById('qv-tabs');
      if (!root) return;
      var ingTab = root.querySelectorAll('.pp-tab')[3];
      var ingItem = root.querySelectorAll('.pp-tabitem')[3];
      if (ingTab) ingTab.click();
      if (ingItem && !ingItem.classList.contains('open')) {
        ingItem.classList.add('open');
        var hd = ingItem.querySelector('.pp-acc-head');
        if (hd) hd.setAttribute('aria-expanded', 'true');
      }
      panel.scrollTo({ top: root.offsetTop - 20, behavior: 'smooth' });
    });
  })();
