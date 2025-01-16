const mqtt = require("mqtt");
const db = require('./db');

// Kết nối đến MQTT Broker
const mqttClient = mqtt.connect("mqtt://localhost:1883");

mqttClient.on("connect", () => {
    console.log("Connected to MQTT broker");
    mqttClient.subscribe("warehouse/materials/weight", (err) => {
        if (err) {
            console.error("Failed to subscribe to topic:", err);
        } else {
            console.log("Subscribed to topic: warehouse/materials/weight");
        }
    });
});

// Xử lý dữ liệu từ MQTT
mqttClient.on("message", (topic, message) => {
    try {
        const payload = JSON.parse(message.toString());
        const { material_id, weight } = payload;

        // Lưu log vào bảng WeightLog
        const logQuery = "INSERT INTO WeightLog (material_id, weight) VALUES (?, ?)";
        db.query(logQuery, [material_id, weight], (err) => {
            if (err) {
                console.error("Error inserting into WeightLog:", err);
                return;
            }
            console.log(`Logged weight for material ${material_id}: ${weight} kg`);
        });

        // Cập nhật cân nặng hiện tại trong bảng Materials
        const updateQuery = "UPDATE Materials SET current_weight = ? WHERE id = ?";
        db.query(updateQuery, [weight, material_id], (err) => {
            if (err) {
                console.error("Error updating Materials:", err);
                return;
            }
            console.log(`Updated material ${material_id} with weight: ${weight} kg`);
        });
    } catch (error) {
        console.error("Error processing MQTT message:", error);
    }
});
