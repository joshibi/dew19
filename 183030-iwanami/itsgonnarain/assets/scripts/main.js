let audioContext = new AudioContext();


fetch('assets/sounds/itsgonnarain.mp3')
 .then(function(response) {
   return response.arrayBuffer();
 })
 .then(function(arrayBuffer) {
    return audioContext.decodeAudioData(arrayBuffer);
  })
 .then(function(arrayBuffer) {
    return console.log('Decoded', arrayBuffer);
  
let sourceNode = audioContext.createBufferSource();
sourceNode = audioBuffer;
sourceNode.loop = true;
//2.98 3.88
sourceNode.loopStart =2.98;
sourceNode.loopEnd =3.88;
sourceNode.connect(audioContext.destination);
sourceNode.start();
  })

  .catch(function(e) {
    return console.error(e);
  });