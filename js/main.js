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