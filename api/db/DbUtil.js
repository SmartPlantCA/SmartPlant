import sqlite3 from "sqlite3";
const db = new sqlite3.Database("./db/plant.sqlite");

const setupDb = () => {
	db.serialize(() => {
		db.run(
			"CREATE TABLE IF NOT EXISTS plants (id TEXT PRIMARY KEY, name TEXT)"
		);
		db.run(
			"CREATE TABLE IF NOT EXISTS humidity (id INTEGER, timestamp INTEGER, value INTEGER, FOREIGN KEY(id) REFERENCES plants(id))"
		);

		db.run(
			"CREATE TABLE IF NOT EXISTS watering (id INTEGER, timestamp INTEGER, length INTEGER, FOREIGN KEY(id) REFERENCES plants(id))"
		);

		db.run(
			"CREATE TABLE IF NOT EXISTS humidityWatering (id TEXT PRIMARY KEY, humidity INTEGER, enabled INTEGER, FOREIGN KEY(id) REFERENCES plants(id))"
		);
		db.run(
			"CREATE TABLE IF NOT EXISTS intervalWatering (id TEXT PRIMARY KEY, firstWatering INTEGER, interval INTEGER, length INTEGER, enabled INTEGER, FOREIGN KEY(id) REFERENCES plants(id))"
		);
	});
};

const getPlants = async () => {
	let plantList = await new Promise((resolve, reject) => {
		db.all("SELECT * FROM plants", (err, rows) => {
			if (err) reject(err);
			else resolve(rows);
		});
	});

	for (let i = 0; i < plantList.length; i++) {
		let plant = plantList[i];

		let lastWatering = await new Promise((resolve, reject) => {
			db.get(
				"SELECT timestamp FROM watering WHERE id = ? ORDER BY timestamp DESC LIMIT 1",
				plant.id,
				(err, row) => {
					if (err) reject(err);
					else resolve(row);
				}
			);
		});

		plant.lastWatering = lastWatering?.timestamp || 0;

		let lastHumidty = await new Promise((resolve, reject) => {
			db.get(
				"SELECT value FROM humidity WHERE id = ? ORDER BY timestamp DESC LIMIT 1",
				plant.id,
				(err, row) => {
					if (err) reject(err);
					else resolve(row);
				}
			);
		});

		plant.lastHumidity = lastHumidty.value || 0;
	}

	return plantList;
};

const getPlant = async (id) => {
	let plant = await new Promise((resolve, reject) => {
		db.get("SELECT * FROM plants WHERE id = ?", id, (err, row) => {
			if (err) reject(err);
			else resolve(row);
		});
	});

	if (plant === undefined) return plant;

	let humiditySettings = await new Promise((resolve, reject) => {
		db.get(
			"SELECT humidity, enabled FROM humidityWatering WHERE id = ?",
			id,
			(err, row) => {
				if (err) reject(err);
				else resolve(row);
			}
		);
	});

	let intervalSettings = await new Promise((resolve, reject) => {
		db.get(
			"SELECT firstWatering, interval, length, enabled FROM intervalWatering WHERE id = ?",
			id,
			(err, row) => {
				if (err) reject(err);
				else resolve(row);
			}
		);
	});

	plant.settings = {
		humidity: humiditySettings,
		interval: intervalSettings,
	};

	let humidityHistory = await new Promise((resolve, reject) => {
		db.all(
			"SELECT timestamp, value FROM humidity WHERE id = ? ORDER BY timestamp DESC LIMIT 4320",
			id,
			(err, rows) => {
				if (err) reject(err);
				else resolve(rows);
			}
		);
	});

	humidityHistory.reverse();
	plant.humidityHistory = humidityHistory;

	let wateringHistory = await new Promise((resolve, reject) => {
		db.all(
			"SELECT timestamp, length FROM watering WHERE id = ? ORDER BY timestamp DESC LIMIT 4320",
			id,
			(err, rows) => {
				if (err) reject(err);
				else resolve(rows);
			}
		);
	});

	wateringHistory.reverse();
	plant.wateringHistory = wateringHistory;

	return plant;
};

const updatePlantInfo = async (id, name) => {
	let plant = await new Promise((resolve, reject) => {
		db.get("SELECT * FROM plants WHERE id = ?", id, (err, row) => {
			if (err) reject(err);
			else resolve(row);
		});
	});

	if (plant === undefined) return 404;

	db.run("UPDATE plants SET name = ? WHERE id = ?", name, id);

	return 200;
};

const updatePlantSettings = async (id, humiditySettings, intervalSettings) => {
	let plant = await new Promise((resolve, reject) => {
		db.get("SELECT * FROM plants WHERE id = ?", id, (err, row) => {
			if (err) reject(err);
			else resolve(row);
		});
	});

	if (plant === undefined) return 404;

	if (
		humiditySettings === undefined ||
		humiditySettings.humidity === undefined ||
		!Number.isInteger(humiditySettings.humidity) ||
		humiditySettings.enabled === undefined ||
		(humiditySettings.enabled !== 0 && humiditySettings.enabled !== 1) ||
		intervalSettings === undefined ||
		intervalSettings.firstWatering === undefined ||
		!Number.isInteger(intervalSettings.firstWatering) ||
		intervalSettings.interval === undefined ||
		!Number.isInteger(intervalSettings.interval) ||
		intervalSettings.length === undefined ||
		!Number.isInteger(intervalSettings.length) ||
		intervalSettings.enabled === undefined ||
		(intervalSettings.enabled !== 0 && intervalSettings.enabled !== 1)
	)
		return 400;

	db.run(
		"INSERT OR REPLACE INTO humidityWatering (id, humidity, enabled) VALUES (?, ?, ?)",
		id,
		humiditySettings.humidity,
		humiditySettings.enabled
	);

	db.run(
		"INSERT OR REPLACE INTO intervalWatering (id, firstWatering, interval, length, enabled) VALUES (?, ?, ?, ?, ?)",
		id,
		intervalSettings.firstWatering,
		intervalSettings.interval,
		intervalSettings.length,
		intervalSettings.enabled
	);

	return 200;
};

const insertHumidity = async (idPlant, humidity, timestamp) => {
	db.serialize(() => {
		db.run(
			"INSERT INTO plants (id) VALUES (?) ON CONFLICT(id) DO NOTHING",
			idPlant
		);

		db.run(
			"INSERT INTO humidityWatering (id, humidity, enabled) VALUES (?, ?, ?) ON CONFLICT(id) DO NOTHING",
			idPlant,
			75,
			1
		);

		db.run(
			"INSERT INTO intervalWatering (id, firstWatering, interval, length, enabled) VALUES (?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING",
			idPlant,
			Date.now(),
			1000 * 60 * 60 * 24,
			1000 * 30,
			0
		);

		db.run(
			"INSERT INTO humidity (id, timestamp, value) VALUES (?, ?, ?)",
			idPlant,
			timestamp || Date.now(),
			humidity
		);
	});
};

const getPlantsToWater = async () => {
	let plants = [];

	/* Watering based on humidity */
	let humidityWatering = await new Promise((resolve, reject) => {
		db.all(
			"SELECT id, humidity FROM humidityWatering WHERE enabled = 1",
			(err, rows) => {
				if (err) reject(err);
				else resolve(rows);
			}
		);
	});

	for (let plant of humidityWatering) {
		let humidity = await new Promise((resolve, reject) => {
			db.get(
				"SELECT value FROM humidity WHERE id = ? AND timestamp > ? ORDER BY timestamp DESC LIMIT 1",
				plant.id,
				Date.now() - 1000 * 60,
				(err, row) => {
					if (err) reject(err);
					else resolve(row);
				}
			);
		});

		if (humidity === undefined) continue;

		if (humidity.value < plant.humidity) {
			let length = 1000 * 15;

			db.run(
				"INSERT INTO watering (id, timestamp, length) VALUES (?, ?, ?)",
				plant.id,
				Date.now(),
				length
			);

			plants.push({ id: plant.id, length: length });
		}
	}

	/* Watering based on interval */
	let intervalWatering = await new Promise((resolve, reject) => {
		db.all(
			"SELECT id, firstWatering, interval, length FROM intervalWatering WHERE enabled = 1",
			(err, rows) => {
				if (err) reject(err);
				else resolve(rows);
			}
		);
	});

	for (let plant of intervalWatering) {
		let lastWatering = await new Promise((resolve, reject) => {
			db.get(
				"SELECT timestamp FROM watering WHERE id = ? ORDER BY timestamp DESC LIMIT 1",
				plant.id,
				(err, row) => {
					if (err) reject(err);
					else resolve(row);
				}
			);
		});

		let lastWateringTimestamp =
			lastWatering === undefined
				? plant.firstWatering
				: lastWatering.timestamp;

		if (Date.now() - lastWateringTimestamp > plant.interval) {
			db.run(
				"INSERT INTO watering (id, timestamp, length) VALUES (?, ?, ?)",
				plant.id,
				Date.now(),
				plant.length
			);

			plants.push({ id: plant.id, length: plant.length });
		}
	}

	return plants;
};

setupDb();
export {
	setupDb,
	getPlants,
	getPlant,
	updatePlantInfo,
	insertHumidity,
	getPlantsToWater,
	updatePlantSettings,
};
