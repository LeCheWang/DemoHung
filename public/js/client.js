const socket = io("https://65cfe2baf547.ngrok-free.app");

const ip_room = document.getElementById("ip_room");
const ip_message = document.getElementById("ip_message");
const ul_messages = document.getElementById("ul_messages");
const ip_name = document.getElementById("ip_name");

let yourName = "";
function joinRoom() {
  const room = ip_room.value;
  yourName = ip_name.value;
  socket.emit("join_room", room);
}

ip_message.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
  const message = ip_message.value;
  socket.emit("send_message", { message, name: yourName });
  ip_message.value = "";
}

socket.on("receive_message", (data) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span style="font-weight: bold;">
        ${data.name}
    </span>: 
        ${data.message}
  `;
  ul_messages.appendChild(li);
});
