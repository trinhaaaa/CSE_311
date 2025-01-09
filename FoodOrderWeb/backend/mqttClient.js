const mqtt = require('mqtt');
const express = require('express');
const cors = require('cors');

// MQTT client
const client = mqtt.connect('mqtt://broker.hivemq.com', {
  reconnectPeriod: 1000, // Tự động reconnect sau 1 giây nếu mất kết nối
  connectTimeout: 30 * 1000, // Thời gian chờ kết nối tối đa
  clean: true, // Tạo kết nối sạch
});

// Express server setup
const app = express();
app.use(cors());
app.use(express.json());

// Fake database (thay thế bằng cơ sở dữ liệu thực)
const database = [];

// Kết nối MQTT broker
client.on('connect', () => {
  console.log('Connected to MQTT broker');
  client.subscribe('esp32/data', (err) => {
    if (err) {
      console.error('Failed to subscribe to topic:', err);
    } else {
      console.log('Subscribed to topic: esp32/data');
    }
  });
});

// Xử lý dữ liệu từ ESP32
client.on('message', (topic, message) => {
  if (topic === 'esp32/data') {
    try {
      const data = JSON.parse(message.toString());
      console.log(`Received data: Temp=${data.temperature}, Humidity=${data.humidity}`);

      // Lưu vào fake database
      database.push({
        temperature: data.temperature,
        humidity: data.humidity,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  }
});

// API trả dữ liệu cho frontend
app.get('/data', (req, res) => {
  try {
    res.json(database); // Trả về dữ liệu giả lập từ database
  } catch (error) {
    console.error('Error sending data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Start Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
