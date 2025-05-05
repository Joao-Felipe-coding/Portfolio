// Alternância de tema dark/light
const btn = document.getElementById('themeToggleBtn');
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}
btn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'light' ? 'dark' : 'light');
});

// Inicialização padrão
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(prefersDarkScheme ? 'dark' : 'light');
