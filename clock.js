const clockDivNode = document.querySelector(".clock");
const clockNode = clockDivNode.querySelector("h1");

const displayNum = (num) => (num < 10 ? `0${num}` : num);

const setClock = () => {
  const getDate = new Date();
  const hours = getDate.getHours();
  const min = getDate.getMinutes();
  const secoond = getDate.getSeconds();

  clockNode.innerHTML = `${displayNum(hours)}:${displayNum(min)}:${displayNum(
    secoond
  )}`;
};

var init = () => {
  setInterval(() => {
    setClock();
  }, 1000);
};

init();
