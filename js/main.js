/* Bottom Up Impact — site behaviour (vanilla JS, no dependencies) */
(function () {
  "use strict";

  var NAV = [
    ["index.html", "Home"],
    ["about.html", "About Us"],
    ["what-we-do.html", "What We Do"],
    ["projects.html", "Projects"],
    ["approach.html", "Our Approach"],
    ["partnerships.html", "Partnerships"],
    ["insights.html", "Insights"],
    ["contact.html", "Contact"]
  ];

  // The uploaded official logo is shared by the header, mobile menu, and footer.
  var LOGO = '<img class="brand-logo" src="assets/branding/bottom-up-impact-logo.png" alt="Bottom Up Impact Limited" width="335" height="136">';

  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (page.indexOf("project-") === 0) page = "projects.html";

  function navLinks() {
    return NAV.map(function (n) {
      return '<a href="' + n[0] + '"' + (n[0] === page ? ' aria-current="page"' : "") + ">" + n[1] + "</a>";
    }).join("");
  }

  /* ---------- Header ---------- */
  var headerSlot = document.getElementById("site-header");
  if (headerSlot) {
    var solid = document.body.getAttribute("data-header") === "solid";
    headerSlot.outerHTML =
      '<header class="site-header' + (solid ? " site-header--solid" : "") + '" id="header">' +
      '<div class="container header-inner">' +
      '<a class="logo" href="index.html" aria-label="Bottom Up Impact — home">' + LOGO + "</a>" +
      '<nav class="nav" aria-label="Primary">' + navLinks() + "</nav>" +
      '<a class="btn btn--primary header-cta" href="contact.html">Build With Us <span class="arrow">→</span></a>' +
      '<button class="menu-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-nav"><span></span><span></span><span></span></button>' +
      "</div></header>" +
      '<div class="mobile-nav" id="mobile-nav" role="dialog" aria-modal="true" aria-label="Menu">' +
      '<div class="mobile-nav-top"><a class="logo" href="index.html">' + LOGO + "</a>" +
      '<button class="mobile-close" aria-label="Close menu">×</button></div>' +
      '<nav aria-label="Mobile">' + navLinks() + "</nav>" +
      '<a class="btn btn--accent" href="contact.html">Build With Us <span class="arrow">→</span></a></div>';
  }

  /* ---------- Footer ---------- */
  var footerSlot = document.getElementById("site-footer");
  if (footerSlot) {
    footerSlot.outerHTML =
      '<footer class="site-footer"><div class="container">' +
      '<div class="footer-top"><div>' +
      '<a class="logo" href="index.html">' + LOGO + "</a>" +
      '<p class="footer-tag">Building the systems behind a stronger food economy.</p>' +
      '<a class="btn btn--light" href="contact.html">Build With Us <span class="arrow">→</span></a></div>' +
      "<div><h4>Navigate</h4><ul>" + NAV.slice(0, 4).map(function (n) { return '<li><a href="' + n[0] + '">' + n[1] + "</a></li>"; }).join("") + "</ul></div>" +
      "<div><h4>&nbsp;</h4><ul>" + NAV.slice(4).map(function (n) { return '<li><a href="' + n[0] + '">' + n[1] + "</a></li>"; }).join("") + "</ul></div>" +
      "<div><h4>Contact</h4>" +
      // PLACEHOLDER: replace with verified official contact details
      '<ul><li class="footer-ph">[Official email — to be supplied]</li><li class="footer-ph">[Official phone — to be supplied]</li><li class="footer-ph">[Office location — to be supplied]</li></ul>' +
      '<h4 style="margin-top:1.75rem">Follow</h4>' +
      // PLACEHOLDER: replace href="#" with official social profiles
      '<ul><li><a href="#" aria-label="LinkedIn (link to be supplied)">LinkedIn</a></li><li><a href="#" aria-label="X (link to be supplied)">X / Twitter</a></li><li><a href="#" aria-label="Instagram (link to be supplied)">Instagram</a></li></ul></div></div>' +
      '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + " Bottom Up Impact. All rights reserved.</span><span>Building systems from the ground up.</span></div>" +
      "</div></footer>";
  }

  /* ---------- Header scroll state ---------- */
  var header = document.getElementById("header");
  function onScroll() {
    if (!header) return;
    var y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 40);
    header.classList.toggle("is-solid", y > 80);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".menu-toggle");
  var mnav = document.getElementById("mobile-nav");
  var closeBtn = document.querySelector(".mobile-close");
  function setMenu(open) {
    if (!mnav) return;
    mnav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
    if (open) closeBtn.focus(); else toggle.focus();
  }
  if (toggle) toggle.addEventListener("click", function () { setMenu(true); });
  if (closeBtn) closeBtn.addEventListener("click", function () { setMenu(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && mnav && mnav.classList.contains("is-open")) setMenu(false);
  });

  /* ---------- Reveal on scroll ---------- */
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }) : null;
  document.querySelectorAll(".reveal, .chain, .ecosystem, .impact-grid, .cycle, [data-observe]").forEach(function (el) {
    if (io) io.observe(el); else el.classList.add("is-visible");
  });

  /* ---------- Radial ecosystem layout ---------- */
  document.querySelectorAll(".ecosystem").forEach(function (eco) {
    var nodes = eco.querySelectorAll(".eco-node");
    var svg = eco.querySelector(".eco-lines");
    var n = nodes.length, r = 41, lines = '<circle cx="50" cy="50" r="' + r + '" class="pulse"/>';
    nodes.forEach(function (node, i) {
      var a = (-90 + (360 / n) * i) * Math.PI / 180;
      var x = 50 + r * Math.cos(a), y = 50 + r * Math.sin(a);
      node.style.left = x + "%"; node.style.top = y + "%";
      node.setAttribute("tabindex", "0");
      lines += '<line x1="50" y1="50" x2="' + x.toFixed(2) + '" y2="' + y.toFixed(2) + '" style="transition-delay:' + (i * 0.12) + 's"/>';
    });
    if (svg) { svg.setAttribute("viewBox", "0 0 100 100"); svg.innerHTML = lines; }
  });

  /* ---------- Capability relationships ---------- */
  document.querySelectorAll(".capabilities").forEach(function (wrap) {
    var caps = wrap.querySelectorAll(".cap[data-id]");
    caps.forEach(function (cap) {
      function on() {
        var rel = (cap.getAttribute("data-related") || "").split(" ");
        wrap.classList.add("has-hover");
        caps.forEach(function (c) {
          c.classList.toggle("is-active", c === cap);
          c.classList.toggle("is-related", rel.indexOf(c.getAttribute("data-id")) > -1);
        });
      }
      function off() {
        wrap.classList.remove("has-hover");
        caps.forEach(function (c) { c.classList.remove("is-active", "is-related"); });
      }
      cap.addEventListener("mouseenter", on); cap.addEventListener("mouseleave", off);
      cap.addEventListener("focusin", on); cap.addEventListener("focusout", off);
    });
  });

  /* ---------- Progressive stage activation (process + flow) ---------- */
  function progressive(container, itemSel, delay) {
    if (!container) return;
    var items = container.querySelectorAll(itemSel);
    var run = function () {
      items.forEach(function (it, i) { setTimeout(function () { it.classList.add("is-active"); }, i * delay); });
    };
    if (!io) return run();
    var o = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { run(); o.disconnect(); }
    }, { threshold: 0.3 });
    o.observe(container);
  }
  document.querySelectorAll(".process").forEach(function (p) { progressive(p, ".process-step", 260); });
  document.querySelectorAll(".flow").forEach(function (f) { progressive(f, "span", 180); });

  /* ---------- Bottom Up cycle ---------- */
  document.querySelectorAll(".cycle").forEach(function (cy) {
    var items = cy.querySelectorAll(".cycle-item");
    var n = items.length, r = 42;
    items.forEach(function (it, i) {
      var a = (-90 + (360 / n) * i) * Math.PI / 180;
      it.style.left = 50 + r * Math.cos(a) + "%";
      it.style.top = 50 + r * Math.sin(a) + "%";
      it.querySelector("span").style.transitionDelay = (i * 0.25) + "s";
    });
    var prog = cy.querySelector(".cycle-progress");
    if (prog) {
      var len = 2 * Math.PI * 42;
      prog.style.strokeDasharray = len; prog.style.strokeDashoffset = len;
      var o = new IntersectionObserver(function (en) {
        if (en[0].isIntersecting) { prog.style.strokeDashoffset = 0; o.disconnect(); }
      }, { threshold: 0.3 });
      o.observe(cy);
    }
  });

  /* ---------- Sticky sub-navigation / step navigation highlighting ---------- */
  document.querySelectorAll("[data-spy]").forEach(function (nav) {
    var links = nav.querySelectorAll("a[href^='#']");
    var map = {};
    links.forEach(function (l) { var t = document.querySelector(l.getAttribute("href")); if (t) map[t.id] = l; });
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.remove("is-active"); });
          if (map[en.target.id]) map[en.target.id].classList.add("is-active");
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    Object.keys(map).forEach(function (id) { so.observe(document.getElementById(id)); });
  });

  /* ---------- Project filtering ---------- */
  var filters = document.querySelectorAll(".filter-btn");
  if (filters.length) {
    var cards = document.querySelectorAll("[data-category]");
    var empty = document.querySelector(".empty-state");
    filters.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.getAttribute("data-filter");
        filters.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
        var shown = 0;
        cards.forEach(function (c) {
          var match = f === "all" || c.getAttribute("data-category").split(" ").indexOf(f) > -1;
          c.classList.toggle("is-hidden", !match);
          if (match) shown++;
        });
        if (empty) empty.style.display = shown ? "none" : "block";
      });
    });
  }

  /* ---------- Contact pathways → preselect area of interest ---------- */
  var pathwayBtns = document.querySelectorAll(".pathway[data-interest]");
  var interest = document.getElementById("interest");
  pathwayBtns.forEach(function (p) {
    p.addEventListener("click", function () {
      pathwayBtns.forEach(function (x) { x.setAttribute("aria-pressed", String(x === p)); });
      if (interest) interest.value = p.getAttribute("data-interest");
      var form = document.getElementById("contact-form");
      if (form) form.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
  // Support ?interest=... from other pages
  var qs = new URLSearchParams(location.search).get("interest");
  if (qs && interest) interest.value = qs;

  /* ---------- Contact form validation ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    var status = form.querySelector(".form-status");
    var submit = form.querySelector("button[type=submit]");
    var rules = {
      name: function (v) { return v.trim().length >= 2 || "Please enter your full name."; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Please enter a valid email address."; },
      phone: function (v) { return !v.trim() || /^[+\d\s()-]{7,}$/.test(v.trim()) || "Please enter a valid phone number."; },
      interest: function (v) { return !!v || "Please select an area of interest."; },
      message: function (v) { return v.trim().length >= 20 || "Please tell us a little more (at least 20 characters)."; },
      attachment: function (_, el) {
        var f = el.files && el.files[0];
        return !f || f.size <= 10 * 1024 * 1024 || "Attachment must be smaller than 10MB.";
      }
    };
    function check(el) {
      var rule = rules[el.name]; if (!rule) return true;
      var res = rule(el.value, el);
      var field = el.closest(".field"), err = field.querySelector(".error");
      var ok = res === true;
      field.classList.toggle("has-error", !ok);
      el.setAttribute("aria-invalid", String(!ok));
      if (err) err.textContent = ok ? "" : res;
      return ok;
    }
    form.querySelectorAll("input, select, textarea").forEach(function (el) {
      el.addEventListener("blur", function () { check(el); });
      el.addEventListener("input", function () { if (el.closest(".field") && el.closest(".field").classList.contains("has-error")) check(el); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form-status"; status.textContent = "";
      if (form.querySelector(".hp input").value) return; // honeypot spam protection
      var valid = true, first = null;
      form.querySelectorAll("input, select, textarea").forEach(function (el) {
        if (!check(el)) { valid = false; first = first || el; }
      });
      if (!valid) {
        status.className = "form-status is-error";
        status.textContent = "Please correct the highlighted fields and try again.";
        first.focus(); return;
      }
      // INTEGRATION POINT: connect a real form endpoint before accepting messages.
      // Keep the visitor's entries and never claim an unsent message was received.
      status.className = "form-status is-error";
      status.textContent = "Your message has not been sent. Message delivery is not yet connected.";
      status.focus();
    });
  }
})();
