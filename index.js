const express = require("express")
const http = require("http")
const app = express()
const server = http.createServer(app)
var port = process.env.PORT || 5000

var peers=[];

app.get('/',(req,res) => {
    res.send('Hola mundo')
})

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
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


server.listen(port, () => console.log("server is running on port "+port))
