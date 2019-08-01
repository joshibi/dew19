let audioContext = new AudioContext();

function startLoop(audioBuffer, pan = 0, rate = 1) {
  let sourceNode = audioContext.createBufferSource();
  let pannerNode = audioContext.createStereoPanner();

  sourceNode.buffer = audioBuffer;
  sourceNode.loop = true;
  sourceNode.loopStart = 2.98;
  sourceNode.loopEnd = 5.0;

  sourceNode.playbackRate.value = rate;
  pannerNode.pan.value = pan;
  sourceNode.connect(pannerNode);
  pannerNode.connect(audioContext.destination);
  sourceNode.start(0, 2.98);
}

fetch('assets/sounds/02_Tristan.mp3')
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
}
const slideToggleTarget = document.querySelector('.visuals');
slideToggleTarget.addEventListener('click', setSlide);

