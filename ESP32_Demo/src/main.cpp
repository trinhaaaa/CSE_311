#include <WiFi.h>
#include <PubSubClient.h>

// WiFi credentials
const char* ssid = "EIU FACULTY/STAFF"; // Thay bằng SSID của mạng WiFi bạn muốn sử dụng
const char* password = "EIU.edu@!%";    // Thay bằng mật khẩu của mạng WiFi bạn muốn sử dụng

// MQTT broker
const char* mqtt_server = "broker.hivemq.com"; // Public MQTT broker miễn phí
const int mqtt_port = 1883;
const char* mqtt_topic = "esp32/data";         // Topic gửi dữ liệu

WiFiClient espClient;
PubSubClient client(espClient);

// Xóa thông tin WiFi cũ trong NVS
void eraseWiFiCredentials() {
    Serial.println("Erasing saved WiFi credentials...");
    WiFi.disconnect(true); // Xóa thông tin WiFi đã lưu
    delay(1000);
    Serial.println("WiFi credentials erased!");
}

// Kết nối WiFi
void connectWiFi() {
    Serial.println("Connecting to WiFi...");
    WiFi.begin(ssid, password); // Bắt đầu kết nối với WiFi

    // Chờ kết nối
    int maxRetries = 20; // Giới hạn số lần thử
    int retryCount = 0;
    while (WiFi.status() != WL_CONNECTED && retryCount < maxRetries) {
        delay(500);
        Serial.print(".");
        retryCount++;
    }

    // Kiểm tra trạng thái kết nối
    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("\nWiFi connected!");
        Serial.println("Connected to: " + String(WiFi.SSID()));
        Serial.println("IP Address: " + WiFi.localIP().toString());
    } else {
        Serial.println("\nFailed to connect to WiFi. Please check SSID and password.");
        while (true); // Dừng chương trình nếu không kết nối được WiFi
    }
}

// Kết nối MQTT
void connectMQTT() {
    while (!client.connected()) {
        Serial.print("Connecting to MQTT...");
        if (client.connect("ESP32Client")) {
            Serial.println("Connected to MQTT broker!");
        } else {
            Serial.print("Failed, rc=");
            Serial.print(client.state());
            Serial.println(" retrying in 5 seconds");
            delay(5000);
        }
    }
}

void setup() {
    Serial.begin(115200);

    // Xóa thông tin WiFi cũ nếu cần
    eraseWiFiCredentials();

    // Kết nối WiFi
    connectWiFi();

    // Kết nối MQTT broker
    client.setServer(mqtt_server, mqtt_port);
    connectMQTT();
}

void loop() {
    if (!client.connected()) {
        connectMQTT();
    }
    client.loop();

    // Giả lập dữ liệu
    float temperature = random(20, 30) + random(0, 100) / 100.0;
    float humidity = random(40, 60) + random(0, 100) / 100.0;

    // Tạo payload JSON
    String payload = String("{\"temperature\":") + temperature + ",\"humidity\":" + humidity + "}";
    client.publish(mqtt_topic, payload.c_str());
    Serial.println("Data sent: " + payload);

    delay(5000);
}
