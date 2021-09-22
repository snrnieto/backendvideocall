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

	var socket_id = socket.id;

	socket.on('new-user', (userId) => {
		console.log("Usuario conectado: "+userId)

		var new_peer = new Object();

		new_peer.socket_id = socket_id;
		new_peer.peer = userId;

		peers.push(new_peer)
		console.log("Usuarios: ",peers)

		io.emit("peers",peers)
	})

	socket.on('disconnect', () => {
		
		peers = deleteWithId(peers,socket.id) 
		console.log("Usuario desconectado: "+socket.id)
		console.log("Usuarios: ",peers)

		io.emit("user-disconnected",socket.id)
	}) 
	
});


server.listen(port, () => console.log("server is running on port "+port))
 

function deleteWithId(list,id){
	return list.filter(function(el) { return el.socket_id != id; }); 
}
