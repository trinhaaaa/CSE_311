// #include <WiFi.h>
// #include <PubSubClient.h>

// const char *ssid = "EIU FACULTY/STAFF";
// const char *password = "EIU.edu@!%";
// const char *mqtt_server = "broker.hivemq.com";
// const int mqtt_port = 1883;
// const char *mqtt_topic = "food/materials/weight";

// WiFiClient espClient;
// PubSubClient client(espClient);

// float current_weight = 100.0;
// float previous_weight = current_weight;
// unsigned long last_publish_time = 0;
// const unsigned long publish_interval = 30000;

// void connectWiFi() {Serial.println("Connecting to WiFi...");
// Serial.println("Connecting to MQTT broker...");
// Serial.println("Publishing weight data...");
// Serial.print("Current weight: ");
// Serial.println(current_weight);
// Serial.print("Previous weight: ");
// Serial.println(previous_weight);
//     WiFi.begin(ssid, password);
//     while (WiFi.status() != WL_CONNECTED) {
//         delay(500);
//         Serial.print(".");
//     }
//     Serial.println("\nWiFi connected!");
// }

// void connectMQTT() {
//     while (!client.connected()) {
//         if (client.connect("ESP32Client")) {
//             Serial.println("Connected to MQTT broker!");
//         } else {
//             delay(5000);
//         }
//     }
// }

// void publishWeight() {
//     char weight_message[100];
//     int material_id = 2; // Example ID
//     snprintf(weight_message, sizeof(weight_message), "{\"material_id\": %d, \"weight\": %.2f}", material_id, current_weight);
//     client.publish(mqtt_topic, weight_message);
// }


// void setup() {
//     Serial.begin(115200);
//     connectWiFi();
//     client.setServer(mqtt_server, mqtt_port);
//     connectMQTT();
// }

// void loop() {
//     if (!client.connected()) {
//         connectMQTT();
//     }

//     unsigned long current_time = millis();
//     if (current_time - last_publish_time >= publish_interval || current_weight != previous_weight) {
//         last_publish_time = current_time;
//         current_weight -= 0.5;
//         if (current_weight < 0) current_weight = 100.0;
//         publishWeight();
//         previous_weight = current_weight;
//     }

//     client.loop();
// }
#include <WiFi.h>
#include <ArduinoWebsockets.h>

using namespace websockets;

const char *ssid = "EIU FACULTY/STAFF";
const char *password = "EIU.edu@!%";
const char *websocket_server = "ws://your-websocket-server.com:port";

WebsocketsClient wsClient;

float current_weight = 100.0;
float previous_weight = current_weight;
unsigned long last_publish_time = 0;
const unsigned long publish_interval = 30000;

void connectWiFi() {
    Serial.println("Connecting to WiFi...");
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("\nWiFi connected!");
}

void connectWebSocket() {
    Serial.println("Connecting to WebSocket server...");
    if (wsClient.connect(websocket_server)) {
        Serial.println("Connected to WebSocket server!");
    } else {
        Serial.println("Failed to connect to WebSocket server!");
        delay(5000);
    }
}

void publishWeight() {
    char weight_message[100];
    int material_id = 2; // Example ID
    snprintf(weight_message, sizeof(weight_message), "{\"material_id\": %d, \"weight\": %.2f}", material_id, current_weight);

    if (wsClient.available()) {
        wsClient.send(weight_message);
        Serial.println("Weight data sent: ");
        Serial.println(weight_message);
    } else {
        Serial.println("WebSocket connection is not available.");
    }
}

void setup() {
    Serial.begin(115200);
    connectWiFi();
    connectWebSocket();
}

void loop() {
    if (!wsClient.available()) {
        connectWebSocket();
    }

    unsigned long current_time = millis();
    if (current_time - last_publish_time >= publish_interval || current_weight != previous_weight) {
        last_publish_time = current_time;
        current_weight -= 0.5;
        if (current_weight < 0) current_weight = 100.0;
        publishWeight();
        previous_weight = current_weight;
    }

    wsClient.poll();
}
