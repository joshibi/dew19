let audioContext = new AudioContext();

fetch('assets/sounds/itsgonnarain.mp3')
.then(function(responce){
 return responce.arrayBuffer();
})

.then(function(arrayBuffer){
 return audioContext.decodeAudioData(arrayBuffer);
})



.then(function(audioBuffer){

 let sourceNode = audioContext.createBufferSource();
 sourceNode.buffer = audioBuffer;

sourceNode.loop = true;

sourceNode.loopStart = 2.98;
sourceNode.loopEnd = 3.80;

 sourceNode.connect(audioContext.destination);
 sourceNode.start();

})
 

.catch(function(e){
    return console.error(e);
});


