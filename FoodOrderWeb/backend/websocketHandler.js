const WebSocket = require("ws");
const db = require('./db');

// Tạo WebSocket server
const wss = new WebSocket.Server({ port: 8081 }, () => {
    console.log("WebSocket server running on ws://localhost:8081");
});

wss.on("connection", (ws) => {
    console.log("WebSocket client connected!");

    // Gửi dữ liệu định kỳ từ database
    const interval = setInterval(() => {
        const query = "SELECT * FROM Materials";
        db.query(query, (err, results) => {
            if (err) {
                console.error("Database query error:", err);
                return;
            }
            ws.send(JSON.stringify(results));
        });
    }, 5000); // 5 giây

    ws.on("close", () => {
        console.log("WebSocket client disconnected!");
        clearInterval(interval);
    });
});
