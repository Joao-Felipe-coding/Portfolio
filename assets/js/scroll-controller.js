// Controlador de scroll durante animações
class ScrollController {
  constructor() {
    this.isScrollBlocked = false;
    this.scrollPosition = 0;
    this.touchStartY = 0;
  }

  // Bloqueia todos os tipos de scroll
  blockScroll() {
    if (this.isScrollBlocked) return;
    
    this.isScrollBlocked = true;
    this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Adiciona classe CSS para bloquear scroll
    document.body.classList.add('no-scroll');
    document.body.style.top = `-${this.scrollPosition}px`;
    
    // Previne scroll com mouse wheel e touchpad
    document.addEventListener('wheel', this.preventScroll, { passive: false });
    document.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    document.addEventListener('touchmove', this.preventScroll, { passive: false });
    
    // Previne scroll com teclado (setas, page up/down, space, home, end)
    document.addEventListener('keydown', this.preventScrollKeys, { passive: false });
  }

  // Libera o scroll
  unblockScroll() {
    if (!this.isScrollBlocked) return;
    
    this.isScrollBlocked = false;
    
    // Remove classe CSS e restaura posição
    document.body.classList.remove('no-scroll');
    document.body.style.top = '';
    window.scrollTo(0, this.scrollPosition);
    
    // Remove event listeners
    document.removeEventListener('wheel', this.preventScroll);
    document.removeEventListener('touchstart', this.handleTouchStart);
    document.removeEventListener('touchmove', this.preventScroll);
    document.removeEventListener('keydown', this.preventScrollKeys);
  }

  // Previne scroll via wheel/touchpad/touch
  preventScroll = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  // Captura posição inicial do touch
  handleTouchStart = (e) => {
    this.touchStartY = e.touches[0].clientY;
    e.preventDefault();
    e.stopPropagation();
    return false;
  }

  // Previne scroll via teclado
  preventScrollKeys = (e) => {
    const scrollKeys = [32, 33, 34, 35, 36, 37, 38, 39, 40]; // space, page up/down, end, home, arrows
    if (scrollKeys.includes(e.keyCode)) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }
}

// Instância global do controlador
const scrollController = new ScrollController();

// Inicia o bloqueio quando a página carrega
window.addEventListener('load', () => {
  scrollController.blockScroll();
  
  // Libera o scroll após todas as animações terminarem (5.5s total)
  // homeGreetingFadeIn: 0.5s delay + 1.5s duration = 2s
  // homeNameFadeIn: 2s delay + 1.5s duration = 3.5s  
  // homeRoleFadeIn: 3s delay + 2s duration = 5s
  // mouseFadeIn: 5s delay + 0.5s duration = 5.5s
  setTimeout(() => {
    scrollController.unblockScroll();
  }, 5500); // Libera após 5.5 segundos
});
