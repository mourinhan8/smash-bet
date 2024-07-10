const io = require("socket.io-client");

// const socket = io("http://localhost:6699");
const socket = io("http://socket-dev.smash-bets.com");

socket.on("avaiToChat", (data) => {
    console.log("Message from server:", JSON.stringify(data));
});

socket.on("connect_error", (error) => {
    console.error("Error:", error.message);
});
