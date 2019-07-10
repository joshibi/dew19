let audioContext = new AudioContext();

function startLoop(audioBuffer, pan = 1, rate = 1) {
  let sourceNode = audioContext.createBufferSource();
  let pannerNode = audioContext.createStereoPanner();

  sourceNode.buffer = audioBuffer;
  sourceNode.loop = true;
  sourceNode.loopStart = 69.1;
  sourceNode.loopEnd = 70.8;

  sourceNode.playbackRate.value = rate;
  pannerNode.pan.value = pan;
  sourceNode.connect(pannerNode);
  pannerNode.connect(audioContext.destination);
  sourceNode.start(0, 70.8);
}

// Spektrum memo(これを基準に)
// loopStart 68.10;　←10の部分を調整
// loopEnd 69.10;

// 候補1 loopStart 72.65;
// loopEnd 78.10;

// 候補2 loopStart 68.10;
// loopEnd 69.15;

// 候補3 loopStart 69.1;
// loopEnd 70.8;

//itsgonnarain loopstart 2.98;
//loopend 3.80;

fetch("assets/sounds/spektrum.mp3")
  .then(function(response) {
    return response.arrayBuffer();
  })
  .then(function(arrayBuffer) {
    return audioContext.decodeAudioData(arrayBuffer);
  })
  .then(function(audioBuffer) {
    startLoop(audioBuffer, -1);
    startLoop(audioBuffer, 1, 1.002);
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

setInterval(setSlide, 3500);

console.log("0!");
