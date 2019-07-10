let audioContext = new AudioContext();

function startLoop(audioBuffer,pan=0, rate=1){
    let sourceNode = audioContext.createBufferSource();
    let pannerNode = audioContext.createStereoPanner();
   
    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;
    sourceNode.loopStart = 6.555;
    sourceNode.loopEnd = 8.200; 
    sourceNode.playbackRate.value = rate;
    pannerNode.pan.value = pan;

    sourceNode.connect(pannerNode);
    sourceNode.connect(audioContext.destination);
    sourceNode.start(0,1.0);
}

fetch('assets/sounds/ongen.mp3')
.then(function(response) {
  return response.arrayBuffer();
})
.then(function(arrayBuffer){
  return audioContext.decodeAudioData(arrayBuffer);
})
.then(function(audioBuffer) {
 startLoop(audioBuffer, -1);
 startLoop(audioBuffer, 1, 1.002);
})

.catch(function(e){
    return console.error(e);
});