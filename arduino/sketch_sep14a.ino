const int AirValue = 680;
const int WaterValue = 320;
void setup() {
  pinMode(4, OUTPUT); // MOTEUR
  pinMode(A0, INPUT); // HUMIDITY
  Serial.begin(9600);
}

void loop() {
  /*digitalWrite(4, HIGH); 
  delay(400);            
  digitalWrite(4, LOW); 
  delay(400);   */
  int soilMoistureValue = analogRead(A0);
  //Dans l'air il = 686
  // dans l'eau = 0
  int percent = map(soilMoistureValue, AirValue, WaterValue, 0, 100);
  Serial.println(percent);
  delay(250);
}
