/* Builds the page from data/data.js */
(function () {
  "use strict";

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function initials(name) {
    return name.split(/\s+/).filter(Boolean).slice(0, 2)
      .map(function (w) { return w.charAt(0).toUpperCase(); }).join("");
  }

  function peso(n) {
    return "₱" + Number(n).toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  /* Facebook links */
  ["fb-link", "fb-link-footer"].forEach(function (id) {
    var a = document.getElementById(id);
    if (a) a.href = FACEBOOK_URL;
  });

  /* Officers */
  var grid = document.getElementById("officer-grid");
  OFFICERS.forEach(function (o) {
    var card = el("figure", "officer");
    var frame = el("div", "officer-photo");
    var fallback = el("span", "officer-initials", initials(o.name));
    frame.appendChild(fallback);

    if (o.photo) {
      var img = new Image();
      img.alt = "Photo of " + o.name;
      img.onload = function () { fallback.remove(); frame.appendChild(img); };
      img.src = o.photo;
    }

    var cap = el("figcaption");
    cap.appendChild(el("strong", "officer-name", o.name));
    cap.appendChild(el("span", "officer-position", o.position));
    card.appendChild(frame);
    card.appendChild(cap);
    grid.appendChild(card);
  });

  /* Events */
  function fillEvents(listId, status, emptyText) {
    var list = document.getElementById(listId);
    var items = EVENTS.filter(function (e) { return e.status === status; });
    if (!items.length) { list.appendChild(el("li", "empty", emptyText)); return; }
    items.forEach(function (e) {
      var li = el("li");
      li.appendChild(el("span", "event-title", e.title));
      if (e.date) li.appendChild(el("span", "event-date", e.date));
      list.appendChild(li);
    });
  }
  fillEvents("events-upcoming", "upcoming", "No upcoming events yet. Check back soon.");
  fillEvents("events-done", "done", "No past events yet.");

  /* Announcements */
  var annBox = document.getElementById("announcement-list");
  if (!ANNOUNCEMENTS.length) {
    annBox.appendChild(el("p", "empty", "No announcements yet."));
  }
  ANNOUNCEMENTS.forEach(function (a) {
    var item = el("article", "announcement");
    item.appendChild(el("h3", "", a.title));
    if (a.date) item.appendChild(el("p", "meta", a.date));
    item.appendChild(el("p", "", a.body));
    annBox.appendChild(item);
  });

  /* Funds */
  document.getElementById("funds-note").textContent = "Summary as of " + FUNDS.asOf + ".";
  var dl = document.getElementById("funds-summary");
  [
    ["Total collected", FUNDS.collected],
    ["Total spent", FUNDS.spent],
    ["Balance", FUNDS.collected - FUNDS.spent]
  ].forEach(function (row) {
    var box = el("div");
    box.appendChild(el("dt", "", row[0]));
    box.appendChild(el("dd", "", peso(row[1])));
    dl.appendChild(box);
  });
})();
