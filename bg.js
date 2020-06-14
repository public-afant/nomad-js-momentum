const COUNT_IMG = 3;
const body = document.querySelector("body");

const randomNum = () => {
  return Math.floor(Math.random() * COUNT_IMG);
};

const paintBgImage = () => {
  const imgNum = randomNum();

  const image = new Image();
  image.src = `img/${imgNum + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image);
};

var init = () => {
  paintBgImage();
};

init();
