let audioContext = new AudioContext();

function startloop(audioBuffer, pan=0,rate=1) {
    let sourceNode = audioContext.createBufferSource();

    let pannerNode = audioContext.createStereoPanner();

    sourceNode.buffer = audioBuffer;
    sourceNode.loop = true;
    sourceNode.loopStart = 2.98;
    sourceNode.loopEnd = 3.80;

    sourceNode.playbackRate.value = rate;
    pannerNode.pan.value = pan;

    sourceNode.connect(pannerNode);

    pannerNode.connect(audioContext.destination);
    sourceNode.start(0,2.98);  
}

fetch('assets/sounds/itsgonnarain.mp3')
.then(function(responce){
    return responce.arrayBuffer();
})
.then(function(arrayBuffer){

    return audioContext.decodeAudioData(arrayBuffer);
})
.then(function(audioBuffer){
    //startloop(audioBuffer, -1,1);
    //startloop(audioBuffer, 1,0.99);
})
.catch(function(e){
    return console.error(e);
});

function setSlide() {
    const first = document.querySelector('.visual');
    const before = document.querySelector('.is-show');

    if(before) {
        before.classList.remove('is-show');
       
        const next = before.nextElementSibling;
        if(next) {
            next.classList.add('is-show');
        } else {
            first.classList.add('is-show');
        }

    } else {
        first.classList.add('is-show');
    }
}

const slideToggleTarget = document.querySelector('.visuals');
slideToggleTarget.addEventListener('click', setSlide);