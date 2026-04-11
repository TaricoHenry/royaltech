(function () {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const mobileQuery = window.matchMedia("(max-width: 980px)");

  function syncHeaderState() {
    if (!header) {
      return;
    }

    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  function setMenuState(isOpen) {
    if (!header || !navToggle) {
      return;
    }

    header.classList.toggle("is-menu-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen && mobileQuery.matches);
  }

  function closeMenu() {
    setMenuState(false);
  }

  function scrollToTarget(target) {
    const headerOffset = header ? header.offsetHeight + 12 : 0;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(targetTop, 0),
      behavior: "smooth"
    });
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      const isOpen = header ? header.classList.contains("is-menu-open") : false;
      setMenuState(!isOpen);
    });
  }

  anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const href = link.getAttribute("href");
      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      scrollToTarget(target);
      history.replaceState(null, "", href);
      closeMenu();
    });
  });

  document.addEventListener("click", function (event) {
    if (!header || !navToggle || !mobileQuery.matches) {
      return;
    }

    if (!header.classList.contains("is-menu-open")) {
      return;
    }

    if (header.contains(event.target)) {
      return;
    }

    closeMenu();
  });

  window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", function () {
    if (!mobileQuery.matches) {
      closeMenu();
    }
  });

  syncHeaderState();
  window.addEventListener("scroll", syncHeaderState, { passive: true });
})();
