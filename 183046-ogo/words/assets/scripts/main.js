function toggleBrightness() {
  document.body.classList.toggle('is-inverted');
}

//　ボタン要素を取得する
const bb = document.querySelector('.brightness-button');

// ボタンにイベントリスナーを
bb.addEventListener('click', toggleBrightness);

