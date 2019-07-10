console.log("tw24");

let audioContext = new AudioContext();

function startLoop(audioBuffer, pan = 0, rate = 1) {
  let sourceNode = audioContext.createBufferSource();
  let pannerNode = audioContext.createStereoPanner();

  sourceNode.buffer = audioBuffer;
  sourceNode.loop = true;
  sourceNode.loopStart = 1.277;
  sourceNode.loopEnd = 20.477;
  sourceNode.playbackRate.value = rate;
  pannerNode.pan.value = pan;

  sourceNode.connect(pannerNode);
  pannerNode.connect(audioContext.destination);
  sourceNode.start(0, 1.277);
}

fetch("assets/sounds/tw024.mp3")
  .then(function(response) {
    return response.arrayBuffer();
  })
  .then(function(arrayBuffer) {
    return audioContext.decodeAudioData(arrayBuffer);
  })
  .then(function(audioBuffer) {
    const introNode = audioContext.createBufferSource();
    introNode.buffer = audioBuffer;
    introNode.connect(audioContext.destination);
    introNode.start();
    introNode.onended = function() {
      startLoop(audioBuffer, -1);
      startLoop(audioBuffer, 1, 1.002);
    };
  })
  .catch(function(e) {
    return console.error(e);
  });

function setSlide() {
  const first = document.querySelector(".visual");
  const before = document.querySelector(".is-show");

  if (before) {
    before.classList.remove("is-show");
    const next = before.nextElementSibling;
    if (next) {
      next.classList.add("is-show");
    } else {
      first.classList.add("is-show");
    }
  } else {
    first.classList.add("is-show");
  }
}

const slideToggleTarget = document.querySelector(".switch-button2");
slideToggleTarget.addEventListener("click", setSlide);

/*
 * クリックイベントで mix-blend-mode を切り替える
 */

// モード名を配列の形で変数化しておく
const modes = [
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "hue",
  "saturation",
  "color",
  "luminosity",
  "normal"
];

// 配列のはじめ（0番目）からスタート
let countMode = 0;

//　モードを切り替える処理
function changeMode() {
  // .visual 内の img 要素を切り替える対象にする
  const img = document.querySelectorAll(".visual img.blend");
  // 対象すべてに対して配列に記されている multiply などの値を mix-blend-mode に指定するようにする
  for (let i = 0; i < img.length; i++) {
    img[i].style.mixBlendMode = modes[countMode];
  }
  // クリックごとに配列の順序をひとつずつ進める。最後に達したら最初(0番目)に戻す
  if (countMode >= modes.length - 1) {
    countMode = 0;
  } else {
    countMode++;
  }
}

//　ボタンをクリックしたら changeMode() を実行する
const mode = document.querySelector(".switch-button");
mode.addEventListener("click", changeMode);
