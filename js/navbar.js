// NAVBAR
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const overlay = document.querySelector(".menu-overlay");
  const closeTargets = document.querySelectorAll("[data-menu-close]");

  if (!header || !toggle || !mobileMenu || !overlay) return;

  const openMenu = () => {
    header.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    overlay.hidden = false;
    mobileMenu.hidden = false;

    const firstLink = mobileMenu.querySelector("a, button");
    firstLink?.focus();
  };

  const closeMenu = () => {
    header.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    overlay.hidden = true;
    mobileMenu.hidden = true;
    toggle.focus();
  };

  const isOpen = () => header.classList.contains("is-open");

  // Toggle botón hamburguesa
  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    isOpen() ? closeMenu() : openMenu();
  });

  // Click en overlay
  overlay.addEventListener("click", closeMenu);

  // Click en elementos marcados
  closeTargets.forEach((el) => el.addEventListener("click", closeMenu));

  // ✅ NUEVO: cerrar si clickean cualquier anchor interno (#seccion)
  mobileMenu.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    closeMenu();

    // ✅ NUEVO: scroll suave + offset para sticky header (sin cortar títulos)
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const headerHeight = header.offsetHeight || 72;
    const y =
      target.getBoundingClientRect().top + window.scrollY - (headerHeight + 16);

    window.scrollTo({ top: y, behavior: "smooth" });
  });

  // Click afuera real
  document.addEventListener("click", (e) => {
    if (!isOpen()) return;

    const clickedInsideMenu =
      mobileMenu.contains(e.target) || toggle.contains(e.target);

    if (!clickedInsideMenu) closeMenu();
  });

  // Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) closeMenu();
  });

  // Resize → cierra si pasa a desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900 && isOpen()) closeMenu();
  });
});

//CARDS TRAINING
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".training-toggle");
  if (!btn) return;

  const id = btn.getAttribute("aria-controls");
  const box = document.getElementById(id);
  if (!box) return;

  const isOpen = btn.getAttribute("aria-expanded") === "true";

  btn.setAttribute("aria-expanded", String(!isOpen));
  box.classList.toggle("is-open", !isOpen);
  btn.textContent = isOpen ? "Ver más" : "Ver menos";
});
