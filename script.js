/* Scroll suave */
  function goTo(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  }

  /* Header compacto al scroll */
  const siteHeader = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    siteHeader.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── MENÚ HAMBURGUESA ──
     El menú ocupa todo desde debajo del header hasta el fondo.
     Calculamos el top dinámicamente para que siempre coincida
     con la altura real del header (cambia al hacer scroll).
  */
  const _nav    = document.getElementById('main-nav');
  const _hamBtn = document.getElementById('hamburger-btn');

  function _getHeaderH() {
    return document.getElementById('site-header').getBoundingClientRect().height;
  }
  function _setNavTop() {
    if (window.innerWidth <= 900) {
      _nav.style.top = _getHeaderH() + 'px';
    } else {
      _nav.style.top = '';
    }
  }
  function openNav() {
    _setNavTop();
    _nav.classList.add('open');
    _hamBtn.classList.add('is-open');
    _hamBtn.setAttribute('aria-expanded', 'true');
    _hamBtn.setAttribute('aria-label', 'Cerrar menú');
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
    const firstLink = _nav.querySelector('a');
    if (firstLink) setTimeout(() => firstLink.focus(), 50);
  }
  function closeNav() {
    _nav.classList.remove('open');
    _hamBtn.classList.remove('is-open');
    _hamBtn.setAttribute('aria-expanded', 'false');
    _hamBtn.setAttribute('aria-label', 'Abrir menú');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
  }
  function toggleNav() {
    _nav.classList.contains('open') ? closeNav() : openNav();
  }

  /* Cerrar al tocar un enlace del menú */
  document.querySelectorAll('#main-nav a').forEach(a => a.addEventListener('click', closeNav));

  /* Cerrar al tocar fuera del menú */
  document.addEventListener('click', e => {
    if (_nav.classList.contains('open') && !_nav.contains(e.target) && !_hamBtn.contains(e.target)) closeNav();
  });

  /* Escape cierra el menú */
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });

  /* Recalcular top si el header cambia de tamaño al scrollear */
  window.addEventListener('scroll', () => {
    if (_nav.classList.contains('open')) _setNavTop();
  }, { passive: true });

  /* Mantener el panel alineado al header al rotar o redimensionar. */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      closeNav();
      _nav.style.top = '';
    } else if (_nav.classList.contains('open')) {
      _setNavTop();
    }
  });

  /* En móviles la barra del navegador puede cambiar el viewport visual. */
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
      if (_nav.classList.contains('open')) _setNavTop();
    });
  }

  /* ══════════════════════════════════════════════════════
     CARRUSEL DE FOTOS
     ──────────────────────────────────────────────────────
     CÓMO AGREGAR FOTOS A UN PROYECTO:
     En el HTML, en cada <article class="project-card">,
     editá el atributo data-images con las rutas de las fotos:
       data-images='["foto1.jpg","foto2.jpg","foto3.jpg"]'
     Si hay 1 sola foto, las flechas y puntos se ocultan solos.
     Las fotos deben estar en la misma carpeta que el HTML.
  ══════════════════════════════════════════════════════ */
  let _lbImgs = [], _lbIdx = 0, _lbTouch = { x: 0, on: false };

  function openGallery(card) {
    const title = card.dataset.title || '';
    const desc  = card.dataset.desc  || '';
    let imgs;
    try { imgs = JSON.parse(card.dataset.images || '[""]'); } catch(e) { imgs = ['']; }
    _lbImgs = imgs;
    _lbIdx  = 0;
    document.getElementById('lb-title').textContent = title;
    document.getElementById('lb-desc').textContent  = desc;
    _buildCarousel();
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function _buildCarousel() {
    const track   = document.getElementById('lb-track');
    const dots    = document.getElementById('lb-dots');
    const prev    = document.getElementById('lb-prev');
    const next    = document.getElementById('lb-next');
    const counter = document.getElementById('lb-counter');
    track.innerHTML = '';
    dots.innerHTML  = '';

    _lbImgs.forEach((src, i) => {
      const slide = document.createElement('div');
      slide.className = 'lb-slide';
      if (src && src.trim()) {
        const img = document.createElement('img');
        img.src = src;
        img.alt = document.getElementById('lb-title').textContent + ' — foto ' + (i+1);
        img.loading = 'lazy';
        slide.appendChild(img);
      } else {
        slide.innerHTML = '<div class="lb-placeholder"><svg width="48" height="48" viewBox="0 0 44 44" fill="none"><polygon points="22,4 40,40 4,40" fill="none" stroke="rgba(201,168,76,0.35)" stroke-width="1.5"/><rect x="16" y="24" width="12" height="14" fill="rgba(201,168,76,0.12)"/></svg><p>Foto próximamente</p></div>';
      }
      track.appendChild(slide);

      const dot = document.createElement('button');
      dot.className = 'lb-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Foto ' + (i+1));
      dot.onclick = () => lbGoTo(i);
      dots.appendChild(dot);
    });

    const multi = _lbImgs.length > 1;
    multi ? prev.removeAttribute('hidden') : prev.setAttribute('hidden', '');
    multi ? next.removeAttribute('hidden') : next.setAttribute('hidden', '');
    dots.style.display = multi ? 'flex' : 'none';
    lbGoTo(0, false);
  }

  function lbGoTo(idx, animate = true) {
    const total   = _lbImgs.length;
    _lbIdx        = ((idx % total) + total) % total;
    const track   = document.getElementById('lb-track');
    const counter = document.getElementById('lb-counter');
    if (!animate) track.style.transition = 'none';
    track.style.transform = 'translateX(-' + (_lbIdx * 100) + '%)';
    if (!animate) requestAnimationFrame(() => { track.style.transition = ''; });
    document.querySelectorAll('.lb-dot').forEach((d,i) => d.classList.toggle('active', i === _lbIdx));
    counter.textContent = total > 1 ? (_lbIdx + 1) + ' / ' + total : '';
  }

  function lbNav(dir) { lbGoTo(_lbIdx + dir); }

  function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
    _lbImgs = []; _lbIdx = 0;
  }

  /* Click fuera cierra */
  document.getElementById('lightbox').addEventListener('click', e => {
    if (e.target === document.getElementById('lightbox')) closeLightbox();
  });

  /* Teclado: Escape cierra, flechas navegan */
  document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox').classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  lbNav(-1);
    if (e.key === 'ArrowRight') lbNav(1);
  });

  /* Swipe táctil */
  document.getElementById('lb-carousel').addEventListener('touchstart', e => {
    _lbTouch = { x: e.changedTouches[0].clientX, on: true };
  }, { passive: true });
  document.getElementById('lb-carousel').addEventListener('touchend', e => {
    if (!_lbTouch.on) return;
    const dx = e.changedTouches[0].clientX - _lbTouch.x;
    if (Math.abs(dx) > 44) lbNav(dx < 0 ? 1 : -1);
    _lbTouch.on = false;
  }, { passive: true });

  /* Accesibilidad teclado en tarjetas */
  document.querySelectorAll('.project-card[tabindex]').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
    });
  });

  /* Formulario: validación en cliente + simulación de envío. */
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const btn = document.getElementById('submit-btn');
    const msg = document.getElementById('form-msg');
    const nombre = form.elements.nombre;
    const email = form.elements.email;

    form.querySelectorAll('.form-group').forEach(group => group.classList.remove('has-error'));
    msg.className = 'form-status';
    msg.style.display = 'none';

    let valid = form.checkValidity();
    if (nombre.value.trim().length < 2) {
      valid = false;
      nombre.closest('.form-group').classList.add('has-error');
    }
    if (!email.validity.valid) {
      valid = false;
      email.closest('.form-group').classList.add('has-error');
    }

    if (!valid) {
      msg.textContent = 'Revisá los campos obligatorios antes de enviar.';
      msg.classList.add('error');
      msg.style.display = 'block';
      const firstInvalid = form.querySelector(':invalid, .has-error input, .has-error textarea, .has-error select');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const originalText = btn.textContent.trim();
    btn.textContent = 'Enviando...';
    btn.disabled = true;
    btn.setAttribute('aria-busy', 'true');

    setTimeout(() => {
      btn.textContent = 'Mensaje enviado ✓';
      btn.classList.add('sent');
      btn.removeAttribute('aria-busy');
      msg.textContent = 'Gracias por contactarnos. Le responderemos a la brevedad.';
      msg.classList.add('success');
      msg.style.display = 'block';
      form.reset();

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.classList.remove('sent');
      }, 2600);
    }, 900);
  }

  document.querySelectorAll('#contact-form input, #contact-form textarea, #contact-form select').forEach(field => {
    field.addEventListener('input', () => {
      field.closest('.form-group')?.classList.remove('has-error');
    });
  });

  /* Reveal al scroll */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 70);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealEls.forEach(el => revealObs.observe(el));

  /* ── PRELOADER ── */
  (function() {
    const preloader = document.getElementById('preloader');
    const bar       = document.getElementById('pl-bar');
    const percent   = document.getElementById('pl-percent');
    const logo      = document.getElementById('pl-logo');
    const taglineEl = document.getElementById('pl-tagline');
    const taglines  = ['Calidad · Compromiso · Innovación','Construyendo el futuro','San Juan · Argentina','Cada detalle importa'];
    let progress = 0, finished = false, tagIdx = 0;

    function setProgress(v) {
      progress = Math.min(v, 100);
      bar.style.width = progress + '%';
      percent.textContent = Math.round(progress) + '%';
    }
    function simulate() {
      const t = setInterval(() => {
        if (finished) { clearInterval(t); return; }
        if (progress < 30)      setProgress(progress + 3.5);
        else if (progress < 60) setProgress(progress + 2);
        else if (progress < 80) setProgress(progress + 0.8);
        else if (progress < 85) setProgress(progress + 0.3);
      }, 60);
    }
    const tagTimer = setInterval(() => {
      tagIdx = (tagIdx + 1) % taglines.length;
      taglineEl.style.opacity = '0';
      setTimeout(() => {
        taglineEl.textContent = taglines[tagIdx];
        taglineEl.style.transition = 'opacity 0.5s ease';
        taglineEl.style.opacity = '1';
      }, 400);
    }, 1800);

    setTimeout(() => { if (logo) logo.classList.add('pulse'); }, 1400);

    function hide() {
      if (finished) return;
      finished = true;
      clearInterval(tagTimer);
      setProgress(100);
      setTimeout(() => {
        preloader.classList.add('hide');
        document.body.classList.remove('loading');
        setTimeout(() => preloader.remove(), 750);
      }, 400);
    }

    if (document.readyState === 'complete') { setTimeout(hide, 1200); }
    else { window.addEventListener('load', () => setTimeout(hide, 600)); }
    setTimeout(hide, 3500);
    simulate();
  })();

  /* ── CONTADOR ESTADÍSTICAS ── */
  (function() {
    const section = document.getElementById('stats');
    if (!section) return;
    let done = false;

    function easeOutQuad(t) { return t * (2 - t); }

    function animCount(el, target, duration) {
      const numEl  = el.querySelector('.stat-number');
      const suffix = numEl.querySelector('.stat-suffix') ? numEl.querySelector('.stat-suffix').outerHTML : '';
      const prefix = numEl.querySelector('.stat-prefix') ? numEl.querySelector('.stat-prefix').outerHTML : '';
      const start  = performance.now();
      function step(now) {
        const p = Math.min((now - start) / duration, 1);
        const v = Math.round(easeOutQuad(p) * target);
        numEl.innerHTML = prefix + (v >= 1000 ? v.toLocaleString('es-AR') : v) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else numEl.innerHTML = prefix + (target >= 1000 ? target.toLocaleString('es-AR') : target) + suffix;
      }
      requestAnimationFrame(step);
    }

    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !done) {
        done = true;
        document.querySelectorAll('.stat-item').forEach((item, i) => {
          setTimeout(() => {
            item.classList.add('counted');
            const target = parseInt(item.querySelector('.stat-number').dataset.target, 10);
            animCount(item, target, Math.max(1000, Math.min(2200, 800 + target * 0.8)));
          }, i * 180);
        });
      }
    }, { threshold: 0.35 }).observe(section);
  })();

  /* ── BOTÓN VOLVER ARRIBA ── */
  (function() {
    const btt = document.getElementById('back-to-top');
    if (!btt) return;
    let ticking = false;
    function update() {
      btt.classList.toggle('visible', window.scrollY > 400);
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  })();


  /* ══════════════════════════════════════════════════════
     ANIMACIONES DE TEXTO — Word-by-word reveal
     ──────────────────────────────────────────────────────
     1. Toma cada .text-reveal y parte su texto en palabras
     2. Envuelve cada palabra en .word-wrap > .word-inner
     3. Usa IntersectionObserver para disparar la animación
        cuando el elemento entra en el viewport
     4. Agrega delay escalonado entre palabras (stagger)
  ══════════════════════════════════════════════════════ */
  (function() {

    /* ── Partir texto en spans por palabra ── */
    function splitWords(el) {
      // Si tiene elementos <em> u otros hijos, los preservamos
      const nodes = Array.from(el.childNodes);
      el.innerHTML = '';

      nodes.forEach(node => {
        if (node.nodeType === 3) {
          // Nodo de texto: partir por palabras
          const words = node.textContent.split(/(\s+)/);
          words.forEach(word => {
            if (word.trim() === '') return; // ignorar espacios
            const wrap  = document.createElement('span');
            wrap.className = 'word-wrap';
            const inner = document.createElement('span');
            inner.className = 'word-inner';
            inner.textContent = word;
            wrap.appendChild(inner);
            el.appendChild(wrap);
          });
        } else if (node.nodeType === 1) {
          // Preservar saltos de línea explícitos del diseño.
          if (node.tagName === 'BR') {
            el.appendChild(document.createElement('br'));
            return;
          }

          // Elementos de énfasis (por ejemplo <em>) se procesan palabra por palabra.
          const words = node.textContent.split(/(\s+)/);
          words.forEach(word => {
            if (word.trim() === '') return;
            const wrap  = document.createElement('span');
            wrap.className = 'word-wrap';
            const inner = document.createElement('span');
            inner.className = 'word-inner';
            const clone = node.cloneNode(false);
            clone.textContent = word;
            inner.appendChild(clone);
            wrap.appendChild(inner);
            el.appendChild(wrap);
          });
        }
      });
    }

    /* ── Aplicar delay escalonado y disparar ── */
    function revealWords(el, baseDelay) {
      const words = el.querySelectorAll('.word-inner');
      words.forEach((w, i) => {
        w.style.transitionDelay = (baseDelay + i * 0.07) + 's';
      });
      // Pequeño frame para que el browser registre el estado inicial
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.classList.add('text-reveal-done');
        });
      });
    }

    /* ── Configurar todos los títulos de sección ── */
    const titleEls = document.querySelectorAll('.section-title.text-reveal');
    titleEls.forEach(el => splitWords(el));

    /* ── Configurar el hero title ── */
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      splitWords(heroTitle);
      // Hero se activa con delay después del preloader
      setTimeout(() => revealWords(heroTitle, 0), 1400);
    }

    /* ── Observer para títulos de sección ── */
    const titleObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          revealWords(entry.target, 0.05);
          titleObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    titleEls.forEach(el => titleObs.observe(el));

    /* ── Section labels — slide desde la izquierda ── */
    const labelObs = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('label-visible'), i * 80);
          labelObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.section-label').forEach(el => labelObs.observe(el));

    /* ── Gold lines — crecen de izquierda a derecha ── */
    const lineObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('line-visible');
          lineObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.8 });

    document.querySelectorAll('.gold-line').forEach(el => lineObs.observe(el));

    /* ── Párrafos de cuerpo — fade slide ── */
    const bodyObs = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('body-visible'), i * 100);
          bodyObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.body-reveal').forEach(el => bodyObs.observe(el));

  })();


  /* ── FAQ ACORDEÓN ── */
  function toggleFaq(btn) {
    const item    = btn.closest('.faq-item');
    const answer  = item.querySelector('.faq-a');
    const icon    = btn.querySelector('.faq-icon');
    const isOpen  = item.classList.contains('open');

    // Cerrar todos los demás
    document.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-a').style.maxHeight = '0';
      el.querySelector('.faq-icon').textContent  = '+';
      el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });

    // Abrir/cerrar el actual
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
      icon.textContent       = '×';
      btn.setAttribute('aria-expanded', 'true');
    }
  }


  /* ── NAVEGACIÓN ACTIVA SEGÚN LA SECCIÓN VISIBLE ── */
  (function() {
    const links = Array.from(document.querySelectorAll('#main-nav a[href^="#"]'));
    const sections = links
      .map(link => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);
    if (!links.length || !sections.length) return;

    const setActive = id => {
      links.forEach(link => {
        const active = link.getAttribute('href') === '#' + id;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });
    };

    const observer = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.1, 0.35, 0.6] });

    sections.forEach(section => observer.observe(section));
    setActive('hero');
  })();

  /* ── AÑO DEL FOOTER AUTOMÁTICO ── */
  const currentYear = document.getElementById('current-year');
  if (currentYear) currentYear.textContent = new Date().getFullYear();

  /* ── SOPORTE PARA USUARIOS QUE PREFIEREN MENOS MOVIMIENTO ── */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduce-motion');
  }
