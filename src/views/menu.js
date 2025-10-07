// menu.js

export function init() {
  const gameLinks = document.querySelectorAll('.game-link');
  const infoText = document.getElementById('info-text');
  const bottomBar = document.getElementById('bottom-bar');

  // 1. Verificación Crítica de Existencia
  if (!infoText || !bottomBar || gameLinks.length === 0) {
      console.error("Error: Algunos elementos clave (IDs o clases) no se encontraron en el DOM.");
      return;
  }

  const originalText = infoText.getAttribute('data-original-text');
  // 💡 USAR LA CLASE QUE ESTÁ EN EL HTML
  const defaultColorClass = 'bg-white/40'; 

  // Función para manejar el HOVER (mouseover)
  const handleMouseOver = (event) => {
    const link = event.currentTarget;
    const newText = link.getAttribute('data-text');
    const newColor = link.getAttribute('data-color');

    // 1. Cambiar Texto
    infoText.textContent = newText;

    // 2. Cambiar Color de la Barra
    bottomBar.classList.remove(defaultColorClass);
    bottomBar.classList.add(newColor);
  };

  // Función para manejar el LEAVE (mouseout)
  const handleMouseOut = (event) => {
    const link = event.currentTarget;
    const hoverColor = link.getAttribute('data-color');

    // 1. Restaurar Texto
    infoText.textContent = originalText;

    // 2. Restaurar Color de la Barra
    bottomBar.classList.remove(hoverColor);
    bottomBar.classList.add(defaultColorClass);
  };

  // Asignar los eventos
  gameLinks.forEach(link => {
    link.addEventListener('mouseover', handleMouseOver);
    link.addEventListener('mouseout', handleMouseOut);
  });
}
