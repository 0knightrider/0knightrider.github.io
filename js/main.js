/**
 * Muhammad Ruhan Haq — portfolio interactions.
 * Each feature lives in its own small init function; nothing here needs a build step.
 */
(function () {
  "use strict";

  var EMAIL = "mxh2214@miami.edu";
  var root = document.documentElement;

  /* ---------- Theme toggle (follows the OS until the visitor picks one) ---------- */
  function initTheme() {
    var toggle = document.getElementById("theme-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      if (!current) {
        current = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
      }
      var next = current === "light" ? "dark" : "light";
      root.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* Storage can be unavailable in private windows; the toggle still works. */
      }
    });
  }

  /* ---------- Mobile menu ---------- */
  function initMenu() {
    var toggle = document.getElementById("nav-toggle");
    var links = document.getElementById("nav-links");
    if (!toggle || !links) return;

    function setOpen(open) {
      links.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }

    toggle.addEventListener("click", function () {
      setOpen(!links.classList.contains("is-open"));
    });
    links.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setOpen(false);
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) setOpen(false);
    });
  }

  /* ---------- Navbar border + active section highlighting ---------- */
  function initScrollSpy() {
    var nav = document.querySelector(".nav");
    var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
    var sections = navLinks
      .map(function (link) {
        return document.querySelector(link.getAttribute("href"));
      })
      .filter(Boolean);

    function update() {
      if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 8);

      // The active section is the last one whose top has passed the reading line.
      var line = window.scrollY + window.innerHeight * 0.35;
      var activeId = sections.length ? sections[0].id : "";
      sections.forEach(function (section) {
        if (section.offsetTop <= line) activeId = section.id;
      });
      // At the very bottom of the page, the last section wins.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4 && sections.length) {
        activeId = sections[sections.length - 1].id;
      }

      navLinks.forEach(function (link) {
        var isActive = link.getAttribute("href") === "#" + activeId;
        link.classList.toggle("is-active", isActive);
        if (isActive) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    }

    var ticking = false;
    window.addEventListener(
      "scroll",
      function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
          update();
          ticking = false;
        });
      },
      { passive: true }
    );
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- Reveal-on-scroll ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) return; // content stays visible

    root.classList.add("js");
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  /* ---------- Copy email + toast ---------- */
  var toastTimer;
  function showToast(message) {
    var toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 2000);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback for older browsers and non-HTTPS previews.
    return new Promise(function (resolve, reject) {
      var field = document.createElement("textarea");
      field.value = text;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      var ok = false;
      try {
        ok = document.execCommand("copy");
      } catch (e) {
        ok = false;
      }
      document.body.removeChild(field);
      if (ok) resolve();
      else reject(new Error("Copy failed"));
    });
  }

  function initCopyEmail() {
    document.querySelectorAll("[data-copy-email]").forEach(function (button) {
      button.addEventListener("click", function () {
        copyText(EMAIL).then(
          function () {
            showToast("Copied!");
          },
          function () {
            showToast(EMAIL);
          }
        );
      });
    });
  }

  /* ---------- Headshot fallback (shows the MRH monogram if the image is missing) ---------- */
  function initHeadshot() {
    var img = document.getElementById("headshot");
    if (!img) return;
    var frame = img.closest(".photo");

    function markMissing() {
      frame.classList.add("is-missing");
    }
    if (img.complete && img.naturalWidth === 0) markMissing();
    img.addEventListener("error", markMissing);
  }

  initTheme();
  initMenu();
  initScrollSpy();
  initReveal();
  initCopyEmail();
  initHeadshot();
})();
