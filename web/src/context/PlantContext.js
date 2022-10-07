import Plant from "../layouts/plant/Plant";
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

	const updateSettings = async (settings) => {
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
			{plant && <Plant plant={plant} updateSettings={updateSettings} />}
		</div>
	);
}

export default PlantContext;
