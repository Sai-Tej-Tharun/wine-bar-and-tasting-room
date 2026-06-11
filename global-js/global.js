const rtlToggle = document.getElementById("rtlToggle");
const rtlLabel = document.getElementById("rtlLabel");

function updateRTLLabel() {
  if (document.documentElement.dir === "rtl") {
    rtlLabel.textContent = "RTL";
  } else {
    rtlLabel.textContent = "LTR";
  }
}

// toggle direction
rtlToggle?.addEventListener("click", () => {
  const html = document.documentElement;

  if (html.getAttribute("dir") === "rtl") {
    html.setAttribute("dir", "ltr");
    localStorage.setItem("dir", "ltr");
  } else {
    html.setAttribute("dir", "rtl");
    localStorage.setItem("dir", "rtl");
  }

  updateRTLLabel(); // update after toggle
});

// initial load
updateRTLLabel();
/* =========================
   CLOSE MOBILE MENU ON LINK CLICK
========================= */

const mobileLinks = document.querySelectorAll(".mobile-menu .mob-link");

mobileLinks.forEach(link => {
  link.addEventListener("click", () => {

    mobileMenu.classList.remove("active");
    navBurger.classList.remove("active");

    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");

  });
});