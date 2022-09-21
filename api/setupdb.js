import sqlite3 from "sqlite3";
const sqlite = sqlite3.verbose();
const db = new sqlite.Database("plant.db");

db.serialize(() => {
	db.run(
		"CREATE TABLE IF NOT EXISTS humidity (id INTEGER PRIMARY KEY AUTOINCREMENT, idPlant INTEGER, timestamp INTEGER, value INTEGER)"
	);
	db.run(
		"CREATE TABLE IF NOT EXISTS plants (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT)"
	);
});

db.close();
