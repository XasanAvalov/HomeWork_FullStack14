const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});
let users = []; 
io.on("connection", (socket) => {
    users.push({id: socket.id, name: `name` + users.length});
    const currentUser = users.find((user) => user.id === socket.id)

    socket.on("submit", ({message}) =>{
        io.emit("response", {message, user: currentUser.name})
    });

    socket.on("disconnect", (data) => {
        const inew = users.filter((c) => c.id !== socket.id);
        users = inew;
    })
});

server.listen(5000, () => {
    console.log(5000);
})