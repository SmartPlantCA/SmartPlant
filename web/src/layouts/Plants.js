import { useEffect, useRef } from "react";
import PlantAddCard from "./PlantAddCard";
import PlantCard from "./PlantCard";

function Plants({ plants, setShowModal, setModal }) {
	let namedPlants = useRef(plants.filter((plant) => plant.name != null));
	let unnamedPlants = useRef(plants.filter((plant) => plant.name == null));

	useEffect(() => {
		namedPlants.current = plants.filter((plant) => plant.name != null);
		unnamedPlants.current = plants.filter((plant) => plant.name == null);
	}, [plants]);

	return (
		<div className="flex flex-wrap">
			{namedPlants.current.map((plant) => (
				<PlantCard key={plant.id} plant={plant} />
			))}
			{unnamedPlants.current.map((plant) => (
				<PlantAddCard
					key={plant.id}
					plant={plant}
					setShowModal={setShowModal}
					setModal={setModal}
				/>
			))}
		</div>
	);
}

export default Plants;
