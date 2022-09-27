
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoUniqueID.h>

#define WIFI_SSID "AP_B536"
#define WIFI_PASSWORD "techinfo"

#define MQTT_SERVER "broker.hivemq.com"
#define MQTT_SERVER_PORT 1883

WiFiClient wifiClient;
PubSubClient client(wifiClient);
unsigned long lastHumidityPush;
String ID = "";

void setup_wifi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
  }

  Serial.println("WIFI - Connected");
  Serial.println("IP : ");
  Serial.print(WiFi.localIP());
}


void reconnect() {
  while (!client.connected()) {
    String clientId = ID + String(random(0xffff), HEX);
    
    if (client.connect(clientId.c_str())) {
      Serial.println("MQTT - Connected");

      String channel = "smartplant/" + ID + "/pump";
      client.subscribe(channel.c_str());
    } else {
      delay(5000);
    }
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  if ((char)payload[0] == '1') {
    digitalWrite(4, LOW);
  } else {
    digitalWrite(4, HIGH);
  }
}


void setup() {
  Serial.begin(9600);

  for (size_t i = 0; i < UniqueIDsize; i++)
  {
    ID += String(UniqueID[i]);
  }

  setup_wifi();

  client.setServer(MQTT_SERVER, MQTT_SERVER_PORT);
  client.setCallback(callback);
  
  pinMode(4, OUTPUT); // MOTEUR
  pinMode(A0, INPUT); // HUMIDITY
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  if(millis() - lastHumidityPush >= 10000) { 
    lastHumidityPush = millis();
    int soilMoistureValue = analogRead(A0);
    int percent = map(soilMoistureValue, 680, 280, 0, 100);

    String channel = "smartplant/" + ID + "/humidity";
    client.publish(channel.c_str(), String(percent).c_str());
  }

  delay(250);
}
