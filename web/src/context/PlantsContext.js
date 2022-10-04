import Plants from "../layouts/Plants";
import { useState, useEffect } from "react";

function PlantsContext() {
	const [plants, setPlants] = useState([]);

	useEffect(() => {
		const loadPlants = () => {
			fetch("http://localhost:7428/plants")
				.then((res) => res.json())
				.then((data) => setPlants(data));
		};

		loadPlants();

		const interval = setInterval(() => {
			loadPlants();
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	return <div>{plants && <Plants plants={plants} />}</div>;
}

export default PlantsContext;
