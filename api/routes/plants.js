import express from "express";
import { getPlants, getPlant, updatePlantInfo } from "../db/DbUtil.js";

const router = express.Router();

router.get("/", async (req, res) => {
	let plants = await getPlants();
	res.json(plants);
});

router.post("/:id", async (req, res) => {
	const id = req.params.id;
	const name = req.body.name;
	const description = req.body.description;

	let resultCode = await updatePlantInfo(id, name, description);
	res.sendStatus(resultCode);
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;

	let plant = await getPlant(id);
	res.json(plant);
});

export default router;
