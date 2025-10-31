// Menú móvil + año dinámico en el footer
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');

  if (btn && nav) {
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // Cierra el menú cuando se hace clic en un enlace (en móvil)
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Año dinámico en el footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});
