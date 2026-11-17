/* Builds and animates every page from data/data.js */
(function () {
  "use strict";
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (id) { return document.getElementById(id); };
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; }
  function initials(s) { return s.split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0].toUpperCase(); }).join(""); }
  function peso(n) { return "₱" + Number(n).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function setBg(node, src, done) { var i = new Image(); i.onload = function () { node.style.backgroundImage = "url('" + src + "')"; if (done) done(); }; i.src = src; }
  function label(e) { return e.status === "upcoming" ? "Upcoming" : "Past"; }
  var runFunds = function () {};

  /* ---------- Header, footer, progress bar (every page) ---------- */
  var page = location.pathname.split("/").pop() || "index.html";
  var head = $("site-header");
  if (head) {
    var brand = el("a", "brand", "PUPC BSIT Alliance"); brand.href = "index.html"; head.appendChild(brand);
    var nav = el("nav"); nav.setAttribute("aria-label", "Main");
    [["Home", "index.html"], ["Events", "events.html"], ["Approval Letters", "letters.html"], ["Funds", "funds.html"]].forEach(function (l) {
      var on = page === l[1] || (page === "event.html" && l[1] === "events.html");
      var a = el("a", on ? "on" : "", l[0]); a.href = l[1]; nav.appendChild(a);
    });
    head.appendChild(nav);
  }
  var foot = $("site-footer");
  if (foot) {
    var w = el("div", "wrap"); w.appendChild(el("p", "", "BSIT Alliance, Polytechnic University of the Philippines, Calauan Campus"));
    var fp = el("p"), fa = el("a", "", "Facebook page"); fa.href = FACEBOOK_URL; fa.target = "_blank"; fa.rel = "noopener";
    fp.appendChild(fa); w.appendChild(fp); foot.appendChild(w);
  }
  if ($("fb-link")) $("fb-link").href = FACEBOOK_URL;
  var bar = el("div"); bar.id = "progress"; bar.setAttribute("aria-hidden", "true"); document.body.appendChild(bar);
  window.addEventListener("scroll", function () {
    var h = document.documentElement; bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";
  }, { passive: true });

  /* ---------- HOME: motto, hero effects ---------- */
  var hero = $("hero");
  if (hero) {
    var motto = $("motto");
    MOTTO.forEach(function (word, i) {
      if (i) { var d = el("span", "dot", "•"); d.setAttribute("aria-hidden", "true"); d.style.animationDelay = (0.15 + i * 0.35) + "s"; motto.appendChild(d); }
      var s = el("span", "", word); s.style.animationDelay = (0.3 + i * 0.35) + "s"; motto.appendChild(s);
    });
    if (!calm) {
      var bits = ["{ }", "</>", "01", "=>", "( )", "#", ";", "[ ]"], g = $("glyphs");
      for (var k = 0; k < 16; k++) {
        var b = el("span", "", bits[k % bits.length]);
        b.style.left = (Math.random() * 96) + "%"; b.style.fontSize = (1 + Math.random() * 1.6) + "rem";
        b.style.animationDuration = (14 + Math.random() * 16) + "s"; b.style.animationDelay = (-Math.random() * 20) + "s";
        g.appendChild(b);
      }
      hero.addEventListener("pointermove", function (e) {
        var r = hero.getBoundingClientRect();
        hero.style.setProperty("--mx", (e.clientX - r.left) + "px"); hero.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    }
  }

  /* ---------- HOME: officers ---------- */
  var grid = $("officer-grid");
  if (grid) OFFICERS.forEach(function (o) {
    var fig = el("figure", "officer"), card = el("div", "officer-card"), frame = el("div", "officer-photo");
    var fb = el("span", "officer-initials", initials(o.name)); frame.appendChild(fb);
    if (o.photo) { var img = new Image(); img.alt = "Photo of " + o.name; img.onload = function () { fb.remove(); frame.appendChild(img); }; img.src = o.photo; }
    var cap = el("figcaption"); cap.appendChild(el("strong", "officer-name", o.name)); cap.appendChild(el("span", "officer-position", o.position));
    card.appendChild(frame); card.appendChild(cap); fig.appendChild(card); grid.appendChild(fig);
    if (!calm) {
      fig.addEventListener("pointermove", function (e) {
        var r = fig.getBoundingClientRect();
        card.style.setProperty("--ry", (((e.clientX - r.left) / r.width - 0.5) * 12) + "deg");
        card.style.setProperty("--rx", (((e.clientY - r.top) / r.height - 0.5) * -12) + "deg");
      });
      fig.addEventListener("pointerleave", function () { card.style.setProperty("--rx", "0deg"); card.style.setProperty("--ry", "0deg"); });
    }
  });

  /* ---------- HOME: announcements ---------- */
  var ab = $("announcement-list");
  if (ab) {
    if (!ANNOUNCEMENTS.length) ab.appendChild(el("p", "empty", "No announcements yet."));
    ANNOUNCEMENTS.forEach(function (a) {
      var it = el("article", "announcement"); it.appendChild(el("h3", "", a.title));
      if (a.date) it.appendChild(el("p", "meta", a.date)); it.appendChild(el("p", "", a.body)); ab.appendChild(it);
    });
  }

  /* ---------- EVENTS page: cards that open the event page ---------- */
  var egrid = $("event-grid");
  function renderEvents(filter) {
    egrid.textContent = "";
    var list = EVENTS.filter(function (e) { return filter === "all" || e.status === filter; });
    if (!list.length) egrid.appendChild(el("p", "empty", "No events here yet."));
    list.forEach(function (e) {
      var card = el("a", "event-card"); card.href = "event.html?id=" + encodeURIComponent(e.id);
      var cover = el("div", "cover", e.title.charAt(0)); cover.appendChild(el("span", "pill " + e.status, label(e)));
      if (e.photos && e.photos[0]) setBg(cover, e.photos[0], function () { if (cover.firstChild.nodeType === 3) cover.firstChild.nodeValue = ""; });
      var body = el("div", "event-body"); body.appendChild(el("h3", "", e.title));
      if (e.date) body.appendChild(el("p", "meta", e.date)); body.appendChild(el("span", "more", "See photos and summary"));
      card.appendChild(cover); card.appendChild(body); egrid.appendChild(card);
    });
  }
  if (egrid) {
    Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (t) {
      t.addEventListener("click", function () {
        Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (x) { x.classList.toggle("on", x === t); });
        renderEvents(t.getAttribute("data-filter"));
      });
    });
    renderEvents("all");
  }

  /* ---------- EVENT page: summary + all photos + lightbox ---------- */
  var pg = $("photo-grid");
  if (pg) {
    var id = new URLSearchParams(location.search).get("id");
    var ev = EVENTS.filter(function (x) { return x.id === id; })[0];
    if (!ev) {
      $("e-title").textContent = "Event not found"; $("e-status").hidden = true; $("e-desc").textContent = "Please go back to the events page and choose an event.";
    } else {
      document.title = ev.title + " | PUPC BSIT Alliance";
      $("e-title").textContent = ev.title; $("e-date").textContent = ev.date || "";
      var st = $("e-status"); st.textContent = label(ev); st.className = "pill " + ev.status;
      $("e-desc").textContent = ev.description || "";
      (ev.photos || []).forEach(function (src, i) {
        var btn = el("button", "shot"), im = new Image();
        im.alt = ev.title + " photo " + (i + 1);
        im.onerror = function () { btn.remove(); if (!pg.children.length) $("no-photos").hidden = false; };
        im.src = src; btn.appendChild(im);
        btn.addEventListener("click", function () { lbOpen(Array.prototype.indexOf.call(pg.querySelectorAll("img"), im)); });
        pg.appendChild(btn);
      });
    }
    var lb = $("lightbox"), imgs = [], li = 0;
    var lbSet = function () { $("lb-img").src = imgs[li].src; $("lb-img").alt = imgs[li].alt; };
    var lbOpen = function (i) { imgs = pg.querySelectorAll("img"); li = i; lbSet(); lb.hidden = false; document.body.style.overflow = "hidden"; $("lb-close").focus(); };
    var lbClose = function () { lb.hidden = true; document.body.style.overflow = ""; };
    var lbStep = function (d) { li = (li + d + imgs.length) % imgs.length; lbSet(); };
    $("lb-close").addEventListener("click", lbClose);
    $("lb-prev").addEventListener("click", function () { lbStep(-1); });
    $("lb-next").addEventListener("click", function () { lbStep(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) lbClose(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") lbClose();
      if (e.key === "ArrowRight") lbStep(1);
      if (e.key === "ArrowLeft") lbStep(-1);
    });
  }

  /* ---------- LETTERS page: view / download PDFs ---------- */
  var lgrid = $("letter-list");
  function renderLetters(q) {
    lgrid.textContent = "";
    var list = LETTERS.filter(function (l) { return (l.title + " " + (l.date || "")).toLowerCase().indexOf(q) > -1; });
    if (!list.length) lgrid.appendChild(el("p", "empty", "No letters found."));
    list.forEach(function (l) {
      var row = el("article", "letter"), info = el("div");
      info.appendChild(el("h3", "", l.title)); if (l.date) info.appendChild(el("p", "meta", l.date));
      var act = el("div", "letter-actions"), href = encodeURI(l.file);
      var v = el("a", "btn small fill", "View"); v.href = href; v.target = "_blank"; v.rel = "noopener";
      var d = el("a", "btn small", "Download"); d.href = href; d.setAttribute("download", "");
      act.appendChild(v); act.appendChild(d); row.appendChild(info); row.appendChild(act); lgrid.appendChild(row);
    });
  }
  if (lgrid) {
    renderLetters("");
    $("letter-search").addEventListener("input", function () { renderLetters(this.value.toLowerCase().trim()); });
  }

  /* ---------- FUNDS page ---------- */
  var dl = $("funds-summary");
  if (dl) {
    $("funds-note").textContent = "Summary as of " + FUNDS.asOf + ".";
    var rows = [["Total collected", FUNDS.collected], ["Total spent", FUNDS.spent], ["Balance", FUNDS.collected - FUNDS.spent]], dds = [];
    rows.forEach(function (r) { var bx = el("div"); bx.appendChild(el("dt", "", r[0])); var dd = el("dd", "", peso(r[1])); dds.push(dd); bx.appendChild(dd); dl.appendChild(bx); });
    var pct = FUNDS.collected ? Math.min(100, FUNDS.spent / FUNDS.collected * 100) : 0;
    $("funds-bar-label").textContent = pct.toFixed(0) + "% of collected funds spent";
    runFunds = function () {
      $("funds-bar").style.width = pct + "%";
      if (calm) return;
      var t0 = performance.now();
      (function tick(t) {
        var p = Math.min(1, (t - t0) / 1400), ease = 1 - Math.pow(1 - p, 3);
        dds.forEach(function (dd, i) { dd.textContent = peso(rows[i][1] * ease); });
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    };
  }

  /* ---------- Scroll reveal ---------- */
  var seen = new IntersectionObserver(function (items) {
    items.forEach(function (it) {
      if (!it.isIntersecting) return;
      it.target.classList.add("in"); seen.unobserve(it.target);
      if ($("funds-bar") && it.target.contains($("funds-bar"))) runFunds();
    });
  }, { threshold: 0.15 });
  Array.prototype.forEach.call(document.querySelectorAll(".reveal"), function (n) { seen.observe(n); });
})();

/* ===== Extra polish for inner pages (appended) ===== */
(function () {
  "use strict";
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (id) { return document.getElementById(id); };
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; }
  function watch(box, fn) { if (!box) return; new MutationObserver(fn).observe(box, { childList: true }); fn(); }
  function stagger(box, sel) { Array.prototype.forEach.call(box.querySelectorAll(sel), function (n, i) { n.style.setProperty("--i", i); }); }

  /* 1. Banner: floating code symbols + cursor glow */
  var ph = document.querySelector(".page-hero");
  if (ph && !calm) {
    var layer = el("div", "glyphs"); layer.setAttribute("aria-hidden", "true"); ph.insertBefore(layer, ph.firstChild);
    var bits = ["{ }", "</>", "01", "=>", "( )", "#", ";", "[ ]"];
    for (var k = 0; k < 12; k++) {
      var s = el("span", "", bits[k % bits.length]);
      s.style.left = (Math.random() * 96) + "%"; s.style.fontSize = (1 + Math.random() * 1.4) + "rem";
      s.style.animationDuration = (12 + Math.random() * 14) + "s"; s.style.animationDelay = (-Math.random() * 16) + "s";
      layer.appendChild(s);
    }
    ph.addEventListener("pointermove", function (e) {
      var r = ph.getBoundingClientRect();
      ph.style.setProperty("--mx", (e.clientX - r.left) + "px"); ph.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
  }

  /* 2. Events page: staggered cards with tilt */
  var eg = $("event-grid");
  watch(eg, function () {
    stagger(eg, ".event-card");
    Array.prototype.forEach.call(eg.querySelectorAll(".event-card:not([data-fx])"), function (c) {
      c.setAttribute("data-fx", "1");
      if (calm) return;
      c.addEventListener("pointermove", function (e) {
        var r = c.getBoundingClientRect();
        c.style.setProperty("--ry", (((e.clientX - r.left) / r.width - 0.5) * 10) + "deg");
        c.style.setProperty("--rx", (((e.clientY - r.top) / r.height - 0.5) * -10) + "deg");
      });
      c.addEventListener("pointerleave", function () { c.style.setProperty("--rx", "0deg"); c.style.setProperty("--ry", "0deg"); });
    });
  });

  /* 3. Event page: photo backdrop, count, copy link, previous/next */
  var pg = $("photo-grid");
  if (pg && ph) {
    var evId = new URLSearchParams(location.search).get("id");
    var ev = EVENTS.filter(function (x) { return x.id === evId; })[0];
    if (ev) {
      var hp = el("div", "hero-photo"); ph.insertBefore(hp, ph.firstChild);
      var t = new Image();
      t.onload = function () { hp.style.backgroundImage = "url('" + ev.photos[0] + "')"; hp.classList.add("on"); };
      t.src = ev.photos[0];
      if (!calm) window.addEventListener("scroll", function () { hp.style.transform = "translateY(" + (window.scrollY * 0.25) + "px) scale(1.08)"; }, { passive: true });

      var sh = el("button", "share", "Copy link");
      sh.addEventListener("click", function () {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(location.href).then(function () {
          sh.textContent = "Link copied!"; setTimeout(function () { sh.textContent = "Copy link"; }, 1800);
        }, function () {});
      });
      ph.querySelector(".wrap").appendChild(sh);

      var cnt = el("span"); $("e-date").parentNode.appendChild(cnt);
      watch(pg, function () {
        stagger(pg, ".shot");
        var n = pg.children.length; cnt.textContent = n ? " · " + n + (n > 1 ? " photos" : " photo") : "";
      });

      var i = EVENTS.indexOf(ev), nav = el("div", "event-nav");
      [[EVENTS[i - 1], "Previous event", ""], [EVENTS[i + 1], "Next event", "next"]].forEach(function (p) {
        if (!p[0]) return;
        var a = el("a", p[2]); a.href = "event.html?id=" + encodeURIComponent(p[0].id);
        a.appendChild(el("small", "", p[1])); a.appendChild(el("strong", "", p[0].title)); nav.appendChild(a);
      });
      $("event-detail").appendChild(nav);
    }
  }

  /* 4. Funds page: animated ring */
  var fd = $("funds-summary");
  if (fd) {
    var pct = FUNDS.collected ? Math.min(100, FUNDS.spent / FUNDS.collected * 100) : 0, C = 2 * Math.PI * 52;
    var peso = function (n) { return "₱" + Number(n).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
    var wrap = el("div", "ring-wrap");
    wrap.innerHTML = '<div class="ring-box"><svg class="ring" viewBox="0 0 120 120" aria-hidden="true"><circle class="ring-bg" cx="60" cy="60" r="52"/><circle class="ring-fg" id="ring-fg" cx="60" cy="60" r="52" stroke-dasharray="' + C + '" stroke-dashoffset="' + C + '"/></svg><div class="ring-text"><strong>' + Math.round(pct) + '%</strong><span>spent</span></div></div>';
    wrap.appendChild(el("p", "ring-note", "Of the " + peso(FUNDS.collected) + " collected, " + peso(FUNDS.spent) + " has been spent and " + peso(FUNDS.collected - FUNDS.spent) + " remains."));
    fd.parentNode.appendChild(wrap);
    new IntersectionObserver(function (items, o) {
      items.forEach(function (it) { if (it.isIntersecting) { $("ring-fg").style.strokeDashoffset = C * (1 - pct / 100); o.disconnect(); } });
    }, { threshold: 0.4 }).observe(wrap);
  }

  /* 5. Approval letters: staggered rows */
  var ll = $("letter-list");
  watch(ll, function () { stagger(ll, ".letter"); });

  /* 6. Back-to-top button */
  var up = el("button", "totop", "↑"); up.setAttribute("aria-label", "Back to top"); document.body.appendChild(up);
  up.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" }); });
  window.addEventListener("scroll", function () { up.classList.toggle("show", window.scrollY > 600); }, { passive: true });

  /* 7. Fade between pages */
  if (!calm) {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a || e.defaultPrevented || e.button || e.ctrlKey || e.metaKey || e.shiftKey || a.target || a.hasAttribute("download")) return;
      if (a.origin !== location.origin || (a.pathname === location.pathname && a.search === location.search)) return;
      if (!/\.html?$|\/$/.test(a.pathname)) return;
      e.preventDefault(); document.body.classList.add("leaving");
      setTimeout(function () { location.href = a.href; }, 230);
    });
    window.addEventListener("pageshow", function () { document.body.classList.remove("leaving"); });
  }
})();

/* ===== Round 1 features (appended) ===== */
(function () {
  "use strict";
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (id) { return document.getElementById(id); };
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; }
  function watch(box, fn) { if (!box) return; new MutationObserver(fn).observe(box, { childList: true }); fn(); }
  function lockScroll(on) { document.body.style.overflow = on ? "hidden" : ""; }
  function popup(html) { var m = el("div", "modal"); m.hidden = true; m.innerHTML = html; document.body.appendChild(m); return m; }

  /* 1. Logo (images/logo.png) + dark mode button in the header */
  var brand = document.querySelector(".brand");
  if (brand) { var lg = new Image(); lg.alt = ""; lg.onload = function () { brand.insertBefore(lg, brand.firstChild); }; lg.src = "images/logo.png"; }
  var nav = document.querySelector(".topbar nav");
  if (nav) {
    var saved = null; try { saved = localStorage.getItem("bsit-theme"); } catch (e) {}
    var tb = el("button", "theme-btn");
    var setTheme = function (t) {
      document.documentElement.setAttribute("data-theme", t);
      tb.textContent = t === "dark" ? "☀" : "☾";
      tb.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
    };
    setTheme(saved === "dark" ? "dark" : "light");
    tb.addEventListener("click", function () {
      var t = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(t); try { localStorage.setItem("bsit-theme", t); } catch (e) {}
    });
    nav.appendChild(tb);
  }

  /* 2. Home: photo slideshow behind the hero (uses your event photos 1 and 2) */
  var hero = $("hero");
  if (hero) {
    var layer = el("div", "slides"); layer.setAttribute("aria-hidden", "true"); hero.insertBefore(layer, hero.firstChild);
    var urls = [], good = {}, waiting;
    EVENTS.forEach(function (e) { (e.photos || []).slice(0, 2).forEach(function (p) { urls.push(p); }); });
    waiting = urls.length;
    var build = function () {
      var list = urls.filter(function (u) { return good[u]; }).slice(0, 6);
      if (!list.length) return;
      var slides = list.map(function (u) { var s = el("div", "slide"); s.style.backgroundImage = "url('" + u + "')"; layer.appendChild(s); return s; });
      var n = 0; slides[0].classList.add("on");
      if (calm || slides.length < 2) return;
      setInterval(function () { slides[n].classList.remove("on"); n = (n + 1) % slides.length; slides[n].classList.add("on"); }, 5500);
    };
    urls.forEach(function (u) {
      var im = new Image();
      im.onload = function () { good[u] = true; if (!--waiting) build(); };
      im.onerror = function () { if (!--waiting) build(); };
      im.src = u;
    });
  }

  /* 3. Home: stats strip with count-up */
  var offSec = $("officers");
  if (hero && offSec) {
    var band = el("section", "stats-band"), sw = el("div", "wrap stats");
    [[OFFICERS.length, "Officers"], [EVENTS.length, "Events"], [LETTERS.length, "Approval letters"]].forEach(function (s) {
      var box = el("div", "stat"), num = el("strong", "", calm ? String(s[0]) : "0");
      num.setAttribute("data-to", s[0]); box.appendChild(num); box.appendChild(el("span", "", s[1])); sw.appendChild(box);
    });
    band.appendChild(sw); offSec.parentNode.insertBefore(band, offSec);
    if (!calm) new IntersectionObserver(function (items, o) {
      items.forEach(function (it) {
        if (!it.isIntersecting) return; o.disconnect();
        var t0 = performance.now();
        (function step(t) {
          var p = Math.min(1, (t - t0) / 1200);
          Array.prototype.forEach.call(sw.querySelectorAll("strong"), function (n) { n.textContent = Math.round(n.getAttribute("data-to") * p); });
          if (p < 1) requestAnimationFrame(step);
        })(t0);
      });
    }, { threshold: 0.5 }).observe(sw);
  }

  /* 4. Officer profile pop-up (click an officer card) */
  var pop = popup('<div class="modal-box" role="dialog" aria-modal="true" aria-labelledby="pf-name"><button class="modal-close" aria-label="Close">&times;</button><div class="profile"><div class="profile-photo" id="pf-photo"></div><div class="profile-info"><span class="pill" id="pf-year"></span><h3 id="pf-name"></h3><span class="role" id="pf-role"></span><blockquote id="pf-quote"></blockquote></div></div></div>');
  var opener = null;
  var popClose = function () { pop.hidden = true; lockScroll(false); if (opener) opener.focus(); };
  pop.querySelector(".modal-close").addEventListener("click", popClose);
  pop.addEventListener("click", function (e) { if (e.target === pop) popClose(); });
  var og = $("officer-grid");
  if (og) Array.prototype.forEach.call(og.children, function (f, i) {
    var o = OFFICERS[i];
    f.tabIndex = 0; f.setAttribute("role", "button"); f.setAttribute("aria-label", "View profile of " + o.name);
    var open = function () {
      var ph = $("pf-photo"), src = f.querySelector("img"); ph.textContent = "";
      if (src) { var big = new Image(); big.alt = o.name; big.src = src.src; ph.appendChild(big); }
      else ph.appendChild(el("span", "officer-initials", o.name.split(/\s+/).slice(0, 2).map(function (w) { return w[0]; }).join("")));
      $("pf-name").textContent = o.name; $("pf-role").textContent = o.position;
      var yr = $("pf-year"); yr.textContent = o.year || ""; yr.hidden = !o.year;
      var q = $("pf-quote"); q.textContent = o.quote ? "“" + o.quote + "”" : ""; q.hidden = !o.quote;
      opener = f; pop.hidden = false; lockScroll(true); pop.querySelector(".modal-close").focus();
    };
    f.addEventListener("click", open);
    f.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });

  /* 5. Approval letters: in-page PDF preview */
  var pdf = popup('<div class="modal-box pdf-box" role="dialog" aria-modal="true" aria-labelledby="pdf-title"><button class="modal-close" aria-label="Close">&times;</button><div class="pdf-head"><h3 id="pdf-title"></h3><a class="btn small fill" id="pdf-open" target="_blank" rel="noopener">Open in new tab</a><a class="btn small" id="pdf-dl" download>Download</a></div><iframe class="pdf-frame" id="pdf-frame" title="Approval letter preview"></iframe><p class="pdf-note">If the preview does not load on your phone, use Open in new tab or Download.</p></div>');
  var pdfOpener = null;
  var pdfClose = function () { pdf.hidden = true; $("pdf-frame").src = "about:blank"; lockScroll(false); if (pdfOpener) pdfOpener.focus(); };
  pdf.querySelector(".modal-close").addEventListener("click", pdfClose);
  pdf.addEventListener("click", function (e) { if (e.target === pdf) pdfClose(); });
  var ll = $("letter-list");
  watch(ll, function () {
    Array.prototype.forEach.call(ll.querySelectorAll(".letter:not([data-pv])"), function (row) {
      row.setAttribute("data-pv", "1");
      var view = row.querySelector("a.fill"), acts = row.querySelector(".letter-actions");
      if (!view || !acts) return;
      var b = el("button", "btn small", "Preview"); b.type = "button"; acts.insertBefore(b, view);
      b.addEventListener("click", function () {
        var href = view.getAttribute("href");
        $("pdf-title").textContent = row.querySelector("h3").textContent;
        $("pdf-open").href = href; $("pdf-dl").href = href; $("pdf-frame").src = href;
        pdfOpener = b; pdf.hidden = false; lockScroll(true); pdf.querySelector(".modal-close").focus();
      });
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (!pop.hidden) popClose();
    if (!pdf.hidden) pdfClose();
  });

  /* 6. Events page: countdown to the next upcoming event that has a "when" date */
  var eg = $("event-grid");
  if (eg) {
    var upNext = EVENTS.filter(function (e) { return e.when && new Date(e.when).getTime() > Date.now(); })
      .sort(function (a, b) { return new Date(a.when) - new Date(b.when); })[0];
    if (upNext) {
      var cd = el("a", "next-up"); cd.href = "event.html?id=" + encodeURIComponent(upNext.id);
      var txt = el("div"); txt.appendChild(el("small", "", "Next up")); txt.appendChild(el("strong", "", upNext.title));
      var clock = el("div", "clock"); cd.appendChild(txt); cd.appendChild(clock);
      eg.parentNode.insertBefore(cd, eg.parentNode.querySelector(".tabs"));
      var tick = function () {
        var s = Math.max(0, Math.floor((new Date(upNext.when) - Date.now()) / 1000));
        clock.textContent = "";
        [[Math.floor(s / 86400), "days"], [Math.floor(s % 86400 / 3600), "hrs"], [Math.floor(s % 3600 / 60), "min"], [s % 60, "sec"]].forEach(function (p) {
          var b = el("b"); b.appendChild(document.createTextNode(String(p[0]).padStart(2, "0"))); b.appendChild(el("em", "", p[1])); clock.appendChild(b);
        });
      };
      tick(); setInterval(tick, 1000);
    }
  }
})();

/* ===== Funds report (appended) ===== */
(function () {
  "use strict";
  var box = document.getElementById("funds-report");
  if (!box || typeof REPORT === "undefined") return;
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; }
  function peso(n) { return "₱" + Number(n).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function cell(tag, text, cls) { return el(tag, cls || "", text); }
  function row(cells, cls) { var r = el("tr", cls || ""); cells.forEach(function (c) { r.appendChild(c); }); return r; }

  var left = el("div"), right = el("aside", "running");

  REPORT.sections.forEach(function (s, k) {
    var d = el("details", "rsec"), sum = el("summary"), last = s.rows[s.rows.length - 1][4];
    if (k === REPORT.sections.length - 1) d.open = true;
    sum.appendChild(el("span", "", s.title));
    sum.appendChild(el("span", "re", "Ending balance: " + peso(last)));
    var scroll = el("div", "tscroll"), t = el("table", "rtable"), th = el("thead"), tb = el("tbody");
    th.appendChild(row(["Date", "Description", "Income", "Expenses", "Balance"].map(function (h, i) { return cell("th", h, i > 1 ? "n" : ""); })));
    s.rows.forEach(function (r) {
      tb.appendChild(row([
        cell("td", r[0]), cell("td", r[1]),
        cell("td", r[2] ? peso(r[2]) : "", "n" + (r[2] ? " inc" : "")),
        cell("td", r[3] ? peso(r[3]) : "", "n" + (r[3] ? " exp" : "")),
        cell("td", peso(r[4]), "n")
      ]));
    });
    t.appendChild(th); t.appendChild(tb); scroll.appendChild(t); d.appendChild(sum); d.appendChild(scroll); left.appendChild(d);
  });

  right.appendChild(el("h3", "", "Running Balance (As of " + REPORT.asOf + ")"));
  var rs = el("div", "tscroll"), rt = el("table", "rtable"), rh = el("thead"), rb = el("tbody");
  rh.appendChild(row([cell("th", "Category"), cell("th", "Amount", "n"), cell("th", "Notes")]));
  REPORT.running.forEach(function (r) {
    var note = cell("td", ""); note.appendChild(el("small", "", r.note));
    rb.appendChild(row([cell("td", r.category), cell("td", peso(r.amount), "n"), note], r.highlight ? "hl" : ""));
  });
  rt.appendChild(rh); rt.appendChild(rb); rs.appendChild(rt); right.appendChild(rs);

  box.appendChild(left); box.appendChild(right);
})();