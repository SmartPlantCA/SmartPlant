import { getPlantsToWater } from "../db/DbUtil.js";

const lookupPlants = async (mqttClient) => {
	let plants = getPlantsToWater();

	if (plants.length === 0) return;

	console.log("Watering plants : ", plants);

	for (let plant of plants)
		mqttClient.publish(`smartplant/${plant.id}/water`, "1");

	await new Promise((resolve) => setTimeout(resolve, 15 * 1000)); // wait 15 seconds

	for (let plant of plants)
		mqttClient.publish(`smartplant/${plant.id}/water`, "0");
};

export { lookupPlants };
