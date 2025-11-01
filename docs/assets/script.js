// Menú móvil + año dinámico + fixes para el popup Fillout
document.addEventListener('DOMContentLoaded', () => {
  // Menú móvil
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Cierra al hacer click en un enlace (mobile)
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Año dinámico
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // ---- FIX popup Fillout ----
  // Evitar navegación del enlace y dejar que Fillout capture el click
  document.querySelectorAll('[data-fillout-open]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      // Si por alguna razón Fillout no capturó aún, reintenta a los 100ms
      setTimeout(() => {
        // no-op: Fillout se encarga al ver el data-fillout-open
      }, 100);
    });
  });

  // Ocultar cualquier botón flotante "Open form" que inyecte Fillout
  const hideFilloutCta = () => {
    document.querySelectorAll(
      '.fillout-embed__popup-button, .fillout-embed__cta, .fillout-popup-button, [class*="fillout"][class*="popup"][class*="button"]'
    ).forEach(el => el.style.display = 'none');
  };
  hideFilloutCta();
  // Observador por si Fillout lo vuelve a insertar
  const obs = new MutationObserver(hideFilloutCta);
  obs.observe(document.body, { childList: true, subtree: true });
});
