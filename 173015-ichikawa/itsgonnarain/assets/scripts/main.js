let audioContext = new AudioContext();

function startLoop(audioBuffer){
  let sourceNode = audioContext.createBufferSource();
  sourceNode.buffer = audioBuffer;
  sourceNode.loop = true;
  sourceNode.loopStart = 2.98
  sourceNode.loopEnd = 3.80
  sourceNode.connect(audioContext.destination);
  sourceNode.start(0, 2.98);
}
fetch('assets/sounds/itsgonnarain.mp3')
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