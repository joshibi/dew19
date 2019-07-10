// A
function toggleBrightness() {
    document.body.classList.toggle('is-inverted');
  };
  
  // B
  const bb = document.querySelector('.brightness-button');
  
  // C
  bb.addEventListener('click', toggleBrightness);