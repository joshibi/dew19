const images = document.querySelectorAll('main ul li img');

for (let i = 0; i < images.length; i++) {
  let name = images[i].getAttribute('alt');
  images[i].insertAdjacentHTML('beforebegin', '<span>' + name + '</span>');
}