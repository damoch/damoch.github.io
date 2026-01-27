(() => {
  const header = document.querySelector(".site-header");
  const btn = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector("#mobileNav");

  if (!header || !btn || !mobileNav) return;

  const closeMenu = () => {
    header.dataset.menuOpen = "false";
    btn.setAttribute("aria-expanded", "false");
  };

  const toggleMenu = () => {
    const isOpen = header.dataset.menuOpen === "true";
    header.dataset.menuOpen = isOpen ? "false" : "true";
    btn.setAttribute("aria-expanded", String(!isOpen));
  };

  btn.addEventListener("click", toggleMenu);

  // Close after clicking a link
  mobileNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();

(function () {
  const STORAGE_KEY = "fizjolife_cookie_consent_v1";

  const banner = document.getElementById("cookieBanner");
  const modal = document.getElementById("cookieModal");

  const btnAccept = document.getElementById("cookieAccept");
  const btnReject = document.getElementById("cookieReject");
  const btnSettings = document.getElementById("cookieSettings");
  const btnClose = document.getElementById("cookieClose");
  const btnSave = document.getElementById("cookieSave");

  const toggleExternal = document.getElementById("cookieExternal");
  const openCookieSettings = document.getElementById("openCookieSettings");

  function readConsent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function writeConsent(consent) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  }

  function applyExternalEmbeds(enabled) {
    document.querySelectorAll('iframe[data-cookiecategory="external"]').forEach((iframe) => {
      const desired = iframe.getAttribute("data-src") || "";
      if (enabled) {
        iframe.src = desired;
      } else {
        // Unload external content
        iframe.src = "about:blank";
      }
    });
  }

  function showBanner() {
    if (banner) {
      if (banner.style.display !== 'none') {
        return;
      }
      banner.style.display = '';
    }
  }

  function hideBanner() {
    if (banner) banner.style.display = 'none';
  }

  function openModal() {
    if (!modal) return;
    modal.style.display = '';
    // sync UI with stored consent
    const consent = readConsent();
    toggleExternal.checked = !!(consent && consent.external);
  }

  function closeModal() {
    if (modal) modal.style.display = 'none';
  }

  function setConsent(consent) {
    writeConsent(consent);
    applyExternalEmbeds(!!consent.external);
    hideBanner();
    closeModal();
  }

  // Initial load
  closeModal();
  const existing = readConsent();
  if (!existing) {
    // Default: only necessary, no external
    applyExternalEmbeds(false);
    showBanner();
  } else {
    applyExternalEmbeds(!!existing.external);
    hideBanner();
    closeModal();
  }

  // Buttons
  btnAccept && btnAccept.addEventListener("click", function () {
    setConsent({ necessary: true, external: true, ts: Date.now() });
  });

  btnReject && btnReject.addEventListener("click", function () {
    setConsent({ necessary: true, external: false, ts: Date.now() });
  });

  btnSettings && btnSettings.addEventListener("click", function () {
    openModal();
  });

  btnClose && btnClose.addEventListener("click", function () {
    closeModal();
  });

  btnSave && btnSave.addEventListener("click", function () {
    setConsent({ necessary: true, external: !!toggleExternal.checked, ts: Date.now() });
  });

  // Footer link: open settings anytime
  openCookieSettings && openCookieSettings.addEventListener("click", function (e) {
    e.preventDefault();
    // show banner so user sees context
    openModal();
  });

  // Click outside modal card closes it
  modal && modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  });

  // ESC closes modal
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && !modal.hidden) closeModal();
  });
})();

