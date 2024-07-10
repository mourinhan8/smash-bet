require("module-alias/register");
const config = require("@config");
const { Server } = require("socket.io");
const { createServer } = require("http");
const { authenticateSocket } = require("@middleware/auth");
const { SocketMessageServer } = require("@socket");

const server = createServer();

var userCount = 0;

const ioMessageServer = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["auth"],
    },
});

ioMessageServer.use(authenticateSocket);

ioMessageServer.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);
    userCount++;
    ioMessageServer.emit("userCnt", { userCount });
    const sender = socket?.["authData"]?.userId;
    if (sender) {
        ioMessageServer.to(socket.id).emit("avaiToChat", { avaiToChat: true });
    }
    SocketMessageServer(socket, ioMessageServer);

    socket.on("disconnect", () => {
        userCount--;
        ioMessageServer.emit("userCnt", { userCount });
    });
});

server.listen(config.app.socketPort, () => {
    `Socket are ready on: ${config.app.socketPort}`;
});
