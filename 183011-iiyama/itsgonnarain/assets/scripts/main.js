let audioContext = new AudioContext();

//パンニング機能追加　パンの値を追加　
//ソースをパンにつなぐ　パン情報の入った音をスピーカーにおくる
//再生開始
function startLoop(audioBuffer, pan=0, rate=1) {
 let soursceNode = audioContext.createBufferSource();
 let pannerNode = audioContext.createStereoPanner();

    soursceNode.buffer = audioBuffer;
    soursceNode.loop = true;
    //2.98~3.80
    soursceNode.loopStart = 2.98;
    soursceNode.loopEnd = 3.80;

    //音が高速になったり遅くなったりできる
    soursceNode.playbackRate.value = rate;

    pannerNode.pan.value = pan

    soursceNode.connect(pannerNode)
    pannerNode.connect(audioContext.destination);
    soursceNode.start(0, 2.98);
}
   
fetch('/assets/sounds/itsgonnarain.mp3')
.then(function(response){
    return response.arrayBuffer();
})
.then(function(arrayBuffer){
 return audioContext.decodeAudioData(arrayBuffer);
 })
.then(function(audioBuffer){

    //音を数値でずらせる
 startLoop(audioBuffer, -1, 1);
 startLoop(audioBuffer, 1, 1.002);
})
.catch(function(e){
    return console.error(e);
});
