let audioContext = new AudioContext();

function startLoop(audioBuffer, pan = 1, rate = 1) {
  let sourceNode = audioContext.createBufferSource();
  let pannerNode = audioContext.createStereoPanner();
  sourceNode.buffer = audioBuffer;
  sourceNode.loop = true;
  sourceNode.loopStart = 16.111;
  sourceNode.loopEnd = 24.117;
  sourceNode.playbackRate.value = rate;
  pannerNode.pan.value = pan;
  sourceNode.connect(pannerNode);
  pannerNode.connect(audioContext.destination);
  sourceNode.start(0, 16.111);
}

fetch("assets/sounds/Escape24.mp3")
  .then(function(response) {
    return response.arrayBuffer();
  })
  .then(function(arrayBuffer) {
    return audioContext.decodeAudioData(arrayBuffer);
  })
  .then(function(audioBuffer) {
    const introNode = audioContext.createBufferSource();
    introNode.buffer = audioBuffer;
    introNode.connect(audioContext.destination);
    introNode.start();
    introNode.onended = function() {
      startLoop(audioBuffer, -1);
      startLoop(audioBuffer, 1, 1.002);
    };
  })
  .catch(function(e) {
    return console.error(e);
  });

function setSlide() {
  const first = document.querySelector(".visual");
  const before = document.querySelector(".is-show");

  if (before) {
    before.classList.remove("is-show");

    const next = before.nextElementSibling;
    if (next) {
      next.classList.add("is-show");
    } else {
      first.classList.add("is-show");
    }
  } else {
    first.classList.add("is-show");
  }
}

const slideToggleTarget = document.querySelector(".visuals");
slideToggleTarget.addEventListener("click", setSlide);
