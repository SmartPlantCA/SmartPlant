import Plant from "./../layouts/Plant";
import { useState, useEffect } from "react";

function PlantContext({ plantId }) {
	const [plant, setPlant] = useState({});

	useEffect(() => {
		const loadPlant = () => {
			fetch(`${process.env.REACT_APP_API_URL}/plants/${plantId}`)
				.then((res) => res.json())
				.then((data) => setPlant(data));
		};

		loadPlant();

		const interval = setInterval(() => {
			loadPlant();
		}, 5000);
		return () => clearInterval(interval);
	}, [plantId]);

	const uploadSettings = () => {
		fetch(`${process.env.REACT_APP_API_URL}/plants/${plantId}/settings`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(plant.settings),
		});
	};

	const setSettings = (settings) => {
		setPlant({ ...plant, settings });
	};

	return (
		<div>
			{plant && (
				<Plant
					plant={plant}
					setSettings={setSettings}
					uploadSettings={uploadSettings}
				/>
			)}
		</div>
	);
}

export default PlantContext;
