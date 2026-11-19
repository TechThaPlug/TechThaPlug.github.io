"use strict";

/* TECHTHAPLUG — accessible portfolio interactions */
(() => {
  const menuButton = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector("#nav-links");
  const navLinks = document.querySelectorAll("#nav-links a");
  const yearElement = document.querySelector("#current-year");

  // Keep the footer year current without requiring manual edits.
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }

  // Mobile navigation: supports keyboard, outside click and Escape.
  const closeMenu = ({ returnFocus = false } = {}) => {
    if (!menuButton || !navMenu) return;

    navMenu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");

    if (returnFocus) menuButton.focus();
  };

  if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") !== "true";
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu",
      );
      navMenu.classList.toggle("is-open", isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu({ returnFocus: true });
    });

    document.addEventListener("click", (event) => {
      if (
        menuButton.getAttribute("aria-expanded") === "true" &&
        !navMenu.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 680) closeMenu();
    });

    window.addEventListener("pageshow", () => closeMenu());
  }

  // Reveal content as it enters the viewport. The page remains readable
  // when reduced motion is requested or IntersectionObserver is unavailable.
  const revealTargets = document.querySelectorAll(
    ".section-heading, .about-aside, .about-copy, .project-card, .skills-intro, .skill-group, .resume-card, .resume-preview-wrap, .contact-inner",
  );

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (!reduceMotion && "IntersectionObserver" in window) {
    revealTargets.forEach((element) => element.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" },
    );

    revealTargets.forEach((element) => observer.observe(element));
  }
})();
