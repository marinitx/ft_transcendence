// src/js/scare-animation.js
document.addEventListener("DOMContentLoaded", () => {
  const face = document.getElementById("face");
  const hand = document.getElementById("hand");
  if (!face || !hand) return;

  const show = (el) => {
    el.classList.remove("opacity-0");
    el.classList.add("opacity-100");
  };
  const hide = (el) => {
    el.classList.add("opacity-0");
    el.classList.remove("opacity-100");
  };

  // asegúrate de que empiezan ocultas
  hide(face);
  hide(hand);

  let visible = false;
  setInterval(() => {
    visible = !visible;
    if (visible) {
      show(face);
      show(hand);
    } else {
      hide(face);
      hide(hand);
    }
  }, 2000); // 2s on / 2s off
});
