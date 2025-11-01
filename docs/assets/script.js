// ===== Menú móvil + año dinámico =====
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

  // Año dinámico en el footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});
