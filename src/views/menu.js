export function init() {
  const gameLinks = document.querySelectorAll('.game-link');
  const infoText = document.getElementById('info-text');
  const bottomBar = document.getElementById('bottom-bar');

  if (!infoText || !bottomBar || gameLinks.length === 0) {
      console.error("Error: Algunos elementos clave (IDs o clases) no se encontraron en el DOM.");
      return;
  }

  const originalText = infoText.getAttribute('data-original-text');
  //usar la clase que está en el html
  const defaultColorClass = 'bg-white/40'; 

  //función para manejar el hover (mouseover)
  const handleMouseOver = (event) => {
    const link = event.currentTarget;
    const newText = link.getAttribute('data-text');
    const newColor = link.getAttribute('data-color');

    //1 cambiar texto
    infoText.textContent = newText;

    //2 cambiar color de la barra
    bottomBar.classList.remove(defaultColorClass);
    bottomBar.classList.add(newColor);
  };

  //manejar el leave del ratón
  const handleMouseOut = (event) => {
    const link = event.currentTarget;
    const hoverColor = link.getAttribute('data-color');

    //restaurar texto
    infoText.textContent = originalText;

    //restaurar color blanco de la barra
    bottomBar.classList.remove(hoverColor);
    bottomBar.classList.add(defaultColorClass);
  };

  //asignar eventos
  gameLinks.forEach(link => {
    link.addEventListener('mouseover', handleMouseOver);
    link.addEventListener('mouseout', handleMouseOut);
  });
}


