#include <WiFi.h>
#include <PubSubClient.h>

// WiFi credentials
const char* ssid = "Ha";                 
const char* password = "0365372229";    

// MQTT broker
const char* mqtt_server = "broker.hivemq.com";  // MQTT Broker public
const int mqtt_port = 1883;                    // Cổng MQTT (mặc định là 1883)
const char* mqtt_topic = "warehouse/materials/weight"; // Tên topic

WiFiClient espClient;
PubSubClient client(espClient);

float current_weight = 100.0; // Khởi tạo cân nặng

// Kết nối WiFi
void connectWiFi() {
    Serial.print("Connecting to WiFi");
    WiFi.begin(ssid, password);

    int maxRetries = 20;  // Giới hạn số lần thử kết nối
    int retryCount = 0;

    while (WiFi.status() != WL_CONNECTED && retryCount < maxRetries) {
        delay(500);
        Serial.print(".");
        retryCount++;
    }

    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("\nWiFi connected!");
        Serial.print("IP Address: ");
        Serial.println(WiFi.localIP());
    } else {
        Serial.println("\nFailed to connect to WiFi. Restarting...");
        delay(5000);
        ESP.restart(); // Khởi động lại ESP nếu không kết nối được
    }
}

// Kết nối MQTT
void connectMQTT() {
    while (!client.connected()) {
        Serial.print("Connecting to MQTT broker...");
        if (client.connect("ESP32Client")) { // Tên client MQTT
            Serial.println("Connected to MQTT broker!");
        } else {
            Serial.print("Failed to connect. State: ");
            Serial.println(client.state()); // In mã lỗi
            delay(5000); // Chờ 5 giây trước khi thử lại
        }
    }
}

void setup() {
    Serial.begin(115200);
    connectWiFi(); // Kết nối WiFi
    client.setServer(mqtt_server, mqtt_port); // Cấu hình MQTT broker
    connectMQTT(); // Kết nối MQTT
}

void loop() {
    // Kiểm tra kết nối WiFi
    if (WiFi.status() != WL_CONNECTED) {
        Serial.println("WiFi connection lost. Reconnecting...");
        connectWiFi();
    }

    // Kiểm tra kết nối MQTT
    if (!client.connected()) {
        Serial.println("MQTT connection lost. Reconnecting...");
        connectMQTT();
    }

    client.loop();

    // Giảm cân nặng giả lập ngẫu nhiên
    float weight_loss = random(5, 20) / 10.0f; // Giảm từ 0.5kg đến 2.0kg
    current_weight = max(current_weight - weight_loss, 0.0f); // Đảm bảo không âm

    // Tạo payload JSON
    String payload = "{\"material_id\":1,\"weight\":" + String(current_weight) + "}";
    client.publish(mqtt_topic, payload.c_str()); // Gửi dữ liệu đến topic
    Serial.println("Data sent: " + payload);

    delay(12000); // Gửi dữ liệu mỗi 2 phút
}
