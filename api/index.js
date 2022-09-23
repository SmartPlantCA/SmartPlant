import cors from "cors";
import express from "express";
import mqtt from "mqtt";
import { insertHumidity } from "./db/DbUtil.js";
import { lookupPlants } from "./tasks/WateringTask.js";

import plantsRouter from "./routes/plants.js";

/* Setup EXPRESS-JS */
const app = express();

app.use(
	cors({
		origin: ["https://smartplant.mqrco.xyz"],
	})
);
app.use(express.json());
app.use("/plants", plantsRouter);
app.get("/", (req, res) => {
	res.redirect("https://smartplant.mqrco.xyz");
});

/* Setup MQTT */
const mqttClient = mqtt.connect("mqtt://broker.hivemq.com:1883");
mqttClient.subscribe("smartplant/+/humidity");

mqttClient.on("message", (topic, message) => {
	const idPlant = topic.split("/")[1];
	const humidity = parseInt(message.toString());

	insertHumidity(idPlant, humidity);
});

setInterval(() => {
	lookupPlants(mqttClient);
}, 1000 * 60); // every minute

app.listen(7428, () => console.log("SmartPlant API is running on port 7428"));
