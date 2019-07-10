let audioContext = new AudioContext();

function startLoop(audioBuffer, pan = 0, rate = 1) {
  let sourceNode = audioContext.createBufferSource();
  let pannerNode = audioContext.createStereoPanner();

  sourceNode.buffer = audioBuffer;
  sourceNode.loop = true;
  sourceNode.loopStart = 0.00;
  sourceNode.loopEnd = 0.70;

  sourceNode.playbackRate.value = rate;
  pannerNode.pan.value = pan;
  sourceNode.connect(pannerNode);
  pannerNode.connect(audioContext.destination);
  sourceNode.start(0, 2.98);
}

fetch('assets/sounds/CS_ArpNoo135D-03.mp3')
  .then(function (response) {
    return response.arrayBuffer();
  })
  .then(function (arrayBuffer) {
    return audioContext.decodeAudioData(arrayBuffer);
  })
  .then(function (audioBuffer) {
    startLoop(audioBuffer, -1);
    startLoop(audioBuffer, 1, 1.002);
  })
  .catch(function (e) {
    return console.error(e);
  });

function setTitle() {
  const titles = document.querySelector('.titles');
  const title = document.querySelector('.is-show');
  const data = title.getAttribute('data-title');
  titles.innerHTML = data;
}

function setSlide() {
  const first = document.querySelector('.visual');
  const before = document.querySelector('.is-show');
  if (before) {
    before.classList.remove('is-show');
    const next = before.nextElementSibling;
    if (next) {
      next.classList.add('is-show');
    } else {
      first.classList.add('is-show');  
    }
  } else {
    first.classList.add('is-show');
  }
  setTitle();
}

setInterval(setSlide, 10000);
setTitle();