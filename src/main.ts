const app = document.getElementById("app");
let activeLink: HTMLAnchorElement | null = null;
let selectedGame: string | null = null;

async function loadView(view: string) {
  if (!app) return;

  const response = await fetch(`./src/views/${view}.html`);
  const html = await response.text();
  app.innerHTML = html;

  if (view === "menu") {
    initMenuScript();
  } else if (view === "transition") {
    initTransition();
  }
}

//this is for the "loading" page transition
function initTransition() {
  setTimeout(() => {
    if (selectedGame) {
      location.hash = selectedGame;
      selectedGame = null;
    } else {
      location.hash = "menu";
    }
  }, 7000);
}

function initMenuScript() {
  const gameLinks = document.querySelectorAll('.game-link');
  const bottomBar = document.getElementById('bottom-bar');
  const mainText = document.getElementById('main-text');
  const dynamicText = document.getElementById('dynamic-text');
  const backBtn = document.getElementById('back-btn');

  if (!gameLinks.length || !bottomBar || !mainText || !dynamicText || !backBtn) return;

  backBtn.addEventListener('click', () => {
    window.location.hash = 'home';
  });

  const isMobile = () => window.innerWidth < 768;

  gameLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const gameHash = link.getAttribute('href')?.replace('#', '') || 'game';
      selectedGame = gameHash;
      location.hash = 'transition';
    });

    //mantener hover solo en desktop
    if (!isMobile()) {
      link.addEventListener('mouseenter', () => {
        activateLink(link as HTMLAnchorElement);
      });

      link.addEventListener('mouseleave', () => {
        deactivateLink();
      });
    }
  });

  function activateLink(link: HTMLAnchorElement) {
    const color = link.getAttribute('data-color') || '#ffffff';
    const text = link.getAttribute('data-text') || '';
    
    bottomBar!.style.backgroundColor = color;
    bottomBar!.style.opacity = '0.8';
    
    dynamicText!.textContent = text;
    dynamicText!.style.color = color;
    mainText!.style.transform = 'translateY(-20px)';
    dynamicText!.style.transform = 'translateY(-20px)';
    dynamicText!.style.opacity = '1';
    
    link.style.transform = 'scale(1.25)';
    link.style.filter = 'brightness(1.25)';
    
    activeLink = link;
  }

  function deactivateLink() {
    if (!activeLink) return;

    bottomBar!.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
    bottomBar!.style.opacity = '0.4';
    
    mainText!.style.transform = 'translateY(0px)';
    dynamicText!.style.transform = 'translateY(48px)';
    dynamicText!.style.opacity = '0';
    dynamicText!.style.color = '#F5F5F5';
    dynamicText!.textContent = '';
    
    activeLink.style.transform = 'scale(1)';
    activeLink.style.filter = 'brightness(0.9)';
    
    activeLink = null;
  }
}

// Hash routing
window.addEventListener("hashchange", () => {
  const view = location.hash.replace("#", "") || "home";
  loadView(view);
});

//inicializar con la vista correcta
const initialView = location.hash.replace("#", "") || "home";
loadView(initialView);


// ==== SCARE ANIMATION (simple: random + mini apagón) ====

class ScareAnimator {
  private face: HTMLElement | null = null;
  private hand: HTMLElement | null = null;
  private section: HTMLElement | null = null;
  private timers: number[] = [];

  attach(face: HTMLElement, hand: HTMLElement, section: HTMLElement) {
    this.detach();
    this.face = face;
    this.hand = hand;
    this.section = section;

    // asegurar que empiezan ocultas y con transición
    [this.face, this.hand].forEach(el => {
      if (!el) return;
      el.classList.add('transition-opacity', 'duration-300', 'opacity-0');
      el.classList.remove('opacity-100');
    });

    this.loop();
  }

  detach() {
    this.timers.forEach(t => clearTimeout(t));
    this.timers = [];
    this.setVisible(false);
    if (this.section) this.section.style.filter = '';
    this.face = null;
    this.hand = null;
    this.section = null;
  }

  private setVisible(v: boolean) {
    const action = (el: HTMLElement | null) => {
      if (!el) return;
      if (v) { el.classList.remove('opacity-0'); el.classList.add('opacity-100'); }
      else   { el.classList.add('opacity-0');    el.classList.remove('opacity-100'); }
    };
    action(this.face);
    action(this.hand);
  }

  private flash() { // mini “apagón” muy simple
    if (!this.section) return;
    const prev = this.section.style.filter;
    this.section.style.filter = 'brightness(0.2)';
    const t = window.setTimeout(() => { if (this.section) this.section.style.filter = prev; }, 750);
    this.timers.push(t);
  }

  private rand(msMin: number, msMax: number) {
    return Math.floor(Math.random() * (msMax - msMin + 1)) + msMin;
  }

  private loop() {
    // esperar oculto un tiempo aleatorio (3–9s)
    const wait = this.rand(3000, 9000);
    const t1 = window.setTimeout(() => {
      // aparecer + efecto
      this.flash();
      flashOverlayEffect();
      this.setVisible(true);

      // ocultar a los 3s y repetir
      const t2 = window.setTimeout(() => {
        flashOverlayEffect();
        this.setVisible(false);
        this.loop();
      }, 900);

      this.timers.push(t2);
    }, wait);

    this.timers.push(t1);
  }
}

const scare = new ScareAnimator();

function scanAndInitScare() {
  const app = document.getElementById('app');
  if (!app) return;

  const section = app.querySelector<HTMLElement>('section[data-scare="true"]');
  const face = section?.querySelector<HTMLElement>('#face') ?? null;
  const hand = section?.querySelector<HTMLElement>('#hand') ?? null;

  if (section && face && hand) {
    scare.attach(face, hand, section);
  } else {
    scare.detach();
  }
}

// reacciona a cambios de vista inyectados en #app
const appForObserver = document.getElementById('app');
if (appForObserver) {
  const observer = new MutationObserver(() => scanAndInitScare());
  observer.observe(appForObserver, { childList: true, subtree: true });
  scanAndInitScare();
}

window.addEventListener('hashchange', () => setTimeout(scanAndInitScare, 0));


// === PEQUEÑO EFECTO OVERLAY PARA EL APAGÓN ===
function flashOverlayEffect() {
  const section = document.querySelector('section[data-scare="true"]');
  if (!section) return;

  section.classList.remove('flash-contrast');
  // reinicia la animación forzando reflow
  // @ts-ignore
  void section.offsetWidth;
  section.classList.add('flash-contrast');

  const onEnd = () => {
    section.classList.remove('flash-contrast');
    section.removeEventListener('animationend', onEnd);
  };
  section.addEventListener('animationend', onEnd);
}

