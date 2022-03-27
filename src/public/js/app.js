const messageList = document.querySelector("ul");
const NickForm = document.querySelector("#Nick");
const MessageForm = document.querySelector("#Message");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, paylod) {
  const msg = { type, paylod };
  return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
  console.log("Connection to Server ✔");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("DisConnection to Server ❌");
});

function handleSubmit(event) {
  event.preventDefault();
  const input = MessageForm.querySelector("input");
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
}

function hadleNickSubmit(event) {
  event.preventDefault();
  const input = NickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

NickForm.addEventListener("submit", hadleNickSubmit);
MessageForm.addEventListener("submit", handleSubmit);
