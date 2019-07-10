let audioContext = new AudioContext();

function startLoop(audioBuffer, pan=0, rate=1) {
    let sourceNode = audioContext.createBufferSource();
    let pannerNode = audioContext.createStereoPanner();

    // Buffer (音を入れておく箱)の中身を読み込んだ audioBuffer に指定
    sourceNode.buffer = audioBuffer;
    // ループを有効化する
    sourceNode.loop = true;
    // 2.95~3.86秒でループさせるように四天終点を指定
    sourceNode.loopStart = 2.98;
    sourceNode.loopEnd = 3.80;
    
    sourceNode.playbackRate.value = rate;

    pannerNode.pan.value = pan;
    sourceNode.connect(pannerNode);
    pannerNode.connect(audioContext.destination);
    //再生
    sourceNode.start(0, 2.98);
}

// mp3 ファイルを取得
fetch('assets/sounds/itsgonnarain.mp3')
.then(function (response) {
    //arrayBuffer 形式に変換
    return response.arrayBuffer();
})
.then(function (arrayBuffer) {
    // array Buffer の内容をコンソールに出力    
    //return console.log('Received', arrayBuffer);
    //デコードして　WebAudio　で使える形にする
    return audioContext.decodeAudioData(arrayBuffer);
})
.then(function (audioBuffer) {
    //startLoop(audioBuffer, -1);
    //startLoop(audioBuffer, 1, 1.002);
})
.catch(function(e) {
    //　エラーメッセージがあったら出力する    
    return console.error(e);

});


