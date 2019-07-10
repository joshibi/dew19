


function toggleBrightness() {
    document.body.classList.toggle('is-inverted');
}

const bb = document.querySelector('.brightness-button');
console.log(bb);

bb.addEventListener('click', toggleBrightness);
