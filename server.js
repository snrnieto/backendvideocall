const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)

var peers=[];

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
	// console.log("Usuario conectado "+socket.id)
	// socket.emit("me", socket.id);

	socket.on('join-room', (userId) => {
		console.log(userId)
		peers.push(userId)
		console.log("Usuarios: ",peers)

		io.emit("new-user",peers)
	})
	
});


server.listen(5000, () => console.log("server is running on port 5000"))