let audioContext = new AudioContext();

function startLoop(audioBuffer, pan, rate) {
    let sourceNode = audioContext.createBufferSource();
    let pannerNode = audioContext.createStereoPanner();

    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;
    sourceNode.loopStart = 2.98;
    sourceNode.loopEnd = 3.80;

    // 再生速度を指定
    sourceNode.playbackRate.value = rate;

    pannerNode.pan.value = pan;

    sourceNode.connect(pannerNode);
    sourceNode.connect(audioContext.destination);
    sourceNode.start(0, 2.98);
  }

  fetch('assets/sounds/itsgonnarain.mp3')
  .then(function(response){
    return response.arrayBuffer();
  })
  .then(function(arrayBuffer){
    return audioContext.decodeAudioData(arrayBuffer);
  })
  .then(function(audioBuffer){
    startLoop(audioBuffer, -1, 1);
    startLoop(audioBuffer, 1, 1.002);
  })
  .catch(function(e) {
    return console.error(e);
  });