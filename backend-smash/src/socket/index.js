const dayjs = require("dayjs");
const messageSavingQueue = require("@queue/message/messageSaving.queue");
const MESSAGE_ROOM = "messageRoom";

const jobOptions = {
    removeOnComplete: true,
    attempts: 3,
};

const SocketMessageServer = (socket, io) => {
    //when connect
    console.log("a user connected.");
    socket.join(MESSAGE_ROOM);
    socket.on("MessageSent", async ({ text, walletAddress }) => {
        const sender = socket?.["authData"]?.userId;
        if (text && sender) {
            console.log(`user ${sender} has sent ${text} to room ${MESSAGE_ROOM}`);
            socket.to(MESSAGE_ROOM).emit("Receive-msg", { text, senderId: sender, createdAt: +dayjs(), walletAddress });
            await messageSavingQueue.add({ sender, text }, jobOptions);
        }
    });
};

module.exports = {
    SocketMessageServer,
};
