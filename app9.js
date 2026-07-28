// ============================================================
// MODULE 9 DEMO — app9.js
// Three small, focused behaviours matching the lecture:
//   1. Responsive nav toggle (Section 3)
//   2. Accessible ARIA dropdown (Section 4)
//   3. Accessible form feedback with aria-live (Section 4)
// ============================================================

// ---------- 1. Responsive nav toggle ----------
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  // Keep the ARIA state in sync with the visual state — screen reader
  // users rely on aria-expanded to know whether the menu is open.
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// ---------- 2. Accessible ARIA dropdown ----------
const filterBtn = document.getElementById("filterBtn");
const filterMenu = document.getElementById("filterMenu");

function openFilterMenu() {
  filterMenu.hidden = false;
  filterBtn.setAttribute("aria-expanded", "true");
}
function closeFilterMenu() {
  filterMenu.hidden = true;
  filterBtn.setAttribute("aria-expanded", "false");
}

filterBtn.addEventListener("click", () => {
  const isOpen = filterBtn.getAttribute("aria-expanded") === "true";
  isOpen ? closeFilterMenu() : openFilterMenu();
});

// Close the menu on Escape — a keyboard user expects this everywhere
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeFilterMenu();
});

// Close the menu when clicking anywhere outside it
document.addEventListener("click", (e) => {
  if (!filterBtn.contains(e.target) && !filterMenu.contains(e.target)) {
    closeFilterMenu();
  }
});

// ---------- 3. Accessible form feedback ----------
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  formStatus.classList.remove("success", "error");

  if (!name || !email || !message) {
    // role="status" + aria-live="polite" on this element (set in the HTML)
    // means screen readers announce this message automatically —
    // no extra JS needed to move focus or trigger an alert.
    formStatus.textContent = "Please fill in every field before sending.";
    formStatus.classList.add("error");
    return;
  }

  formStatus.textContent = "Thanks, " + name + " — your message has been sent.";
  formStatus.classList.add("success");
  contactForm.reset();
});
