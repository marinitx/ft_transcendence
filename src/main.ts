const app = document.getElementById("app");

async function loadView(view: string) {
  if (!app) return;

  const response = await fetch(`./src/views/${view}.html`);
  const html = await response.text();
  app.innerHTML = html;
}

// Hash routing
window.addEventListener("hashchange", () => {
  const view = location.hash.replace("#", "") || "home";
  loadView(view);
});

// Inicializar con la vista correcta
const initialView = location.hash.replace("#", "") || "home";
loadView(initialView);
