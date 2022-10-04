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
		origin: ["https://smartplant.mqrco.xyz", "http://localhost:3000"],
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
}, 1000 * 60 * 5); // every 5 minute

/*const testData = () => {
	let idPlant = "TEST";
	let timestamp = new Date().setDate(new Date().getDate() - 7);

	let s = 0;

	while (s != 180) {
		var y = Math.sin((s * Math.PI) / 180);
		let b = 0;
		while (b != 10) {
			insertHumidity(idPlant, Math.floor(y * 100), timestamp);
			timestamp += 1000 * 60 * 1;
			b++;
		}

		timestamp += 1000 * 60 * 1;
		insertHumidity(idPlant, Math.floor(y * 100), timestamp);

		s++;
	}
};

testData();*/

app.listen(7428, () => console.log("SmartPlant API is running on port 7428"));
