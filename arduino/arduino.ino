
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoUniqueID.h>
#include <LiquidCrystal_I2C.h>

#define WIFI_SSID "AP_B536"
#define WIFI_PASSWORD "techinfo"

#define MQTT_SERVER "mqtt.mqrco.xyz"
#define MQTT_SERVER_PORT 1883

WiFiClient wifiClient;
PubSubClient client(wifiClient);
unsigned long lastHumidityPush;
unsigned long lastPumpToggle;
String ID = "";

LiquidCrystal_I2C lcd(0x27, 20, 40);

void setup_wifi()
{
  setScreenMessage("SmartPlant - v1", "Connecting...");
  
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.println("Connecting to wifi...");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.println("no wifi");
    delay(500);
  }

  Serial.println("WIFI - Connected");
  Serial.println("IP : ");
  Serial.print(WiFi.localIP());
}

void reconnect()
{
  while (!client.connected())
  {
    String clientId = ID + String(random(0xffff), HEX);

    if (client.connect(clientId.c_str()))
    {
      Serial.println("MQTT - Connected");

      String channel = "smartplant/" + ID + "/pump";
      client.subscribe(channel.c_str());
    }
    else
    {
      delay(5000);
    }
  }
}

void callback(char *topic, byte *payload, unsigned int length)
{
  if ((char)payload[0] == '1')
  {
    digitalWrite(2, LOW);
    lastPumpToggle = millis();
  }
  else
  {
    digitalWrite(2, HIGH);
  }
}

void setup()
{
  Serial.begin(9600);

  lcd.init();
  lcd.backlight();
  
  for (size_t i = 0; i < UniqueIDsize; i++)
  {
    ID += String(UniqueID[i]);
  }

  setup_wifi();

  client.setServer(MQTT_SERVER, MQTT_SERVER_PORT);
  client.setCallback(callback);

  digitalWrite(2, HIGH);
  pinMode(2, OUTPUT); // MOTEUR

  pinMode(A0, INPUT); // HUMIDITY

}

void loop()
{
  if (!client.connected())
  {
    reconnect();
  }
  client.loop();

  if(millis() - lastPumpToggle >= 60000) {
    if(digitalRead(2) == LOW) {
      digitalWrite(2, HIGH);
    }
  }

  int soilMoistureValue = analogRead(A0);
  int percent = map(soilMoistureValue, 680, 280, 0, 100);

  if (millis() - lastHumidityPush >= 60000)
  {
    lastHumidityPush = millis();
    

    String channel = "smartplant/" + ID + "/humidity";
    client.publish(channel.c_str(), String(percent).c_str());
  }

  setScreenMessage("Humidity:", String(percent) + "%");
  
  delay(250);
}

void setScreenMessage(String firstLine, String secondLine) {
  lcd.setCursor(0, 0);
  lcd.print(firstLine + "                 ");
  
  lcd.setCursor(0, 1);
  lcd.print(secondLine + "                 ");
}
