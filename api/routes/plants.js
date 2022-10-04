import express from "express";
import {
	getPlants,
	getPlant,
	updatePlantInfo,
	updatePlantSettings,
} from "../db/DbUtil.js";

const router = express.Router();

router.get("/", async (req, res) => {
	let plants = await getPlants();

	if (plants === undefined) res.sendStatus(400);
	else res.json(plants);
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;

	let plant = await getPlant(id);
	res.json(plant);
});

router.put("/:id", async (req, res) => {
	const id = req.params.id;
	const name = req.body.name;

	let resultCode = await updatePlantInfo(id, name);
	res.sendStatus(resultCode);
});

router.put("/:id/settings", async (req, res) => {
	const id = req.params.id;
	const humiditySettings = req.body.humidity;
	const intervalSettings = req.body.interval;

	let resultCode = await updatePlantSettings(
		id,
		humiditySettings,
		intervalSettings
	);
	res.sendStatus(resultCode);
});

export default router;
