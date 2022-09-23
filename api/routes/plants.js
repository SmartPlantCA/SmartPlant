import express from "express";
import sqlite3 from "sqlite3";

const router = express.Router();
const db = new sqlite3.Database("./db/plant.sqlite");

router.get("/", async (req, res) => {
	let plants = await new Promise((resolve, reject) => {
		db.all("SELECT * FROM plants", (err, rows) => {
			if (err) reject(err);
			else resolve(rows);
		});
	});

	res.json(plants);
});

router.post("/:id", async (req, res) => {
	const id = req.params.id;
	const name = req.body.name;
	const description = req.body.description;

	let plant = await new Promise((resolve, reject) => {
		db.get("SELECT * FROM plants WHERE id = ?", id, (err, row) => {
			if (err) reject(err);
			else resolve(row);
		});
	});

	if (plant === undefined) {
		res.sendStatus(404);
		return;
	}

	db.run(
		"UPDATE plants SET name = ?, description = ? WHERE id = ?",
		name,
		description,
		id
	);

	res.sendStatus(200);
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;

	let plant = await new Promise((resolve, reject) => {
		db.get("SELECT * FROM plants WHERE id = ?", id, (err, row) => {
			if (err) reject(err);
			else resolve(row);
		});
	});

	if (plant === undefined) {
		res.sendStatus(404);
		return;
	}

	let history = await new Promise((resolve, reject) => {
		db.all(
			"SELECT timestamp, value FROM humidity WHERE id = ? ORDER BY timestamp DESC",
			id,
			(err, rows) => {
				if (err) reject(err);
				else resolve(rows);
			}
		);
	});

	plant.humidityHistory = history;

	res.json(plant);
});

export default router;
