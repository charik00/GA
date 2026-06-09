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
    var elPhoto = document.getElementById('qv-photo');
    var elPhotoTag = document.getElementById('qv-photo-tag');
    var elDesc = document.getElementById('qv-desc');
    var elTags = document.getElementById('qv-tags');
    var elPriceSub = document.getElementById('qv-price-sub');
    var lastFocus = null;

    var DISCLAIMER = 'This is a dietary supplement, not a medicine, and does not replace treatment prescribed by a doctor. Consult a specialist before use, especially if pregnant, breastfeeding, taking medication, or managing a medical condition.';
    function P(t) { return '<p>' + t + '</p>'; }
    function UL(items) { return '<ul class="qv-ul"><li>' + items.join('</li><li>') + '</li></ul>'; }

    var QV_DATA = {
      'HEPADETOX': {
        slogan: 'Detox Fication',
        desc: 'Support for the liver and the detoxification system. When the liver works, the whole body works better.',
        tags: ['Liver', 'Gallbladder', 'Pancreas', 'Thyroid'],
        priceSub: '60 capsules &middot; 30 g net',
        photo: '/images/products/hepadetox.png',
        t: [
          P('Hepadetox is a formula that supports the liver and the detoxification system. The liver is the body&rsquo;s main filter: it breaks down and clears metabolic waste, toxins, drug residues, and hormones. When it slows down, the whole body suffers, skin, digestion, energy, hormonal balance. The formula is built on a natural complex of plant components that support the liver&rsquo;s natural cleansing processes and the bile system, without burdening the body with synthetics.'),
          P('For those who feel heaviness after meals, lower energy, or skin issues. For those going through periods of higher liver load. As part of a gentle detox and recovery program. <em>(Not intended for pregnant or breastfeeding women, children, or those on prescription medication without a doctor&rsquo;s advice.)</em>'),
          P('2 capsules twice a day with a little water. See the packaging for the course and exact regimen, or check with a specialist.'),
          P('Plantago major, Bupleurum chinensis, Codonopsis pilosula, Pinellia ternata, Scutellaria baicalensis, Ostrea gigas, Glycyrrhiza, Rehmannia glutinosa, Zingiber officinale. Vegetable capsule (HPMC). Capsule weight 500 mg, net weight 30 g.'),
          P('This is not a medicine and does not replace treatment prescribed by a doctor. A dietary supplement is not a substitute for a balanced diet. Consult a specialist before use.')
        ]
      },
      'NEPHROXIL': {
        slogan: 'Essence Life',
        desc: 'The kidneys regulate pressure, eliminate toxins, influence aging. Nephroxil, support from within.',
        tags: ['Kidneys', 'Bladder', 'Prostate', 'Male system'],
        priceSub: '60 capsules &middot; 30 g net',
        t: [
          P('Nephroxil, a formula for supporting the kidneys, bladder, and related systems. The kidneys filter the blood, regulate pressure, eliminate toxins, and influence the rate of aging. When they work well, you feel younger and more energetic. The formula supports natural fluid elimination without burdening the kidneys, unlike conventional diuretics, and supports healthy bladder function and comfortable urination. In Chinese medicine the kidneys are directly linked to male reproductive function, so supporting them positively influences libido, prostate health, and overall male vitality. One of the formula&rsquo;s key properties, restoring vitality and a sense of youth from within.'),
          UL(['Frequent urinary tract infections', 'Edema and fluid retention', 'Kidney stones or prevention', 'Overactive bladder, incontinence', 'High blood pressure related to kidney function', 'Enlarged prostate', 'Reduced libido and erectile dysfunction', 'General fatigue and low vitality']),
          P('2 capsules 2&ndash;3 times daily with a small amount of water. Contains honey. May contain traces of gluten, soy, mustard, celery, sesame, and walnuts.'),
          P('Rehmannia glutinosa, Cinnamomum aromaticum, Dioscorea, Cornus officinalis, Eucommia ulmoides, Lycium barbarum, Cuscuta europaea, Morinda officinalis, Wolfiporia extensa, Glycyrrhiza. Vegetable capsule (HPMC). Capsule weight 500 mg, net weight 30 g.'),
          P(DISCLAIMER)
        ]
      },
      'HEMOVITALIS': {
        slogan: 'Revitalizing Flow',
        desc: 'Blood nourishes every cell. Energy, mood, sleep, it all starts here.',
        tags: ['Blood', 'Hormonal balance', 'Nervous system'],
        priceSub: '60 capsules &middot; 30 g net',
        t: [
          P('HemoVitalis, a formula for supporting blood quality and circulation. Blood nourishes every cell in the body. When it is healthy and flows freely, you feel it in your energy, mood, sleep, and mental clarity. The formula supports blood production, improves its quality, and promotes normal circulation throughout the body. The result, more energy, better sleep, stable mood, and hormonal balance. It supports brain function, memory, and concentration through improved blood supply. Women notice improved cycle regularity, reduced pain, and stabilized hormonal balance.'),
          UL(['Chronic fatigue and weakness', 'Anemia of various types', 'Pallor, cold intolerance, cold extremities', 'Sleep disturbances, palpitations, dizziness', 'Mood swings, depression, postpartum depression', 'Raynaud&rsquo;s syndrome', 'Irregular cycle, endometriosis, fertility issues', 'Reduced memory and concentration']),
          P('2 capsules 2&ndash;3 times daily with a small amount of water. Contains honey.'),
          P('Codonopsis pilosula, Rehmannia glutinosa, Wolfiporia extensa, Paeonia lactiflora, Angelica sinensis, Atractylodes macrocephala, Ligusticum sinensis, Eucommia ulmoides, Dipsacus asper, Zingiber officinale, Glycyrrhiza. Vegetable capsule (HPMC). Capsule weight 500 mg, net weight 30 g.'),
          P(DISCLAIMER)
        ]
      },
      'GASTIRIX': {
        slogan: 'Basic Foundation',
        desc: 'Almost all chronic conditions begin in the gut. Start with the foundation.',
        tags: ['Stomach', 'Intestines', 'Digestion', 'Immunity'],
        priceSub: '60 capsules &middot; 30 g net',
        t: [
          P('Gastirix, the foundational formula for digestive system support. Almost all chronic conditions begin in the gut. When digestion works well, the body absorbs nutrients, immunity is stronger, and overall wellbeing improves. The formula supports healthy gastric mucosa, healthy intestinal flora, and normal digestive rhythm. It helps reduce excess mucus in the intestines, which positively influences ear, sinus, and respiratory health, and supports normal histamine levels, relevant for allergic reactions.'),
          UL(['Acid reflux, GERD, ulcers', 'Diarrhea, constipation, IBS', 'Gastritis, colitis, Crohn&rsquo;s disease', 'Bloating, malabsorption', 'Frequent ear and sinus infections', 'Allergies', 'Reduced appetite following illness']),
          P('2 capsules 2&ndash;3 times daily with a small amount of water.'),
          P('Wolfiporia extensa, Astragalus membranaceus, Codonopsis pilosula, Cinnamomum aromaticum, Atractylodes macrocephala, Citrus reticulata, Magnolia officinalis, Zingiber officinale, Glycyrrhiza. Vegetable capsule (HPMC). Capsule weight 500 mg, net weight 30 g.'),
          P(DISCLAIMER)
        ]
      },
      'CARDILEX': {
        slogan: 'Peaceful Soul',
        desc: 'The heart never stops. Support it.',
        tags: ['Heart', 'Pericardium', 'Nervous system', 'Sleep'],
        priceSub: '60 capsules &middot; 30 g net',
        t: [
          P('Cardilex, a formula for supporting the heart, nervous system, and emotional balance. The heart works without stopping. When it receives the right nourishment and blood supply, you feel calmer, more energetic, and sleep better. The formula supports healthy cardiac blood supply, normal heart rhythm, and healthy blood pressure, and helps reduce excess fluid around the heart, easing its workload. In Chinese medicine the heart is directly linked to emotional state. Many notice reduced anxiety, improved sleep, and a general sense of calm within the first weeks of use, without the risk of dependency.'),
          UL(['Heart rhythm irregularities, palpitations', 'Elevated CPK in lab results', 'Fluid retention around the heart', 'Stress, anxiety, restlessness', 'Sleep disturbances', 'ADHD, hyperactivity', 'Blood pressure irregularities']),
          P('2 capsules 2&ndash;3 times daily with a small amount of water.'),
          P('Rehmannia glutinosa, Angelica sinensis, Codonopsis pilosula, Ophiopogon japonicus, Asparagus cochinchinensis, Ziziphus jujuba, Wolfiporia extensa, Polygala tenuifolia, Schisandra chinensis, Pinellia ternata, Dimocarpus longan, Ostrea gigas (contains components from the sea), Salvia miltiorrhiza. Vegetable capsule (HPMC). Capsule weight 500 mg, net weight 30 g.'),
          P(DISCLAIMER)
        ]
      },
      'DRAINALENE': {
        slogan: 'Drying Damp',
        desc: 'Chronic mucus. Edema. Recurring symptoms. One cause, one formula.',
        tags: ['Lymphatic system', 'Respiratory tract', 'Sinuses', 'Digestion'],
        priceSub: '60 capsules &middot; 30 g net',
        t: [
          P('Drainalene, a formula for eliminating excess moisture and mucus from the body. Chronic mucus and internal dampness are among the most underestimated causes of recurring health issues. A cough that won&rsquo;t clear. Congestion that keeps returning. Unexplained swelling. Often the same underlying cause. The formula supports the body&rsquo;s natural drainage and promotes elimination of excess fluid and mucus from the respiratory tract, digestive system, and other tissues. The result, fewer recurrences, easier breathing, less swelling. For maximum effect, recommended alongside the relevant system formula: Gastirix for digestive issues, Nephroxil for edema, HemoVitalis for gynecological concerns.'),
          UL(['Chronic cough, sinusitis, ear infections', 'Edema and fluid retention', 'Lingering mucus following a cold or respiratory infection', 'Inflammation of the respiratory tract', 'Endometriosis and mucus-related gynecological conditions', 'Digestive system conditions']),
          P('2 capsules 2&ndash;3 times daily. Recommended alongside the relevant system formula.'),
          P('Crataegus pinnatifida, Hordeum vulgare (gluten), Atractylodes macrocephala, Wolfiporia extensa, and a complementary plant complex. Vegetable capsule (HPMC). Capsule weight 500 mg, net weight 30 g. May contain wheat and barley (gluten).'),
          P(DISCLAIMER)
        ]
      },
      'PRO BIO TECH': {
        slogan: 'Digestive Bacteria',
        desc: 'Not just a probiotic. A formula that works.',
        tags: ['Microbiome', 'Intestinal flora', 'Immunity', 'Digestion'],
        priceSub: '60 capsules &middot; 33 g net',
        t: [
          P('Pro Bio Tech, a probiotic formula delivering 25 billion CFU per capsule with 9 bacterial strains in a delayed-release capsule. Most probiotics die in the stomach before reaching the intestine. Pro Bio Tech solves this, the bacteria arrive where they are needed. The formula supports a healthy microbiome, comfortable digestion, and normal bowel function. It strengthens immunity from within, as most of the immune system resides in the gut, and contains L-glutamine to support healthy intestinal mucosa. Especially effective following a course of antibiotics or other medications that disrupt intestinal flora.'),
          UL(['Recovery following antibiotic use', 'Digestive and absorption disorders', 'Irregular bowel movements', 'Weakened immune system', 'Irritable bowel syndrome', 'Alongside other formulas to enhance absorption']),
          P('1 capsule daily with or immediately after a meal. Refrigerate after opening.'),
          P('Lactobacillus acidophilus, Lactobacillus plantarum, Bifidobacterium animalis ssp. lactis, Bifidobacterium breve, Lactobacillus crispatus, Lactobacillus reuteri, Lactobacillus rhamnosus, Streptococcus thermophilus, Bacillus coagulans BC01, L-glutamine. Delayed-release capsule (HPMC). 60 capsules, net weight 33 g.'),
          P(DISCLAIMER)
        ]
      },
      'BIOACTIVE ELIXIR': {
        slogan: 'Essential Elements',
        desc: 'Minerals from nature, not from a laboratory. The difference is felt.',
        tags: ['Bones', 'Joints', 'Muscles', 'Nervous system'],
        priceSub: '60 capsules &middot; 30 g net',
        t: [
          P('Bioactive Elixir, a mineral complex based on zinc, magnesium, and calcium from natural sources. Synthetic minerals are poorly absorbed or not absorbed at all. Here it is different, the minerals arrive in a form the body can recognize and use. The formula supports bone and joint health, nourishes muscles and the nervous system, and supports tendon flexibility and tissue recovery. The result, stronger bones, fewer cramps, better mobility. Included in all 6 Genetic Analyze kits as the foundation of mineral balance.'),
          UL(['Osteoporosis, bone weakness', 'Joint pain, arthritis', 'Muscle cramps, weakness', 'Magnesium and zinc deficiency', 'Recovery following injury or surgery', 'Nervous system support', 'As part of any restorative protocol']),
          P('2 capsules 2&ndash;3 times daily with a small amount of water.'),
          P('Ostrea gigas (mollusk), Crystalline gypsum, Zingiber officinale, Citrus reticulata, Wolfiporia extensa. Vegetable capsule (HPMC). Capsule weight 500 mg, net weight 30 g.'),
          P(DISCLAIMER)
        ]
      },
      'XL MAN PRO': {
        slogan: 'Life Essence',
        desc: 'Energy. Libido. Endurance. It all starts with balance.',
        tags: ['Libido', 'Testosterone', 'Male vitality', 'Energy'],
        priceSub: '60 capsules &middot; 30 g net',
        t: [
          P('XL Man Pro, a formula for supporting male vitality, energy, and hormonal balance. Energy, libido, and endurance are the result of how hormones, circulation, and the nervous system work together. The formula based on Bulgarian tribulus and adaptogenic plants supports healthy testosterone levels, normal circulation, and sexual vitality. The action is cumulative, results are sustained with regular use. Effective not only for men, women also notice improved energy, hormonal balance, and overall tone.'),
          UL(['Reduced libido in men and women', 'Fatigue, reduced physical stamina', 'Hormonal imbalance', 'Prostate health support', 'Natural support for sexual vitality']),
          P('2 capsules 2&ndash;3 times daily with a small amount of water.'),
          P('Tribulus terrestris, Cinnamomum aromaticum, Ostrea gigas (mollusk), and an adaptogenic plant complex. Vegetable capsule (HPMC). Capsule weight 500 mg, net weight 30 g.'),
          P(DISCLAIMER)
        ]
      },
      'STOMAVIL': {
        slogan: 'Basic Harmony',
        desc: 'Heartburn. Nausea. Bloating. Fast and gentle relief.',
        tags: ['Stomach', 'Fast relief', 'Digestion'],
        priceSub: '60 capsules &middot; 30 g net',
        t: [
          P('Stomavil, a formula for fast relief of digestive symptoms. Heartburn, nausea, bloating, heaviness after eating, all signals that the stomach needs support. Stomavil acts quickly and gently, without damaging the mucosal lining. It supports comfortable digestion, healthy stomach acidity, and normal upper GI function, an effective alternative to antacids for regular use. Also helpful for motion sickness and nausea.'),
          UL(['Frequent heartburn and acid reflux', 'GERD', 'Nausea and vomiting', 'Bloating and gas', 'Discomfort after eating', 'Motion sickness', 'Bad breath']),
          P('2 capsules 2&ndash;3 times daily or as needed. Contains gluten and honey. May contain traces of soy, mustard, celery, sesame, and walnuts.'),
          P('Crataegus pinnatifida, Hordeum vulgare (gluten), Magnolia officinalis, Wolfiporia extensa, Saussurea costus, Zingiber officinale, Citrus reticulata, Glycyrrhiza (contains honey). Vegetable capsule (HPMC). Capsule weight 500 mg, net weight 30 g.'),
          P(DISCLAIMER)
        ]
      },
      'SUCREOL': {
        slogan: 'Balance Return',
        desc: 'Unstable blood sugar shows up in everything. Sucreol works on the cause.',
        tags: ['Blood sugar', 'Metabolism', 'Pancreas'],
        priceSub: '60 capsules &middot; 30 g net',
        t: [
          P('Sucreol, a formula for supporting healthy glucose metabolism and pancreatic function. Unstable blood sugar makes itself known in many ways, constant thirst, sugar cravings, fatigue after eating, brain fog. Sucreol works on the cause, not just the symptoms. It supports healthy pancreatic function, healthy cellular sensitivity to glucose, and normal sugar metabolism. Many notice reduced sugar cravings, more stable energy throughout the day, and improved concentration. It also supports healthy acidity of the digestive tract and joint health.'),
          UL(['Pre-diabetes, type 1 and type 2 diabetes', 'Unstable blood sugar levels', 'Sugar cravings', 'Headaches and migraines related to overheating', 'Frequent urination, thirst', 'Brain fog, difficulty concentrating', 'Excess acidity of the digestive tract', 'Joint pain related to acid accumulation']),
          P('2 capsules 2&ndash;3 times daily with a small amount of water. May contain traces of gluten, soy, mustard, celery, sesame, and walnuts.'),
          P('Wolfiporia extensa, Rehmannia glutinosa, Codonopsis pilosula, Anemarrhena asphodeloides, Cinnamomum aromaticum, Atractylodes macrocephala, Crystalline gypsum, Astragalus membranaceus, Glycyrrhiza, Zingiber officinale. Vegetable capsule (HPMC). Capsule weight 500 mg, net weight 30 g.'),
          P(DISCLAIMER)
        ]
      },
      'VAÏOTEC': {
        slogan: 'Cool Down',
        desc: 'Inflammation is the body&rsquo;s response. Support its ability to manage it.',
        tags: ['Inflammatory balance', 'Immune system'],
        priceSub: '60 capsules &middot; 30 g net',
        t: [
          P('Vaiotec, a formula for supporting healthy inflammatory balance and the immune system. Inflammation is not always a disease, it is the body&rsquo;s response. But when it becomes chronic, it affects everything. Vaiotec supports the body&rsquo;s natural ability to manage inflammatory processes. Based on three classical yellow plants of Chinese pharmacology, it works more broadly and gently than turmeric, without the risks of long-term turmeric use, and can be used both internally and topically. For targeted action, recommended alongside the relevant system formula: Nephroxil for urinary tract, Hepadetox for liver burden, Gastirix for stomach discomfort.'),
          UL(['Acute and chronic inflammation of any location', 'Bacterial, viral, and fungal infections', 'Arthritis, gout', 'Skin inflammation', 'Throat, ear, and lymph node inflammation', 'Various forms of rheumatism']),
          P('2 capsules 2&ndash;3 times daily. Recommended alongside the relevant system formula.'),
          P('Lonicera japonica, Paeonia suffruticosa, Coptis chinensis, Phellodendron amurense, Gardenia jasminoides, Wolfiporia extensa. Vegetable capsule (HPMC). Capsule weight 500 mg, net weight 30 g.'),
          P(DISCLAIMER)
        ]
      }
    };

    var PHOTOS = {
      'HEPADETOX': '/images/products/hepadetox.png',
      'NEPHROXIL': '/images/products/nephroxil.png',
      'HEMOVITALIS': '/images/products/hemovitalis.png',
      'GASTIRIX': '/images/products/gastirix.png',
      'CARDILEX': '/images/products/cardilex.png',
      'DRAINALENE': '/images/products/drainalene.png',
      'PRO BIO TECH': '/images/products/pro-bio-tech.png',
      'BIOACTIVE ELIXIR': '/images/products/bioactive-elixir.png',
      'XL MAN PRO': '/images/products/xl-man-pro.png',
      'STOMAVIL': '/images/products/stomavil.png',
      'SUCREOL': '/images/products/sucreol.png',
      'VAÏOTEC': '/images/products/vaiotec.png'
    };

    function openQV(card) {
      var name = card.getAttribute('data-name');
      var accent = card.getAttribute('data-accent');
      var slogan = card.getAttribute('data-slogan');
      var data = QV_DATA[name];

      elName.textContent = name;
      panel.style.setProperty('--pp-accent', accent);

      var ptexts = panel.querySelectorAll('.pp-tabpanels .pp-ptext');
      if (data) {
        elSlogan.textContent = data.slogan || slogan;
        elDesc.innerHTML = data.desc;
        elTags.innerHTML = data.tags.map(function (t) { return '<span class="pp-chip">' + t + '</span>'; }).join('');
        elPriceSub.innerHTML = data.priceSub;
        for (var i = 0; i < ptexts.length; i++) { if (data.t[i]) ptexts[i].innerHTML = data.t[i]; }
      } else {
        elSlogan.textContent = slogan;
        elDesc.textContent = 'A targeted plant formula. Full details coming soon.';
        elTags.innerHTML = '<span class="pp-chip">' + (card.getAttribute('data-system') || '') + '</span>';
        elPriceSub.innerHTML = '60 capsules &middot; 30 g net';
        for (var j = 0; j < ptexts.length; j++) { ptexts[j].innerHTML = '<p><em>Content coming soon.</em></p>'; }
      }

      var photo = PHOTOS[name];
      if (photo) {
        elPhoto.setAttribute('src', photo);
        elPhoto.style.display = '';
        elPhotoTag.style.display = 'none';
        elPhoto.setAttribute('alt', name + ' bottle');
      } else {
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

    document.querySelectorAll('.cat-c').forEach(function (card) {
      card.addEventListener('click', function () { openQV(card); });
    });
    overlay.querySelectorAll('[data-qv-close]').forEach(function (el) {
      el.addEventListener('click', closeQV);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) closeQV();
    });
  })();
