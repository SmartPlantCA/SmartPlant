import Plant from "../layouts/plant/Plant";
import { useState, useEffect } from "react";

function PlantContext({ plantId }) {
	const [plant, setPlant] = useState({});

	const loadPlant = async (id) => {
		await fetch(`${process.env.REACT_APP_API_URL}/plants/${id}`)
			.then((res) => res.json())
			.then((data) => setPlant(data));
	};

	useEffect(() => {
		loadPlant(plantId);

		const interval = setInterval(() => {
			loadPlant(plantId);
		}, 5000);
		return () => clearInterval(interval);
	}, [plantId]);

	const updatePlantName = async (name) => {
		await fetch(`${process.env.REACT_APP_API_URL}/plants/${plantId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name }),
		});

		await loadPlant(plantId);
	};

	const updateSettings = async (settings) => {
		setPlant({
			...plant,
			settings: {
				...plant.settings,
				...settings,
			},
		});

		let response = await fetch(
			`${process.env.REACT_APP_API_URL}/plants/${plantId}/settings`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(settings),
			}
		);

		if (response.status === 200) {
			alert("Settings updated");
		} else {
			alert("Something went wrong");
		}
	};

	return (
		<div>
			{plant && (
				<Plant
					plant={plant}
					updateSettings={updateSettings}
					updatePlantName={updatePlantName}
				/>
			)}
		</div>
	);
}

export default PlantContext;
