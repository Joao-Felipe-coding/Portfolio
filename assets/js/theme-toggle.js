// Alternância de tema dark/light
const btn = document.getElementById('themeToggleBtn');

// Função para atualizar a theme-color do navegador
function updateThemeColor(theme) {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  const metaAppleStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  
  // Cores baseadas nas variáveis CSS do seu tema
  const colors = {
    dark: '#292929',  // --d-bg do tema dark
    light: '#f0efef'  // --d-bg do tema light
  };
  
  const color = colors[theme] || colors.dark;
  
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', color);
  }
  
  if (metaAppleStatusBar) {
    metaAppleStatusBar.setAttribute('content', color);
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeColor(theme);
}

btn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'light' ? 'dark' : 'light');
});

// Inicialização padrão
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = prefersDarkScheme ? 'dark' : 'light';
setTheme(initialTheme);

// Listener para mudanças automáticas do tema do sistema
window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', (e) => {
  const newTheme = e.matches ? 'dark' : 'light';
  setTheme(newTheme);
});
