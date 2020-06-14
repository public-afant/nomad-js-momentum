const todoNode = document.querySelector(".todos");
const formNode = todoNode.querySelector("form");
const formInput = formNode.querySelector("input");
const pendingList = document.querySelector(".ul-pending");
const finishedList = document.querySelector(".ul-finished");

const PENDING_KEY = "PENDING";
const FINISHED_KEY = "FINISHED";
let pendings = [];
let finished = [];

const saveList = (key, arr) => {
  localStorage.setItem(key, JSON.stringify(arr));
};

const handleEnter = (e) => {
  e.preventDefault();
  const makeID = Date.now();
  paintPendingItem(formInput.value, makeID);

  formInput.value = "";
};

const paintPendingItem = (item, pendingId) => {
  const li = document.createElement("li");
  const div = document.createElement("div");
  const span = document.createElement("span");
  const hr = document.createElement("hr");
  const btnDelete = document.createElement("button");
  const btnSuccess = document.createElement("button");

  span.innerText = item;
  btnDelete.innerText = "❌";
  btnSuccess.innerText = "✅";

  div.appendChild(span);
  div.appendChild(btnSuccess);
  div.appendChild(btnDelete);

  li.id = pendingId;
  const currentObj = {
    id: pendingId,
    text: item,
  };

  pendings.push(currentObj);

  li.appendChild(div);
  li.appendChild(hr);
  pendingList.appendChild(li);

  btnDelete.addEventListener("click", (e) => {
    const div = e.target.parentNode;
    const li = div.parentNode;
    pendingList.removeChild(li);
    const deletePendingList = pendings.filter(
      (pending) => pending.id !== parseInt(li.id)
    );
    pendings = deletePendingList;
    saveList(PENDING_KEY, pendings);
  });
  btnSuccess.addEventListener("click", (e) => {
    const div = e.target.parentNode;
    const li = div.parentNode;
    const clickItemID = li.id;
    const tempObj = pendings.find((item) => item.id === parseInt(clickItemID));

    paintFinishedItem({ id: tempObj.id, text: tempObj.text });

    pendingList.removeChild(li);
    const deletePendingList = pendings.filter(
      (pending) => pending.id !== parseInt(li.id)
    );
    pendings = deletePendingList;
    saveList(PENDING_KEY, pendings);
  });

  saveList(PENDING_KEY, pendings);
};

const paintFinishedItem = (item) => {
  const li = document.createElement("li");
  const div = document.createElement("div");
  const hr = document.createElement("hr");
  const span = document.createElement("span");
  const btnDelete = document.createElement("button");
  const btnBack = document.createElement("button");

  span.innerText = item.text;
  btnDelete.innerText = "❌";
  btnBack.innerText = "🔄";

  div.appendChild(span);
  div.appendChild(btnBack);
  div.appendChild(btnDelete);

  li.id = item.id;

  const currentObj = {
    id: parseInt(item.id),
    text: item.text,
  };

  finished.push(currentObj);

  li.appendChild(div);
  li.appendChild(hr);

  finishedList.appendChild(li);

  btnDelete.addEventListener("click", (e) => {
    const div = e.target.parentNode;
    const li = div.parentNode;
    finishedList.removeChild(li);
    const deleteFinishedList = finished.filter(
      (item) => item.id !== parseInt(li.id)
    );
    finished = deleteFinishedList;
    saveList(FINISHED_KEY, finished);
  });
  btnBack.addEventListener("click", (e) => {
    const div = e.target.parentNode;
    const li = div.parentNode;
    const clickItemID = li.id;
    const tempObj = finished.find((item) => item.id === parseInt(clickItemID));

    paintPendingItem(tempObj.text, tempObj.id);

    finishedList.removeChild(li);
    const deleteFinishedList = finished.filter(
      (item) => item.id !== parseInt(li.id)
    );
    finished = deleteFinishedList;
    saveList(FINISHED_KEY, finished);
  });

  saveList(FINISHED_KEY, finished);
};

const loadList = () => {
  const getLocalPendings = JSON.parse(localStorage.getItem(PENDING_KEY));
  const getLocalFinished = JSON.parse(localStorage.getItem(FINISHED_KEY));

  if (getLocalPendings !== null) {
    getLocalPendings.forEach((item) => paintPendingItem(item.text, item.id));
  }

  if (getLocalFinished !== null) {
    getLocalFinished.forEach((item) => paintFinishedItem(item));
  }
};

var init = () => {
  loadList();
  formNode.addEventListener("submit", handleEnter);
};

init();
