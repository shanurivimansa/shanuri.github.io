const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const navAnchors = document.querySelectorAll(".nav-links a");
const revealEls = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("section[id]");
const topbar = document.getElementById("topbar");

function openMenu() {
  if (!menuBtn || !navLinks) return;

  navLinks.classList.add("open");
  menuBtn.classList.add("active");
  menuBtn.setAttribute("aria-expanded", "true");
  document.body.classList.add("menu-open");
}

function closeMenu() {
  if (!menuBtn || !navLinks) return;

  navLinks.classList.remove("open");
  menuBtn.classList.remove("active");
  menuBtn.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

function toggleMenu() {
  if (!navLinks) return;
  navLinks.classList.contains("open") ? closeMenu() : openMenu();
}

function updateHeaderOnScroll() {
  if (!topbar) return;

  if (window.scrollY > 20) {
    topbar.classList.add("scrolled");
  } else {
    topbar.classList.remove("scrolled");
  }
}

function setActiveLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navAnchors.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

if (menuBtn) {
  menuBtn.addEventListener("click", toggleMenu);
}

navAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

document.addEventListener("click", (event) => {
  if (!menuBtn || !navLinks) return;

  const clickedInsideNav = navLinks.contains(event.target);
  const clickedMenuBtn = menuBtn.contains(event.target);

  if (navLinks.classList.contains("open") && !clickedInsideNav && !clickedMenuBtn) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 920) {
    closeMenu();
  }
});

window.addEventListener("scroll", () => {
  updateHeaderOnScroll();
  setActiveLink();
});

window.addEventListener("load", () => {
  updateHeaderOnScroll();
  setActiveLink();
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${index * 0.08}s`;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}
