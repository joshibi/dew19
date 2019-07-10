function toggleBrightness() {
    document.body.classList.toggle('is-inverted');
  };
  const bb = document.querySelector('.brightness-button');
  
  bb.addEventListener('click', toggleBrightness);