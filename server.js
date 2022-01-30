const http = require("http");
const express = require( "express");
const WebSocket = require( "ws");


const app = express();

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

const dispatchEvent = (message, ws) => {
    const json = JSON.parse(message);
    console.log(json)
    switch (json.event) {
        case "chat-message":
            webSocketServer.clients.forEach(client => client.send(JSON.stringify(json.payload)));
            break;
        default: ws.send((new Error("Wrong query")).message);
    }
}

webSocketServer.on('connection', ws => {
    ws.on('message', m => dispatchEvent(m, ws));
    ws.on("error", e => ws.send(e));
});

server.listen(5000, () => console.log("Server started"))

