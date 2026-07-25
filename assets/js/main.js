/* ==========================================================================
   Mas-if de Provence — Jardinier Paysagiste
   Script unique du site. Vanilla JS, aucune dépendance.

   Sommaire :
   1. Configuration du formulaire (FORM_ENDPOINT)
   2. Menu mobile (burger) + sous-menu Prestations
   3. Ombre de l'en-tête au défilement
   4. Formulaires de contact
   5. Comparateur avant / après (glissière)
   6. Carrousel (avant / pendant / après)
   7. Indicateur « ouvert / fermé maintenant »
   8. Année courante dans le pied de page
   ========================================================================== */
(function () {
  "use strict";

  /* ----------------------------------------------------------------------
     1. CONFIGURATION DU FORMULAIRE
     ----------------------------------------------------------------------
     FORM_ENDPOINT est VIDE : le site est en « mode démo ». Les formulaires
     affichent le message de succès mais N'ENVOIENT RIEN.

     POUR BRANCHER LE FORMULAIRE EN 1 LIGNE : collez votre URL ci-dessous.

       • Formspree  → https://formspree.io  (créez un formulaire, copiez l'URL)
         var FORM_ENDPOINT = "https://formspree.io/f/xxxxxxxx";

       • Web3Forms  → https://web3forms.com  (gratuit, clé par e-mail)
         var FORM_ENDPOINT = "https://api.web3forms.com/submit";
         ... et ajoutez dans le HTML du formulaire, juste après <form> :
         <input type="hidden" name="access_key" value="VOTRE-CLE-WEB3FORMS">

     Les deux services acceptent l'envoi JSON utilisé ci-dessous et renvoient
     un code HTTP 200 en cas de succès. Rien d'autre à modifier.
     -------------------------------------------------------------------- */
  var FORM_ENDPOINT = "";

  /* Petits utilitaires ---------------------------------------------------- */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  var reduceMotion = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : { matches: false };

  /* Marque le document comme « JS actif » : sans JS, aucun contenu masqué. */
  document.documentElement.classList.add("js");

  /* ----------------------------------------------------------------------
     2. MENU MOBILE + SOUS-MENU
     -------------------------------------------------------------------- */
  function initNav() {
    var burger = $(".nav__burger");
    var list = $("#nav-menu");
    if (!burger || !list) { return; }

    function closeMenu() {
      list.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }

    burger.addEventListener("click", function () {
      var open = list.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });

    /* Sous-menu « Prestations » : clic sur mobile, survol sur grand écran. */
    var subToggle = $(".nav__toggle-sub");
    var subMenu = $("#subnav-prestations");

    if (subToggle && subMenu) {
      var parent = subToggle.parentNode;

      function openSub() {
        subMenu.hidden = false;
        subToggle.setAttribute("aria-expanded", "true");
      }
      function closeSub() {
        subMenu.hidden = true;
        subToggle.setAttribute("aria-expanded", "false");
      }

      var desktop = window.matchMedia("(min-width: 941px)");

      /* Sur grand écran, le clic OUVRE toujours : il ne referme pas un menu
         déjà déplié par le survol (sinon le pointeur reste dessus et rien ne
         le rouvre — le bouton paraît cassé). Sur mobile, le clic bascule. */
      subToggle.addEventListener("click", function (e) {
        e.preventDefault();
        cancelClose();
        if (desktop.matches) { openSub(); return; }
        if (subMenu.hidden) { openSub(); } else { closeSub(); }
      });

      /* Le sous-menu est positionné 8 px sous le bouton. Cet intervalle
         n'appartient à aucun élément : le traverser déclenche « mouseleave »
         et fermait le menu avant qu'on atteigne les liens. On temporise donc
         la fermeture, et on l'annule dès que le pointeur revient dans le
         sous-arbre (le survol du sous-menu réémet « mouseenter » sur le <li>). */
      var closeTimer = null;

      function cancelClose() {
        if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
      }

      parent.addEventListener("mouseenter", function () {
        if (desktop.matches) { cancelClose(); openSub(); }
      });
      parent.addEventListener("mouseleave", function () {
        if (!desktop.matches) { return; }
        cancelClose();
        closeTimer = setTimeout(closeSub, 260);
      });

      /* Le clavier ne doit pas dépendre de la temporisation. */
      parent.addEventListener("focusout", function (e) {
        if (desktop.matches && !parent.contains(e.relatedTarget)) { closeSub(); }
      });

      /* Fermeture au clic extérieur et à la touche Échap. */
      document.addEventListener("click", function (e) {
        if (!parent.contains(e.target) && !subMenu.hidden) { closeSub(); }
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          if (!subMenu.hidden) { closeSub(); subToggle.focus(); }
          if (list.classList.contains("is-open")) { closeMenu(); burger.focus(); }
        }
      });
      /* Le sous-menu reste ouvert en permanence quand le menu burger est
         déplié : sur mobile il est affiché en accordéon dans le flux. */
      subMenu.hidden = true;
    }

    /* Referme le menu mobile après un clic sur un lien. */
    $$("a", list).forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  /* ----------------------------------------------------------------------
     3. OMBRE DE L'EN-TÊTE AU DÉFILEMENT
     -------------------------------------------------------------------- */
  function initHeaderShadow() {
    var header = $(".site-header");
    if (!header) { return; }
    var ticking = false;

    function update() {
      header.classList.toggle("is-stuck", window.scrollY > 8);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ----------------------------------------------------------------------
     4. FORMULAIRES (devis + contact)
     -------------------------------------------------------------------- */
  function initForms() {
    var forms = $$("form[data-form]");
    if (!forms.length) { return; }

    forms.forEach(function (form) {
      var okBox = $("[data-form-success]", form.parentNode);
      var errBox = $("[data-form-error]", form.parentNode);
      var submit = $("[data-submit]", form);
      var submitLabel = submit ? submit.textContent : "";

      function show(box) {
        [okBox, errBox].forEach(function (b) {
          if (b) { b.classList.remove("is-visible"); }
        });
        if (!box) { return; }
        box.classList.add("is-visible");
        box.setAttribute("tabindex", "-1");
        box.focus({ preventScroll: true });
        box.scrollIntoView({
          behavior: reduceMotion.matches ? "auto" : "smooth",
          block: "center"
        });
      }

      function busy(state) {
        if (!submit) { return; }
        submit.disabled = state;
        submit.textContent = state ? "Envoi en cours…" : submitLabel;
      }

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        /* Validation native du navigateur (champs requis, type tel/email). */
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        /* Piège à robots : champ invisible qui doit rester vide. */
        var honeypot = $(".hp-field input", form);
        if (honeypot && honeypot.value) { return; }

        var data = {};
        new FormData(form).forEach(function (value, key) {
          data[key] = value;
        });
        data.page = window.location.pathname;

        /* --- MODE DÉMO : aucun endpoint configuré ------------------------ */
        if (!FORM_ENDPOINT) {
          console.info(
            "[Mas-if de Provence] Mode démo : aucun envoi réel.\n" +
            "Renseignez FORM_ENDPOINT dans /assets/js/main.js (voir README).\n" +
            "Données qui auraient été envoyées :", data
          );
          form.hidden = true;
          show(okBox);
          return;
        }

        /* --- ENVOI RÉEL -------------------------------------------------- */
        busy(true);
        fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data)
        })
          .then(function (res) {
            if (!res.ok) { throw new Error("HTTP " + res.status); }
            form.hidden = true;
            show(okBox);
          })
          .catch(function (err) {
            console.error("[Mas-if de Provence] Échec de l'envoi :", err);
            busy(false);
            show(errBox);
          });
      });
    });
  }

  /* ----------------------------------------------------------------------
     5. COMPARATEUR AVANT / APRÈS
     ----------------------------------------------------------------------
     Un <input type="range"> transparent recouvre l'image : on obtient le
     glissement au doigt, à la souris ET au clavier (flèches) sans code
     de drag. Sa valeur pilote la variable CSS --pos, qui découpe la photo
     « après » via clip-path.
     -------------------------------------------------------------------- */
  function initCompare() {
    $$(".ba input[type=\"range\"]").forEach(function (range) {
      var box = range.parentNode;
      function update() {
        box.style.setProperty("--pos", range.value + "%");
      }
      range.addEventListener("input", update);
      update();
    });
  }

  /* ----------------------------------------------------------------------
     6. CARROUSEL (avant / pendant / après)
     ----------------------------------------------------------------------
     La piste utilise le défilement magnétique CSS : elle fonctionne déjà au
     doigt et au clavier sans JS. On ajoute ici les boutons de repère et la
     synchronisation de l'état actif au défilement.
     -------------------------------------------------------------------- */
  function initCarousels() {
    $$("[data-carou]").forEach(function (nav) {
      var track = document.getElementById(nav.getAttribute("data-carou"));
      if (!track) { return; }
      var slides = $$(":scope > figure", track);
      var btns = $$("button[data-slide]", nav);
      if (!slides.length || !btns.length) { return; }

      function setActive(i) {
        btns.forEach(function (b, k) {
          var on = k === i;
          b.classList.toggle("btn--primary", on);
          b.classList.toggle("btn--ghost", !on);
          if (on) { b.setAttribute("aria-current", "true"); }
          else { b.removeAttribute("aria-current"); }
        });
      }

      btns.forEach(function (b) {
        b.addEventListener("click", function () {
          var i = parseInt(b.getAttribute("data-slide"), 10);
          track.scrollTo({
            left: slides[i].offsetLeft - slides[0].offsetLeft,
            behavior: reduceMotion.matches ? "auto" : "smooth"
          });
          setActive(i);
        });
      });

      /* Le défilement manuel (doigt, trackpad) met les boutons à jour. */
      var ticking = false;
      track.addEventListener("scroll", function () {
        if (ticking) { return; }
        ticking = true;
        window.requestAnimationFrame(function () {
          var i = Math.round(track.scrollLeft / track.clientWidth);
          setActive(Math.max(0, Math.min(slides.length - 1, i)));
          ticking = false;
        });
      }, { passive: true });
    });
  }

  /* ----------------------------------------------------------------------
     7. INDICATEUR « OUVERT / FERMÉ MAINTENANT »
     ----------------------------------------------------------------------
     Alimente tout élément portant [data-open-now] (page contact).
     Les horaires sont en minutes depuis minuit, heure de Paris — si vous
     changez les horaires du site, mettez CE tableau à jour aussi.
     -------------------------------------------------------------------- */
  function initOpenNow() {
    var els = $$("[data-open-now]");
    if (!els.length) { return; }

    /* 0 = dimanche … 6 = samedi. null = fermé. */
    var HOURS = {
      0: null,
      1: [8 * 60, 18 * 60], 2: [8 * 60, 18 * 60], 3: [8 * 60, 18 * 60],
      4: [8 * 60, 18 * 60], 5: [8 * 60, 18 * 60],
      6: [9 * 60, 17 * 60]
    };
    var DAYS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];

    function hhmm(m) {
      var h = Math.floor(m / 60);
      var mn = m % 60;
      return h + "h" + (mn < 10 ? "0" + mn : mn);
    }

    var now;
    try {
      /* Heure de l'entreprise, pas celle du visiteur. */
      now = new Date(new Date().toLocaleString("en-US", { timeZone: "Europe/Paris" }));
      if (isNaN(now.getTime())) { throw new Error("date invalide"); }
    } catch (e) {
      now = new Date();
    }

    var day = now.getDay();
    var mins = now.getHours() * 60 + now.getMinutes();
    var today = HOURS[day];
    var text;

    if (today && mins >= today[0] && mins < today[1]) {
      text = "Ouvert maintenant · jusqu’à " + hhmm(today[1]);
    } else if (today && mins < today[0]) {
      text = "Fermé · ouvre aujourd’hui à " + hhmm(today[0]);
    } else {
      for (var i = 1; i <= 7; i++) {
        var d = (day + i) % 7;
        if (HOURS[d]) {
          text = "Fermé · ouvre " + (i === 1 ? "demain" : DAYS[d]) +
                 " à " + hhmm(HOURS[d][0]);
          break;
        }
      }
    }

    els.forEach(function (el) {
      el.textContent = text;
      el.hidden = false;
    });
  }

  /* ----------------------------------------------------------------------
     8. ANNÉE COURANTE DANS LE PIED DE PAGE
     -------------------------------------------------------------------- */
  function initYear() {
    $$("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ---- Démarrage -------------------------------------------------------- */
  function init() {
    initNav();
    initHeaderShadow();
    initForms();
    initCompare();
    initCarousels();
    initOpenNow();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
