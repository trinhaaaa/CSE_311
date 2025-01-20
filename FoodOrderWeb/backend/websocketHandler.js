const WebSocket = require("ws");
const db = require('./db');


const wss = new WebSocket.Server({ port: 8081 }, () => {
    console.log("WebSocket server running on ws://localhost:8081");
});

wss.on("connection", (ws) => {
    console.log("WebSocket client connected!");


    const sendData = () => {
        const query = "SELECT * FROM materials";
        db.query(query, (err, results) => {
            if (err) {
                console.error("Database query error:", err);
                return;
            }
            ws.send(JSON.stringify(results));
        });
    };


    sendData();

    
    const interval = setInterval(sendData, 5000);

    ws.on("close", () => {
        console.log("WebSocket client disconnected!");
        clearInterval(interval);
    });
});

