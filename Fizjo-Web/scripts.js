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
