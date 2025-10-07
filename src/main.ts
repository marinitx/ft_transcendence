const app = document.getElementById("app");

async function loadView(view: string) {
  if (!app) return;

  const response = await fetch(`./src/views/${view}.html`);
  const html = await response.text();
  app.innerHTML = html;

  // Ejecutar scripts específicos según la vista
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

  gameLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      const color = link.getAttribute('data-color') || '#ffffff';
      const text = link.getAttribute('data-text') || '';
      
      bottomBar.style.backgroundColor = color;
      bottomBar.style.opacity = '0.8';
      
      dynamicText.textContent = text;
      dynamicText.style.color = color;
      mainText.style.transform = 'translateY(-20px)';
      dynamicText.style.transform = 'translateY(-20px)';
      dynamicText.style.opacity = '1';
    });

    link.addEventListener('mouseleave', () => {
      bottomBar.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
      bottomBar.style.opacity = '0.4';
      
      mainText.style.transform = 'translateY(0px)';
      dynamicText.style.transform = 'translateY(48px)';
      dynamicText.style.color = '#F5F5F5';
      dynamicText.style.opacity = '0';
      dynamicText.textContent = '';
    });
  });
}

// Hash routing
window.addEventListener("hashchange", () => {
  const view = location.hash.replace("#", "") || "home";
  loadView(view);
});

// Inicializar con la vista correcta
const initialView = location.hash.replace("#", "") || "home";
loadView(initialView);

