const socket = new WebSocket("ws://localhost:8080");

// Socket connected
socket.onopen = () => {
  console.log("Client connected to the socket");
};

// Set user name
const username_input = document.getElementById("username_input");
const username_button = document.getElementById("username_button");
username_button.addEventListener("click", () => {
  localStorage.setItem("username", username_input.value);
});

const message_input = document.getElementById("message_input");
const send_message = document.getElementById("send_message");
// Send to the socket
const sendMessage = () => {
  socket.send(
    JSON.stringify({
      username: localStorage.getItem("username"),
      message: message_input.value,
    })
  );
  message_input.value = "";
};

send_message.addEventListener("click", () => sendMessage());

// Receive the message
const messages = document.getElementById("messages");

socket.addEventListener("message", (e) => {
  const messageBox = document.createElement("div");
  const message_content = document.createElement("h5");
  const message_user = document.createElement("span");

  messageBox.appendChild(message_user);
  messageBox.appendChild(message_content);

  const reader = new FileReader();

  reader.onload = () => {
    var message = JSON.parse(reader.result);
    message_content.innerText = message.message;
    message_user.innerText = message.username;
    messages.appendChild(messageBox);
    console.log(message);
  };
  reader.readAsText(e.data);
});
