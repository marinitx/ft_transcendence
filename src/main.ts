const app = document.getElementById("app");
let activeLink: HTMLAnchorElement | null = null;

async function loadView(view: string) {
  if (!app) return;

  const response = await fetch(`./src/views/${view}.html`);
  const html = await response.text();
  app.innerHTML = html;

  if (view === "menu") {
    initMenuScript();
  }
}

function initMenuScript() {
  const gameLinks = document.querySelectorAll('.game-link');
  const bottomBar = document.getElementById('bottom-bar');
  const mainText = document.getElementById('main-text');
  const dynamicText = document.getElementById('dynamic-text');
  const backBtn = document.getElementById('back-btn');

  if (!gameLinks.length || !bottomBar || !mainText || !dynamicText || !backBtn) return;

  backBtn.addEventListener('click', () => {
    window.history.back();
  });

  const isMobile = () => window.innerWidth < 768;

  gameLinks.forEach(link => {
    // Para desktop: usar hover
    if (!isMobile()) {
      link.addEventListener('mouseenter', () => {
        activateLink(link as HTMLAnchorElement);
      });

      link.addEventListener('mouseleave', () => {
        deactivateLink();
      });
    } else {
      // Para móvil: usar click
      link.addEventListener('click', (e) => {
        if (activeLink === link) {
          // Segundo click: navegar
          return;
        } else {
          // Primer click: mostrar efecto
          e.preventDefault();
          
          if (activeLink) {
            deactivateLink();
          }
          
          activateLink(link as HTMLAnchorElement);
        }
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

// Inicializar con la vista correcta
const initialView = location.hash.replace("#", "") || "home";
loadView(initialView);
