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
	db.close();
};

export { setupDb };
