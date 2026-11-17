/* Builds and animates the page from data/data.js */
(function () {
  "use strict";
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (id) { return document.getElementById(id); };
  function el(tag, cls, text) { var n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; }
  function initials(s) { return s.split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w[0].toUpperCase(); }).join(""); }
  function peso(n) { return "₱" + Number(n).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function setBg(node, src, done) { var i = new Image(); i.onload = function () { node.style.backgroundImage = "url('" + src + "')"; if (done) done(); }; i.src = src; }

  ["fb-link", "fb-link-footer"].forEach(function (id) { if ($(id)) $(id).href = FACEBOOK_URL; });

  /* Motto */
  var motto = $("motto");
  MOTTO.forEach(function (w, i) {
    if (i) { var d = el("span", "dot", "•"); d.setAttribute("aria-hidden", "true"); d.style.animationDelay = (0.3 + i * 0.35 - 0.15) + "s"; motto.appendChild(d); }
    var s = el("span", "", w); s.style.animationDelay = (0.3 + i * 0.35) + "s"; motto.appendChild(s);
  });

  /* Floating code symbols + cursor glow in hero */
  var hero = $("hero");
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

  /* Officers */
  var grid = $("officer-grid");
  OFFICERS.forEach(function (o) {
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

  /* Events + modal */
  var egrid = $("event-grid"), modal = $("modal"), lastBtn = null, current = null, idx = 0;
  function label(e) { return e.status === "upcoming" ? "Upcoming" : "Past"; }
  function renderEvents(filter) {
    egrid.textContent = "";
    var list = EVENTS.filter(function (e) { return filter === "all" || e.status === filter; });
    if (!list.length) egrid.appendChild(el("p", "empty", "No events here yet."));
    list.forEach(function (e) {
      var btn = el("button", "event-card"), cover = el("div", "cover", e.title.charAt(0));
      cover.appendChild(el("span", "pill " + e.status, label(e)));
      if (e.photos && e.photos[0]) setBg(cover, e.photos[0], function () { cover.firstChild.nodeType === 3 && (cover.firstChild.nodeValue = ""); });
      var body = el("div", "event-body"); body.appendChild(el("h3", "", e.title));
      if (e.date) body.appendChild(el("p", "meta", e.date)); body.appendChild(el("span", "more", "View photos and details"));
      btn.appendChild(cover); btn.appendChild(body);
      btn.addEventListener("click", function () { openEvent(e, btn); });
      egrid.appendChild(btn);
    });
  }
  function showPhoto(i) {
    idx = i; var main = $("g-main"), src = (current.photos || [])[i];
    main.style.backgroundImage = ""; main.textContent = src ? "" : "Add photos for this event in photos/events/";
    if (src) setBg(main, src);
    Array.prototype.forEach.call($("g-thumbs").children, function (t, n) { t.classList.toggle("on", n === i); });
  }
  function openEvent(e, btn) {
    current = e; lastBtn = btn;
    $("m-title").textContent = e.title; $("m-date").textContent = e.date || ""; $("m-desc").textContent = e.description || "";
    var st = $("m-status"); st.textContent = label(e); st.className = "pill " + e.status;
    var th = $("g-thumbs"); th.textContent = "";
    (e.photos || []).forEach(function (p, i) {
      var t = el("button"); t.setAttribute("aria-label", "Photo " + (i + 1)); setBg(t, p);
      t.addEventListener("click", function () { showPhoto(i); }); th.appendChild(t);
    });
    th.style.display = (e.photos || []).length > 1 ? "flex" : "none";
    showPhoto(0); modal.hidden = false; document.body.style.overflow = "hidden"; $("m-close").focus();
  }
  function closeModal() { modal.hidden = true; document.body.style.overflow = ""; if (lastBtn) lastBtn.focus(); }
  $("m-close").addEventListener("click", closeModal);
  modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", function (e) {
    if (modal.hidden) return;
    var n = (current.photos || []).length;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight" && n) showPhoto((idx + 1) % n);
    if (e.key === "ArrowLeft" && n) showPhoto((idx - 1 + n) % n);
  });
  Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (t) {
    t.addEventListener("click", function () {
      Array.prototype.forEach.call(document.querySelectorAll(".tab"), function (x) { x.classList.toggle("on", x === t); });
      renderEvents(t.getAttribute("data-filter"));
    });
  });
  renderEvents("all");

  /* Announcements */
  var ab = $("announcement-list");
  if (!ANNOUNCEMENTS.length) ab.appendChild(el("p", "empty", "No announcements yet."));
  ANNOUNCEMENTS.forEach(function (a) {
    var it = el("article", "announcement"); it.appendChild(el("h3", "", a.title));
    if (a.date) it.appendChild(el("p", "meta", a.date)); it.appendChild(el("p", "", a.body)); ab.appendChild(it);
  });

  /* Funds: count up + bar when visible */
  $("funds-note").textContent = "Summary as of " + FUNDS.asOf + ".";
  var rows = [["Total collected", FUNDS.collected], ["Total spent", FUNDS.spent], ["Balance", FUNDS.collected - FUNDS.spent]], dds = [], dl = $("funds-summary");
  rows.forEach(function (r) { var b = el("div"); b.appendChild(el("dt", "", r[0])); var d = el("dd", "", peso(r[1])); dds.push(d); b.appendChild(d); dl.appendChild(b); });
  var pct = FUNDS.collected ? Math.min(100, FUNDS.spent / FUNDS.collected * 100) : 0;
  $("funds-bar-label").textContent = pct.toFixed(0) + "% of collected funds spent";
  function runFunds() {
    $("funds-bar").style.width = pct + "%";
    if (calm) return;
    var t0 = performance.now();
    (function tick(t) {
      var p = Math.min(1, (t - t0) / 1400), ease = 1 - Math.pow(1 - p, 3);
      dds.forEach(function (d, i) { d.textContent = peso(rows[i][1] * ease); });
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  /* Scroll reveal + progress bar */
  var seen = new IntersectionObserver(function (items) {
    items.forEach(function (it) {
      if (!it.isIntersecting) return;
      it.target.classList.add("in"); seen.unobserve(it.target);
      if (it.target.contains($("funds-bar"))) runFunds();
    });
  }, { threshold: 0.15 });
  Array.prototype.forEach.call(document.querySelectorAll(".reveal"), function (n) { seen.observe(n); });
  window.addEventListener("scroll", function () {
    var h = document.documentElement; $("progress").style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";
  }, { passive: true });
})();