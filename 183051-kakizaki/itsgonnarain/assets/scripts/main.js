//音のすべてを入れておける箱(オブジェクト)を作っておく
let audioContext = new AudioContext(); 
 //関数側に第二引数（pan：パン）と第三引数（rate:再生速度）を用意する
 function startLoop(audioBuffer　,　pan,　rate){
     let sourceNode =audioContext.createBufferSource();

     //パンニング機能を追加
     let PannerNode = audioContext.createStereoPanner();

     sourceNode.buffer =audioBuffer;
     sourceNode.loop = true;
     sourceNode.loopStart =0;
     sourceNode.loopEnd =1;
    
     //再生速度を指定
     sourceNode.playbackRate.value =rate;

     //パンの値を指定
     PannerNode.pan.value=pan;

     //音のソースをパンにつなぐ
     sourceNode.connect(PannerNode);
     //パンの情報補入った音をスピーカーに送る
     PannerNode.connect(audioContext.destination);
     //再生開始
     sourceNode.start();
 }
//mp3ファイルを取得
fetch('assets/sounds/すき.mp3')
.then(function(response){
    
    //arrayBuffer 形式　（テキスト以外のデータを扱う形式）
    return response.arrayBuffer()
    
    ;})
.then(function(arrayBuffer){
    
    //デコードして　Web Audio　で使える形にする
    return audioContext.decodeAudioData(arrayBuffer);
})
    
.then(function(audioBuffer){
    startLoop(audioBuffer,-1,1);
    startLoop(audioBuffer,1,1.02)
   
})
.catch(function(e){
    return console.error(e);
});

