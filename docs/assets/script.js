// ===== Menú móvil + año dinámico + popup Fillout con fallback =====
document.addEventListener('DOMContentLoaded', () => {
  // Menú móvil
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
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

  // ===== Fillout Popup: open + fallback =====
  const FORM_ID = 'ng2f4KphPKus';
  const HOSTED_URL = `https://forms.fillout.com/t/${FORM_ID}`;

  // Oculta cualquier "Open form" flotante que inyecte Fillout
  const hideFilloutCta = () => {
    document.querySelectorAll(
      '.fillout-embed__popup-button, .fillout-embed__cta, .fillout-popup-button, [class*="fillout"][class*="popup"][class*="button"]'
    ).forEach(el => {
      el.style.display = 'none';
      el.setAttribute('aria-hidden', 'true');
    });
  };
  hideFilloutCta();
  const obs = new MutationObserver(hideFilloutCta);
  obs.observe(document.body, { childList: true, subtree: true });

  // Intento de apertura del popup con fallback a la URL hospedada
  const openWithFallback = (e) => {
    if (e) e.preventDefault();
    // 1) Intento nativo (el atributo data-fillout-open debería ser suficiente)
    // 2) Si en ~400ms no aparece overlay de Fillout, hago fallback
    let opened = false;

    // Heurística: buscar un overlay de Fillout cuando se abre
    const checkOpened = () => {
      const overlay = document.querySelector('[class*="fillout"][class*="overlay"], .fillout-embed__modal, .fillout-embed__container');
      if (overlay && overlay.offsetParent !== null) {
        opened = true;
      }
    };

    // Lanzamos un par de chequeos rápidos
    setTimeout(checkOpened, 150);
    setTimeout(() => {
      checkOpened();
      if (!opened) {
        // Fallback: abrir el formulario hospedado en nueva pestaña
        window.open(HOSTED_URL, '_blank', 'noopener');
      }
    }, 420);
  };

  // Vincular a todos los gatillos de apertura
  document.querySelectorAll('[data-fillout-open]').forEach(el => {
    el.addEventListener('click', openWithFallback);
  });
});
