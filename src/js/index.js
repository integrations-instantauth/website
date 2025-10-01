// theme script
(function () {
    const THEME_KEY = 'theme';
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    const html = document.documentElement;
    const logo = document.getElementById('siteLogo');
  
    // Helper: update UI (icon, aria, optional logo swap)
    function updateUI(theme) {
  
      const toggleLogo = document.getElementById('toggleLogo');
      if (toggleLogo) {
        toggleLogo.src = theme === 'dark'
          ? 'src/img/toggle-dark.svg'   // shows sun/light icon when dark theme is active
          : 'src/img/toggle-light.svg';   // shows moon/dark icon when light theme is active
      }

      const toggleLogoMobile = document.getElementById('toggleLogoMobile');
      if (toggleLogoMobile) {
        toggleLogoMobile.src = theme === 'dark'
          ? 'src/img/toggle-dark.svg'   // shows sun/light icon when dark theme is active
          : 'src/img/toggle-light.svg';   // shows moon/dark icon when light theme is active
      }
  
      const framebox = document.getElementById('framebox');
      if(framebox){
        framebox.src = theme === 'dark'
          ? 'src/img/frame-box-img.svg'   // dark theme logo
          : 'src/img/frame-light.svg'; // light theme logo
      }
  
  
      if (logo) {
        logo.src = theme === 'dark'
          ? 'src/img/logo-dark.svg'   // dark theme logo
          : 'src/img/logo-light.svg'; // light theme logo
      }
  
      // Partner logos
      document.querySelectorAll('.logos img').forEach(img => {
        const darkSrc = img.getAttribute('data-dark');
        const lightSrc = img.getAttribute('data-light');
        img.src = theme === 'dark' ? darkSrc : lightSrc;
      });
  
    }
  
    // Set theme (attribute + localStorage + update UI)
    function setTheme(theme) {
      if (!theme) return;
      html.setAttribute('data-theme', theme);
      try { localStorage.setItem(THEME_KEY, theme); } catch (e) { }
      updateUI(theme);
    }
  
    // Initialize: read from attribute (we already set it early), fallback to localStorage or system
    function init() {
      const attr = html.getAttribute('data-theme');
      const saved = localStorage.getItem(THEME_KEY);
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = attr || saved || (prefersDark ? 'dark' : 'light');
      setTheme(theme);

      // Learn More smooth scroll
      document.querySelectorAll('[data-scroll-target]')?.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const target = btn.getAttribute('data-scroll-target');
          if (target) {
            const el = document.querySelector(target);
            if (el) {
              e.preventDefault();
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
        });
      });
    }
  
    // Wire up toggles
    function addToggleListener(toggle) {
      if (toggle) {
        toggle.addEventListener('click', () => {
          const current = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
          const next = current === 'dark' ? 'light' : 'dark';
          setTheme(next);
        });
      }
    }

    addToggleListener(themeToggle);
    addToggleListener(themeToggleMobile);
  
    // Init on DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();
  
  
  document.addEventListener("DOMContentLoaded", () => {
  const toggler = document.querySelector(".navbar-toggler");
  const navMenu = document.querySelector(".main-nav");

  toggler.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
});
