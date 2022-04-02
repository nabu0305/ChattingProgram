const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

let roomName;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", input.value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function showRoom() {
  room_name.hidden = true;
  form.hidden = true;
  room.hidden = false;
  Room_list.hidden = true;

  const h3 = room.querySelector("h3");
  h3.innerText = ` ${roomName}방`;
  const msgform = room.querySelector("#msg");
  const nickform = room.querySelector("#name");
  nickform.addEventListener("submit", handleNicknameSubmit);
  msgform.addEventListener("submit", handleMessageSubmit);
}
function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#name input");
  socket.emit("nickname", input.value);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `${roomName} (${newCount})`;
  addMessage(`${user} join!`);
});

socket.on("bye", (user, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `${roomName} (${newCount})`;
  addMessage(`${user} left`);
});

socket.on("room_change", (rooms) => {
  const roomlist = welcome.querySelector("ul");
  roomlist.innerHTML = "";

  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = `${room}방`;
    roomlist.appendChild(li);
  });
});
socket.on("new_message", addMessage);
