let audioContext = new AudioContext();

//関数側に第二引数(パン)を用意する
function　startLoop(audioBuffer,pan=0,rate=1){
　let sourceNode = audioContext.createBufferSource();  

 //パンニング機能を追加
  let pannerNode = audioContext.createStereoPanner();   

 sourceNode.buffer = audioBuffer;
 sourceNode.loop = true;
 sourceNode.loopStart = 2.98;
 pannerNode.loopEnd = 3.80;

 //再生速度を指定、引数　rate　で受け取る
 sourceNode.playbackRate.value = rate;
 pannerNode.pan.value = pan;
//パンの値を指定
sourceNode.connect(pannerNode);

//パン情報の入った音をスピーカーに送る
pannerNode.connect(audioContext.destination);

//再生開始
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
//startLoop　の第二引数にパンの値(-1=左,1=右)を入れて関数に渡す
    startLoop(audioBuffer, -1);
    startLoop(audioBuffer, 1, 1.002);
})
.catch (function(e){
 return console.error(e);
});
