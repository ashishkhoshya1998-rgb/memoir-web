(function () {
  "use strict";

  var CATEGORIES = [
    { id: "ring", label: "Ring", scene: "The ring that starts a new chapter" },
    { id: "necklace", label: "Necklace", scene: "A pendant that carries your story" },
    { id: "bracelet", label: "Bracelet", scene: "Wrapped around every memory" },
    { id: "earring", label: "Earrings", scene: "The finishing touch she deserves" },
  ];
  var FRAME_COUNT = 48;

  // ── State ──
  var frames = {};
  var currentIndex = 0;
  var progress = 0;
  var isOpen = false;
  var hintVisible = true;

  // ── Preload ──
  CATEGORIES.forEach(function (cat) {
    frames[cat.id] = [];
    for (var i = 1; i <= FRAME_COUNT; i++) {
      var img = new Image();
      var num = i < 10 ? "00" + i : i < 100 ? "0" + i : "" + i;
      img.src = "/frames/" + cat.id + "/f_" + num + ".jpg";
      img.onerror = function () {};
      frames[cat.id].push(img);
    }
  });

  // ── DOM ──
  var overlay = document.createElement("div");
  overlay.className = "se-overlay";

  // Build pills HTML
  var pillsHTML = CATEGORIES.map(function (cat, i) {
    return '<button class="se-pill' + (i === 0 ? ' se-pill-active' : '') + '" data-se-idx="' + i + '">' + cat.label + '</button>';
  }).join("");

  // Build segment HTML
  var segsHTML = CATEGORIES.map(function (_, i) {
    return '<div class="se-seg"><div class="se-seg-fill" data-se-seg="' + i + '"></div></div>';
  }).join("");

  overlay.innerHTML =
    '<div class="se-counter"><strong>01</strong> / 04</div>' +
    '<button class="se-close" aria-label="Close"><span class="material-symbols-outlined" style="font-size:20px;font-variation-settings:\'FILL\' 0,\'wght\' 300,\'GRAD\' 0,\'opsz\' 24">close</span></button>' +
    '<div class="se-player">' +
      '<div class="se-video-box"><canvas class="se-canvas"></canvas></div>' +
      '<div class="se-progress-track"><div class="se-progress-bar"></div></div>' +
      '<div class="se-controls">' +
        '<div class="se-info">' +
          '<h2 class="se-category-name">Ring</h2>' +
          '<p class="se-scene-text">The ring that starts a new chapter</p>' +
        '</div>' +
        '<div class="se-pills">' + pillsHTML + '</div>' +
        '<div class="se-segments">' + segsHTML + '</div>' +
        '<div class="se-scroll-hint"><span>Scroll to explore</span></div>' +
      '</div>' +
    '</div>';

  document.body.appendChild(overlay);

  // ── Refs ──
  var canvas = overlay.querySelector(".se-canvas");
  var ctx = canvas.getContext("2d");
  var closeBtn = overlay.querySelector(".se-close");
  var progressBar = overlay.querySelector(".se-progress-bar");
  var counterEl = overlay.querySelector(".se-counter");
  var categoryNameEl = overlay.querySelector(".se-category-name");
  var sceneTextEl = overlay.querySelector(".se-scene-text");
  var scrollHint = overlay.querySelector(".se-scroll-hint");
  var pillsContainer = overlay.querySelector(".se-pills");

  // ── Pill clicks ──
  pillsContainer.addEventListener("click", function (e) {
    var pill = e.target.closest(".se-pill");
    if (pill) switchTo(parseInt(pill.getAttribute("data-se-idx"), 10));
  });

  // ── Canvas ──
  function resizeCanvas() {
    var box = overlay.querySelector(".se-video-box");
    var rect = box.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    renderFrame();
  }

  function renderFrame() {
    var catId = CATEGORIES[currentIndex].id;
    var idx = Math.min(Math.floor(progress * FRAME_COUNT), FRAME_COUNT - 1);
    idx = Math.max(0, idx);
    var img = frames[catId][idx];

    var cw = canvas.width;
    var ch = canvas.height;
    ctx.fillStyle = "#F5F0EB";
    ctx.fillRect(0, 0, cw, ch);

    if (!img || !img.complete || img.naturalWidth === 0) return;

    var iw = img.naturalWidth;
    var ih = img.naturalHeight;
    var scale = Math.max(cw / iw, ch / ih);
    var dw = iw * scale;
    var dh = ih * scale;
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }

  // ── UI ──
  function updateUI() {
    var cat = CATEGORIES[currentIndex];
    var num = currentIndex + 1;
    counterEl.innerHTML = "<strong>" + (num < 10 ? "0" + num : num) + "</strong> / 0" + CATEGORIES.length;
    categoryNameEl.textContent = cat.label;
    sceneTextEl.textContent = cat.scene;
    progressBar.style.width = (progress * 100) + "%";

    // Segments
    for (var i = 0; i < CATEGORIES.length; i++) {
      var fill = overlay.querySelector('[data-se-seg="' + i + '"]');
      if (i < currentIndex) fill.style.width = "100%";
      else if (i === currentIndex) fill.style.width = (progress * 100) + "%";
      else fill.style.width = "0%";
    }

    // Pills
    var pills = pillsContainer.querySelectorAll(".se-pill");
    pills.forEach(function (p, i) {
      if (i === currentIndex) p.classList.add("se-pill-active");
      else p.classList.remove("se-pill-active");
    });

    // Hint
    if (hintVisible && progress > 0.03) {
      hintVisible = false;
      scrollHint.style.opacity = "0";
      scrollHint.style.transition = "opacity 0.5s ease";
    }

    renderFrame();
  }

  function switchTo(idx) {
    currentIndex = idx;
    progress = 0;
    hintVisible = true;
    scrollHint.style.opacity = "0.5";
    updateUI();
  }

  function advanceToNext() {
    if (currentIndex < CATEGORIES.length - 1) {
      switchTo(currentIndex + 1);
    } else {
      close();
    }
  }

  // ── Open / Close ──
  function open(category) {
    if (isOpen) return;
    isOpen = true;
    var idx = 0;
    if (category) {
      for (var i = 0; i < CATEGORIES.length; i++) {
        if (CATEGORIES[i].id === category) { idx = i; break; }
      }
    }
    currentIndex = idx;
    progress = 0;
    hintVisible = true;
    scrollHint.style.opacity = "0.5";
    overlay.classList.add("se-active");
    document.body.style.overflow = "hidden";
    requestAnimationFrame(function () {
      resizeCanvas();
      updateUI();
    });
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    overlay.classList.remove("se-active");
    document.body.style.overflow = "";
  }

  // ── Events ──
  closeBtn.addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen) close();
  });

  // Wheel — horizontal or vertical
  overlay.addEventListener("wheel", function (e) {
    if (!isOpen) return;
    e.preventDefault();
    var delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    progress = Math.min(1, Math.max(0, progress + delta * 0.0005));
    if (progress >= 0.995) { progress = 0; advanceToNext(); return; }
    updateUI();
  }, { passive: false });

  // Touch — horizontal swipe scrubs
  var touchLastX = 0;
  overlay.addEventListener("touchstart", function (e) {
    if (!isOpen) return;
    touchLastX = e.touches[0].clientX;
  }, { passive: true });

  overlay.addEventListener("touchmove", function (e) {
    if (!isOpen) return;
    e.preventDefault();
    var x = e.touches[0].clientX;
    var delta = (touchLastX - x) * 0.002;
    touchLastX = x;
    progress = Math.min(1, Math.max(0, progress + delta));
    if (progress >= 0.995) { progress = 0; advanceToNext(); return; }
    updateUI();
  }, { passive: false });

  // Only allow swipe-to-open on the home/main page
  function isOnHomePage() {
    // Check if hero section is in the DOM (only rendered on home page)
    return !!document.querySelector('.hero-content');
  }

  // Horizontal swipe to open from page (mobile)
  // Sets touch-action: pan-y on the hero so browser only handles vertical scroll,
  // leaving horizontal swipes for our JS to detect.
  var heroTouchReady = false;
  function ensureHeroTouchAction() {
    if (heroTouchReady) return;
    var hero = document.querySelector('.hero-content');
    if (hero) {
      hero.style.touchAction = 'pan-y';
      heroTouchReady = true;
    }
  }

  var hsx = 0, hsy = 0, hTracking = false, hDirection = null;
  document.addEventListener("touchstart", function (e) {
    if (isOpen || !isOnHomePage()) return;
    // Only track swipes that start inside the hero section
    var hero = document.querySelector('.hero-content');
    if (!hero || !hero.contains(e.target)) return;
    ensureHeroTouchAction();
    hsx = e.touches[0].clientX; hsy = e.touches[0].clientY;
    hTracking = true;
    hDirection = null;
  }, { passive: true });
  document.addEventListener("touchmove", function (e) {
    if (!hTracking || isOpen) return;
    var dx = e.touches[0].clientX - hsx;
    var dy = Math.abs(e.touches[0].clientY - hsy);

    // Lock direction after 10px of movement
    if (hDirection === null && (Math.abs(dx) > 10 || dy > 10)) {
      hDirection = Math.abs(dx) > dy ? "h" : "v";
    }

    // If locked vertical, abort
    if (hDirection === "v") { hTracking = false; return; }

    // If horizontal and leftward past threshold, open
    if (hDirection === "h" && dx < -30) {
      hTracking = false;
      open("ring");
    }
  }, { passive: true });
  document.addEventListener("touchend", function () { hTracking = false; hDirection = null; });

  // Horizontal scroll to open (desktop trackpad)
  var hWheelAccum = 0;
  var hWheelTimer = null;
  document.addEventListener("wheel", function (e) {
    if (isOpen || !isOnHomePage()) return;
    // Only trigger from hero section
    var hero = document.querySelector('.hero-content');
    if (!hero || !hero.contains(e.target)) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      hWheelAccum += e.deltaX;
      clearTimeout(hWheelTimer);
      hWheelTimer = setTimeout(function () { hWheelAccum = 0; }, 300);
      // Only open on leftward scroll (positive deltaX = scroll left)
      if (hWheelAccum > 50) { hWheelAccum = 0; open("ring"); }
      // Reset if swiping right
      if (hWheelAccum < -10) { hWheelAccum = 0; }
    }
  }, { passive: true });

  // data-scroll-experience triggers
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-scroll-experience]");
    if (t) open(t.getAttribute("data-scroll-experience") || "ring");
  });

  window.addEventListener("resize", function () { if (isOpen) resizeCanvas(); });

  window.scrollExperience = { open: open, close: close };
})();
