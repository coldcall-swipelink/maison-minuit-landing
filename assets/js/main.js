/* Maison Minuit — rendu du contenu (config.js) et interactions. */
(function () {
  "use strict";

  var C = window.MAISON_MINUIT || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Prix ---------- */
  if (C.prix) {
    document.querySelectorAll("[data-prix]").forEach(function (el) { el.textContent = C.prix; });
  }

  /* ---------- Essences ---------- */
  var list = $("#essences-list");
  if (list && Array.isArray(C.parfums)) {
    list.innerHTML = C.parfums.map(function (p) {
      var famille = (p.famille || []).map(esc).join('<i aria-hidden="true">·</i>');
      var title = esc(p.nom) + (p.sousTitre ? ' <small>' + esc(p.sousTitre) + '</small>' : "");
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

  function mapUrl(b) {
    return "https://www.google.com/maps?q=" + encodeURIComponent([b.adresse, b.ville].join(", ")) + "&output=embed";
  }
  function directionsUrl(b) {
    return "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent([b.adresse, b.ville].join(", "));
  }
  function select(i) {
    if (!bornes[i] || !map) return;
    map.src = mapUrl(bornes[i]);
    var fb = $("#bornes-map-fallback");
    if (fb) fb.innerHTML = esc(bornes[i].adresse) + "<br>" + esc(bornes[i].ville);
    bList.querySelectorAll(".borne").forEach(function (el, j) {
      el.classList.toggle("is-active", i === j);
      var btn = el.querySelector(".borne__select");
      if (btn) btn.setAttribute("aria-pressed", String(i === j));
    });
  }

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
      if (btn) select(Number(btn.dataset.i));
    });
    select(0);
  }

  /* ---------- Contact ---------- */
  var ct = C.contact || {};
  var cList = $("#contact-list");
  if (cList) {
    var icons = {
      tel: '<svg viewBox="0 0 24 24"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2"/></svg>',
      mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
      pin: '<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>',
      ig: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/></svg>'
    };
    var rows = [];
    if (ct.telephone) rows.push([icons.tel, "Téléphone", '<a href="tel:' + esc(ct.telephone.replace(/[^\d+]/g, "")) + '">' + esc(ct.telephone) + "</a>"]);
    if (ct.email) rows.push([icons.mail, "E-mail", '<a href="mailto:' + esc(ct.email) + '">' + esc(ct.email) + "</a>"]);
    if (ct.adresse) rows.push([icons.pin, "Adresse", esc(ct.adresse)]);
    if (ct.instagram) rows.push([icons.ig, "Instagram", '<a href="' + esc(ct.instagram) + '" target="_blank" rel="noopener">' + esc(ct.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, "@").replace(/\/$/, "")) + "</a>"]);
    cList.innerHTML = rows.map(function (r) {
      return '<li><span class="contact__icon" aria-hidden="true">' + r[0] + '</span><span><small>' + r[1] + "</small>" + r[2] + "</span></li>";
    }).join("");
  }

  var form = $("#contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = $("#contact-note");
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        note.textContent = "Merci de renseigner votre nom, un e-mail valide et votre message.";
        var bad = form.querySelector(":invalid");
        if (bad) bad.focus();
        return;
      }
      var d = new FormData(form);
      var body = d.get("message") + "\n\n— " + d.get("name") + " (" + d.get("email") + ")";
      window.location.href = "mailto:" + (ct.email || "") +
        "?subject=" + encodeURIComponent("[Maison Minuit] " + d.get("subject")) +
        "&body=" + encodeURIComponent(body);
      note.textContent = "Votre messagerie s’ouvre avec le message pré-rempli. Merci !";
    });
  }

  /* ---------- Navigation ---------- */
  var nav = $("#nav");
  var toggle = $(".nav__toggle");
  function closeMenu() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Ouvrir le menu");
  }
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  });
  document.querySelectorAll(".nav__links a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 40); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Apparitions au défilement ---------- */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-in"); });
  }

  var y = $("#year");
  if (y) y.textContent = new Date().getFullYear();
})();
