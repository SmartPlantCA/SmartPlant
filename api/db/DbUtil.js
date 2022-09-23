import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./db/plant.sqlite");

const setupDb = () => {
	db.serialize(() => {
		db.run(
			"CREATE TABLE IF NOT EXISTS plants (id TEXT PRIMARY KEY, name TEXT, description TEXT)"
		);
		db.run(
			"CREATE TABLE IF NOT EXISTS humidity (id INTEGER, timestamp INTEGER, value INTEGER, FOREIGN KEY(id) REFERENCES plants(id))"
		);
	});
};

const getPlants = async () => {
	return await new Promise((resolve, reject) => {
		db.all("SELECT * FROM plants", (err, rows) => {
			if (err) reject(err);
			else resolve(rows);
		});
	});
};

const getPlant = async (id) => {
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

	return plant;
};

const updatePlantInfo = async (id, name, description) => {
	let plant = await new Promise((resolve, reject) => {
		db.get("SELECT * FROM plants WHERE id = ?", id, (err, row) => {
			if (err) reject(err);
			else resolve(row);
		});
	});

	if (plant === undefined) return 404;

	db.run(
		"UPDATE plants SET name = ?, description = ? WHERE id = ?",
		name,
		description,
		id
	);

	return 200;
};

const insertHumidity = async (id, value) => {
	db.serialize(() => {
		db.run(
			"INSERT INTO plants (id) VALUES (?) ON CONFLICT(id) DO NOTHING",
			idPlant
		);

		db.run(
			"INSERT INTO humidity (id, timestamp, value) VALUES (?, ?, ?)",
			idPlant,
			Date.now(),
			humidity
		);
	});

	console.log(`ID: ${id} - Humdity: ${value}`);
};

const getPlantsToWater = async () => {
	return await new Promise((resolve, reject) => {
		db.all(
			"SELECT id, name, description FROM plants WHERE id IN (SELECT id FROM humidity WHERE timestamp > ? AND value < 50 GROUP BY id)",
			Date.now() - 1000 * 60, // Dernière requête doit être de moins d'une minute
			(err, rows) => {
				if (err) reject(err);
				else resolve(rows);
			}
		);
	});
};

setupDb();
export {
	setupDb,
	getPlants,
	getPlant,
	updatePlantInfo,
	insertHumidity,
	getPlantsToWater,
};
