import { useEffect, useState } from "react";
import Plants from "../layouts/Plants";

function PlantsContext() {
	const [plants, setPlants] = useState([]);

	const loadPlants = async () => {
		await fetch(`${process.env.REACT_APP_API_URL}/plants`)
			.then((res) => res.json())
			.then((data) => setPlants(data));
	};

	useEffect(() => {
		loadPlants();

		const interval = setInterval(() => {
			loadPlants();
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	const addPlant = async (id, name) => {
		await fetch(`${process.env.REACT_APP_API_URL}/plants/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name }),
		});

		await loadPlants();
	};

	return (
		<div>{plants && <Plants plants={plants} addPlant={addPlant} />}</div>
	);
}

export default PlantsContext;
