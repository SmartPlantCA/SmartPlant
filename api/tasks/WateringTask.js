import { getPlantsToWater } from "../db/DbUtil.js";

const lookupPlants = async (mqttClient) => {
	let plants = await getPlantsToWater();

	if (plants.length < 1) return;

	console.log("Watering plants : ", plants);

	for (let plant of plants) {
		mqttClient.publish(`smartplant/${plant.id}/pump`, "1", {
			retain: true,
		});

		setTimeout(() => {
			mqttClient.publish(`smartplant/${plant.id}/pump`, "0", {
				retain: true,
			});
			console.log("Watering done for plant : ", plant.id);
		}, plant.length);
	}
};

export { lookupPlants };
