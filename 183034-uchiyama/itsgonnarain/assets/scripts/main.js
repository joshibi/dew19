let audioContext= new AudioContext();
function startLoop(audioBuffer, pan=0, rate=1){
    let sourceNode = audioContext.createBufferSource();

    let pannerNode = audioContext.createStereoPanner();

  sourceNode.buffer = audioBuffer;
  sourceNode.loop = true;
  sourceNode.loopStart = 2.98;
  sourceNode.loopEnd = 3.80;

 sourceNode.playbackRate.value = rate;
  pannerNode.pan.value=pan;

  sourceNode.connect(pannerNode);

  pannerNode.connect(audioContext.destination); 

  sourceNode.start(0,2.98);
}

fetch('assets/sounds/itsgonnarain.mp3')
.then(function(response){
    return response.arrayBuffer();
})

.then(function(arrayBuffer){
    return audioContext.decodeAudioData(arrayBuffer);
})
.then(function(audioBuffer){

   // startLoop(audioBuffer,-1,1);//
   // startLoop(audioBuffer,1,1.9);//
  
})
.catch(function(e){
    return console.error(e);
});
