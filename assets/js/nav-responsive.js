// Navbar responsiva: toggle menu
const navToggle = document.getElementById('navToggle');
const navList = document.getElementById('navList');
navToggle.addEventListener('click', function () {
  navList.classList.toggle('active');
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !expanded);
});
// Fecha o menu ao clicar em um link (mobile)
navList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 700) {
      navList.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});