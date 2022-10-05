import { useEffect, useState } from "react";
import Plants from "../layouts/Plants";

function PlantsContext({ setShowModal, setModal }) {
	const [plants, setPlants] = useState([]);

	useEffect(() => {
		const loadPlants = () => {
			fetch(`${process.env.REACT_APP_API_URL}/plants`)
				.then((res) => res.json())
				.then((data) => setPlants(data));
		};

		loadPlants();

		const interval = setInterval(() => {
			loadPlants();
		}, 5000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div>
			{plants && <Plants plants={plants} setShowModal={setShowModal} setModal={setModal} />}
		</div>
	);
}

export default PlantsContext;
