const mqtt = require("mqtt");
const db = require("./db");


//const mqttClient = mqtt.connect("mqtt://localhost:1883");
const mqttClient = mqtt.connect("mqtt://broker.hivemq.com");


mqttClient.on("connect", () => {
    console.log("Connected to MQTT broker");
    mqttClient.subscribe("food/materials/weight", (err) => {
        if (err) {
            console.error("Failed to subscribe to topic:", err);
        } else {
            console.log("Subscribed to topic: food/materials/weight");
        }
    });

});

mqttClient.on("message", (topic, message) => {
    try {
        console.log(`Received message from topic ${topic}:`, message.toString());
        const payload = JSON.parse(message.toString());
        const { material_id, weight } = payload;

        if (!material_id || weight === undefined) {
            console.error("Invalid payload format:", payload);
            return;
        }

        const logQuery = "INSERT INTO weightlog (material_id, weight) VALUES (?, ?)";
        db.query(logQuery, [material_id, weight], (err) => {
            if (err) {
                console.error("Error inserting into weightlog:", err);
                return;
            }
            console.log(`Logged weight for material ${material_id}: ${weight} kg`);
        });


        const updateQuery = `
            UPDATE materials 
            SET current_weight = ? 
            WHERE id = ? AND EXISTS (
                SELECT 1 FROM materials WHERE id = ?
            )
        `;
        db.query(updateQuery, [weight, material_id, material_id], (err) => {
            if (err) {
                console.error("Error updating materials:", err);
                return;
            }
            console.log(`Updated material ${material_id} with weight: ${weight} kg`);
        });
    } catch (error) {
        console.error("Error processing MQTT message:", error.message);
    }
});
