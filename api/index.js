import cors from "cors";
import express from "express";
import mqtt from "mqtt";
import sqlite3 from "sqlite3";
var corsOptions = {
	origin: ["https://smartplant.mqrco.xyz"],
};

const mqttClient = mqtt.connect("mqtt://broker.hivemq.com:1883");
mqttClient.subscribe("plant01/humidity");
const sqlite = sqlite3.verbose();
const db = new sqlite.Database("plant.db");

mqttClient.on("message", (topic, message) => {
	console.log("Received message: " + message.toString() + " on topic: " + topic);
});

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
	res.send(".");
});

app.listen(7428, () => console.log("SmartPlant API is running on port 7428"));
