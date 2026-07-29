const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  // Keep the ARIA state in sync with the visual state — screen reader
  // users rely on aria-expanded to know whether the menu is open.
  navToggle.setAttribute("aria-expanded", String(isOpen));
});