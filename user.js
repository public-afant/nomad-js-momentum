const userNode = document.querySelector(".user");
const formUserNode = userNode.querySelector("form");
const inputUserNode = formUserNode.querySelector("input");

const handleUserName = (e) => {
  e.preventDefault();

  localStorage.setItem("username", inputUserNode.value);

  inputUserNode.value = "";
  loadUserName();
};

const loadUserName = () => {
  const getUserNameInLS = localStorage.getItem("username");
  if (getUserNameInLS !== null) {
    userNode.innerHTML = "";
    const h1 = document.createElement("h1");
    h1.innerText = `Hello! ${getUserNameInLS}!`;
    userNode.appendChild(h1);
  }
};

var init = () => {
  loadUserName();
  formUserNode.addEventListener("submit", handleUserName);
};

init();
