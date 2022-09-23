import { getPlantsToWater } from "../db/DbUtil.js";

const lookupPlants = async (mqttClient) => {
	let plants = getPlantsToWater();

	plants.forEach((plant) => {
		mqttClient.publish(`smartplant/${plant.id}/water`, "1");
	});

	await new Promise((resolve) => setTimeout(resolve, 15 * 1000)); // wait 15 seconds

	plants.forEach((plant) => {
		mqttClient.publish(`smartplant/${plant.id}/water`, "0");
	});
};

export { lookupPlants };
