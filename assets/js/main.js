/* Maison Minuit — rendu du contenu (config.js) et interactions. */
(function () {
  "use strict";

  var C = window.MAISON_MINUIT || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* =================================================================
     CONTENU
     ================================================================= */

  /* ---------- Prix ---------- */
  if (C.prix) $$("[data-prix]").forEach(function (el) { el.textContent = C.prix; });

  /* ---------- Essences ---------- */
  var list = $("#essences-list");
  if (list && Array.isArray(C.parfums)) {
    list.innerHTML = C.parfums.map(function (p) {
      var famille = (p.famille || []).map(esc).join('<i aria-hidden="true">·</i>');
      var title = esc(p.nom) + (p.sousTitre ? " <small>" + esc(p.sousTitre) + "</small>" : "");
      return (
        '<li class="essence reveal" style="--teinte:' + esc(p.teinte || "#7a5a2c") + '">' +
          '<figure class="essence__visual">' +
            '<img src="' + esc(p.image) + '" alt="Flacon ' + esc(p.nom) + (p.maison ? " — " + esc(p.maison) : "") + '" width="336" height="410" loading="lazy">' +
          "</figure>" +
          '<div class="essence__body">' +
            "<h3>" + title + "</h3>" +
            (p.maison ? '<p class="essence__house">' + esc(p.maison) + "</p>" : "") +
            '<span class="essence__rule" aria-hidden="true"></span>' +
            '<p class="essence__family"><span class="sr-only">Famille olfactive : </span>' + famille + "</p>" +
            '<dl class="essence__notes">' +
              (p.tete && p.tete.length ? "<dt>Tête</dt><dd>" + p.tete.map(esc).join(", ") + "</dd>" : "") +
              (p.fond && p.fond.length ? "<dt>Fond</dt><dd>" + p.fond.map(esc).join(", ") + "</dd>" : "") +
            "</dl>" +
          "</div>" +
        "</li>"
      );
    }).join("");
  }

  /* ---------- Bornes ---------- */
  var bList = $("#bornes-list");
  var map = $("#bornes-map");
  var bornes = Array.isArray(C.bornes) ? C.bornes : [];

  function fullAddress(b) { return [b.adresse, b.ville].filter(Boolean).join(", "); }
  function mapUrl(b) { return "https://www.google.com/maps?q=" + encodeURIComponent(fullAddress(b)) + "&output=embed"; }
  function directionsUrl(b) { return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(fullAddress(b)); }

  function selectBorne(i) {
    if (!bornes[i] || !map) return;
    map.classList.remove("is-loaded");
    map.src = mapUrl(bornes[i]);
    var fb = $("#bornes-map-fallback");
    if (fb) fb.innerHTML = esc(bornes[i].adresse) + "<br>" + esc(bornes[i].ville);
    $$(".borne", bList).forEach(function (el, j) {
      el.classList.toggle("is-active", i === j);
      var btn = $(".borne__select", el);
      if (btn) btn.setAttribute("aria-pressed", String(i === j));
    });
  }
  if (map) map.addEventListener("load", function () { map.classList.add("is-loaded"); });

  if (bList) {
    bList.innerHTML = bornes.map(function (b, i) {
      return (
        '<li class="borne">' +
          '<p class="borne__lieu">' + esc(b.lieu || "Borne Maison Minuit") + "</p>" +
          "<h3>" + esc(b.nom) + "</h3>" +
          "<address>" + esc(b.adresse) + "<br>" + esc(b.ville) + "</address>" +
          (b.horaires ? '<p class="borne__hours">' + esc(b.horaires) + "</p>" : "") +
          '<div class="borne__actions">' +
            (bornes.length > 1 ? '<button type="button" class="link borne__select" data-i="' + i + '" aria-pressed="false">Voir sur la carte</button>' : "") +
            '<a class="link" href="' + directionsUrl(b) + '" target="_blank" rel="noopener">Itinéraire <span aria-hidden="true">↗</span></a>' +
          "</div>" +
        "</li>"
      );
    }).join("") +
    '<li class="borne borne--soon"><p>De nouvelles bornes arrivent bientôt.</p></li>';

    bList.addEventListener("click", function (e) {
      var btn = e.target.closest(".borne__select");
      if (btn) selectBorne(Number(btn.dataset.i));
    });
    selectBorne(0);
  }

  /* ---------- Coordonnées ---------- */
  var ct = C.contact || {};

  /* E-mail pré-rempli selon l'objet choisi */
  var TOPICS = {
    borne: {
      sujet: "Accueillir une borne Maison Minuit",
      corps: "Bonjour,\n\nJe souhaiterais accueillir une borne Maison Minuit dans mon établissement.\n\nÉtablissement : \nVille : \nTéléphone : \n\nBien cordialement,\n"
    },
    essence: {
      sujet: "Question sur une essence",
      corps: "Bonjour,\n\nJ’ai une question au sujet de vos essences :\n\n\nBien cordialement,\n"
    },
    autre: {
      sujet: "Demande de contact",
      corps: "Bonjour,\n\n\n\nBien cordialement,\n"
    }
  };

  function mailtoFor(key) {
    var t = TOPICS[key] || TOPICS.autre;
    return "mailto:" + (ct.email || "") +
      "?subject=" + encodeURIComponent("Maison Minuit — " + t.sujet) +
      "&body=" + encodeURIComponent(t.corps);
  }

  var telHref = ct.telephone ? "tel:" + ct.telephone.replace(/[^\d+]/g, "") : "";
  var cList = $("#contact-list");
  if (cList) {
    var icons = {
      tel: '<svg viewBox="0 0 24 24"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2"/></svg>',
      mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
      pin: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
      ig: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/></svg>'
    };
    var rows = [];
    if (ct.telephone) rows.push([icons.tel, "Téléphone", '<a href="' + esc(telHref) + '">' + esc(ct.telephone) + "</a>"]);
    if (ct.email) rows.push([icons.mail, "E-mail", '<a href="' + esc(mailtoFor("borne")) + '">' + esc(ct.email) + "</a>"]);
    if (ct.adresse) rows.push([icons.pin, "Adresse", esc(ct.adresse)]);
    if (ct.instagram) rows.push([icons.ig, "Instagram", '<a href="' + esc(ct.instagram) + '" target="_blank" rel="noopener">' + esc(ct.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, "@").replace(/\/$/, "")) + "</a>"]);
    cList.innerHTML = rows.map(function (r) {
      return '<li><span class="contact__icon" aria-hidden="true">' + r[0] + "</span><span><small>" + r[1] + "</small>" + r[2] + "</span></li>";
    }).join("");
  }

  /* =================================================================
     FENÊTRE « NOUS CONTACTER » → ouvre la messagerie pré-remplie
     ================================================================= */
  var dlg = $("#contact-dialog");
  var mailBtn = $("#modal-mail");
  var lastFocus = null;

  function currentTopic() {
    var r = $('input[name="topic"]:checked', dlg);
    return r ? r.value : "borne";
  }
  function refreshMail() { if (mailBtn) mailBtn.href = mailtoFor(currentTopic()); }

  if (dlg) {
    $("#modal-email").textContent = ct.email || "";
    var telLink = $("#modal-tel");
    if (ct.telephone) { telLink.href = telHref; $("#modal-tel-label").textContent = ct.telephone; }
    else telLink.hidden = true;
    refreshMail();
    $$('input[name="topic"]', dlg).forEach(function (r) { r.addEventListener("change", refreshMail); });

    // Copier l'adresse e-mail (secours si aucune messagerie n'est configurée)
    var copyBtn = $("#modal-copy");
    copyBtn.addEventListener("click", function () {
      var done = function () {
        copyBtn.textContent = "Copiée ✓";
        setTimeout(function () { copyBtn.textContent = "Copier"; }, 2200);
      };
      var fallback = function () {
        var sel = window.getSelection(), range = document.createRange();
        range.selectNodeContents($("#modal-email"));
        sel.removeAllRanges(); sel.addRange(range);
        try { if (document.execCommand("copy")) { done(); return; } } catch (e) {}
        copyBtn.textContent = "Sélectionnée";
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(ct.email || "").then(done, fallback);
      } else fallback();
    });
  }

  function openContact() {
    closeMenu();
    if (!dlg || typeof dlg.showModal !== "function") {   // très vieux navigateur : messagerie directe
      window.location.href = mailtoFor("borne");
      return;
    }
    lastFocus = document.activeElement;
    refreshMail();
    dlg.classList.remove("is-closing");
    dlg.showModal();
    document.body.classList.add("is-locked");
    var checked = $('input[name="topic"]:checked', dlg);
    if (checked) checked.focus();
  }
  function closeContact() {
    if (!dlg || !dlg.open || dlg.classList.contains("is-closing")) return;
    if (reduceMotion) { finishClose(); return; }
    dlg.classList.add("is-closing");
    setTimeout(finishClose, 440);
  }
  function finishClose() {
    dlg.classList.remove("is-closing");
    if (dlg.open) dlg.close();
  }
  if (dlg) {
    dlg.addEventListener("close", function () {
      document.body.classList.remove("is-locked");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    });
    dlg.addEventListener("cancel", function (e) { e.preventDefault(); closeContact(); });   // touche Échap
    dlg.addEventListener("click", function (e) { if (e.target === dlg) closeContact(); });  // clic sur le fond
    $$("[data-close]", dlg).forEach(function (b) { b.addEventListener("click", closeContact); });
    // Le clic sur « Écrire un e-mail » ouvre la messagerie, puis la fenêtre se referme en douceur
    mailBtn.addEventListener("click", function () { setTimeout(closeContact, 600); });
  }
  $$("[data-contact]").forEach(function (b) { b.addEventListener("click", openContact); });

  /* =================================================================
     NAVIGATION
     ================================================================= */
  var nav = $("#nav");
  var toggle = $(".nav__toggle");
  function closeMenu() {
    if (!nav.classList.contains("is-open")) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Ouvrir le menu");
    if (!(dlg && dlg.open)) document.body.classList.remove("is-locked");
  }
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    document.body.classList.toggle("is-locked", open);
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });
  window.addEventListener("resize", function () { if (window.innerWidth > 1080) closeMenu(); });

  /* Défilement fluide et amorti vers les ancres */
  var scrollAnim = null;
  function easeInOutQuart(t) { return t < .5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2; }
  function smoothScrollTo(y) {
    if (scrollAnim) cancelAnimationFrame(scrollAnim);
    var start = window.scrollY, dist = y - start;
    if (reduceMotion || Math.abs(dist) < 2) { window.scrollTo(0, y); return; }
    var dur = Math.min(1700, Math.max(800, Math.abs(dist) * 0.45)), t0 = null;
    var stop = function () { if (scrollAnim) cancelAnimationFrame(scrollAnim); scrollAnim = null; off(); };
    var off = function () {
      window.removeEventListener("wheel", stop); window.removeEventListener("touchstart", stop);
    };
    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    (function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / dur);
      window.scrollTo(0, start + dist * easeInOutQuart(p));
      if (p < 1) scrollAnim = requestAnimationFrame(step); else { scrollAnim = null; off(); }
    })(performance.now());
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href");
    var target = id === "#top" ? document.body : $(id);
    if (!target) return;
    e.preventDefault();
    closeMenu();
    var y = id === "#top" ? 0 : target.getBoundingClientRect().top + window.scrollY;
    smoothScrollTo(Math.max(0, y));
  });

  /* Bandeau qui se densifie au défilement + lien actif */
  var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 40); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window) {
    var navLinks = $$(".nav__links a[href^='#']");
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("main section[id]").forEach(function (s) { spy.observe(s); });
  }

  /* =================================================================
     APPARITIONS AU DÉFILEMENT (décalées dans les groupes)
     ================================================================= */
  $$("[data-stagger]").forEach(function (group) {
    $$(".reveal", group).forEach(function (el, i) { el.style.setProperty("--d", (i * 0.12).toFixed(2) + "s"); });
  });
  var items = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* =================================================================
     CARTES PARFUM : inclinaison et reflet qui suivent la souris
     ================================================================= */
  if (finePointer && !reduceMotion) {
    $$(".essence").forEach(function (card) {
      var raf = null;
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          card.classList.add("is-tilting");
          card.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
          card.style.setProperty("--my", (y * 100).toFixed(1) + "%");
          card.style.setProperty("--ry", ((x - .5) * 7).toFixed(2) + "deg");
          card.style.setProperty("--rx", ((.5 - y) * 6).toFixed(2) + "deg");
        });
      });
      card.addEventListener("pointerleave", function () {
        if (raf) cancelAnimationFrame(raf);
        card.classList.remove("is-tilting");
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
      });
    });
  }

  /* Carrousel mobile : points indicateurs */
  var dots = $("#essences-dots");
  if (list && dots) {
    var cards = $$(".essence", list);
    dots.innerHTML = cards.map(function () { return "<span></span>"; }).join("");
    var dotEls = $$("span", dots);
    var updateDots = function () {
      var w = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : 1;
      var i = Math.round(list.scrollLeft / w);
      i = Math.max(0, Math.min(cards.length - 1, i));
      dotEls.forEach(function (d, j) { d.classList.toggle("is-active", i === j); });
    };
    list.addEventListener("scroll", function () { requestAnimationFrame(updateDots); }, { passive: true });
    updateDots();
  }

  /* =================================================================
     HERO : poussière d'or + léger effet de profondeur au défilement
     ================================================================= */
  var hero = $("#hero");
  var logo = $(".hero__logo img");
  var heroText = $$(".hero__lead, .hero__cta");
  if (hero && !reduceMotion) {
    var parallax = function () {
      var y = window.scrollY, h = hero.offsetHeight;
      if (y > h) return;
      var p = y / h;
      if (logo) { logo.style.translate = "0 " + (y * 0.28).toFixed(1) + "px"; logo.style.opacity = String(Math.max(0, 1 - p * 1.25)); }
      heroText.forEach(function (el) { el.style.translate = "0 " + (y * 0.12).toFixed(1) + "px"; el.style.opacity = String(Math.max(0, 1 - p * 1.6)); });
    };
    window.addEventListener("scroll", function () { requestAnimationFrame(parallax); }, { passive: true });
  }

  var canvas = $(".dust");
  if (canvas && canvas.getContext && !reduceMotion) {
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, motes = [], running = false, visible = true, last = 0;

    var spawn = function (anyY) {
      return {
        x: Math.random() * W,
        y: anyY ? Math.random() * H : H + 10,
        r: 0.4 + Math.pow(Math.random(), 3) * 1.8,
        vy: 0.06 + Math.random() * 0.22,
        sway: 0.2 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
        tw: 0.4 + Math.random() * 1.4
      };
    };
    var resize = function () {
      W = hero.clientWidth; H = hero.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.min(90, Math.round(W * H / 16000));
      motes = [];
      for (var i = 0; i < n; i++) motes.push(spawn(true));
    };
    var frame = function (ts) {
      if (!running) return;
      var dt = Math.min(50, ts - (last || ts)) / 16.7; last = ts;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      for (var i = 0; i < motes.length; i++) {
        var m = motes[i];
        m.y -= m.vy * dt;
        m.phase += 0.01 * dt;
        var x = m.x + Math.sin(m.phase * m.sway) * 12;
        if (m.y < -10) { motes[i] = spawn(false); continue; }
        var fade = Math.min(1, m.y / (H * 0.25)) * Math.min(1, (H - m.y) / (H * 0.15) + 0.2);
        var a = (0.25 + 0.55 * (0.5 + 0.5 * Math.sin(ts / 1000 * m.tw + m.phase))) * fade;
        if (m.r > 1.2) {
          ctx.fillStyle = "rgba(240,192,112," + (a * 0.18).toFixed(3) + ")";
          ctx.beginPath(); ctx.arc(x, m.y, m.r * 4, 0, 6.283); ctx.fill();
        }
        ctx.fillStyle = "rgba(248,216,152," + a.toFixed(3) + ")";
        ctx.beginPath(); ctx.arc(x, m.y, m.r, 0, 6.283); ctx.fill();
      }
      requestAnimationFrame(frame);
    };
    var setRunning = function (on) {
      if (on === running) return;
      running = on;
      if (on) { last = 0; requestAnimationFrame(frame); }
    };
    resize();
    var rt; window.addEventListener("resize", function () { clearTimeout(rt); rt = setTimeout(resize, 200); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; setRunning(visible && !document.hidden); }).observe(hero);
    }
    document.addEventListener("visibilitychange", function () { setRunning(visible && !document.hidden); });
    setRunning(true);
    setTimeout(function () { canvas.classList.add("is-on"); }, document.documentElement.classList.contains("seen") ? 100 : 1500);
  }

  var yEl = $("#year");
  if (yEl) yEl.textContent = new Date().getFullYear();
})();
