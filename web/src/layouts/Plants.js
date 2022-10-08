import PlantAddCard from "./PlantAddCard";
import PlantCard from "./PlantCard";

function Plants({ plants, registerPlant }) {
	let namedPlants = plants.filter((plant) => plant.name != null);
	let unnamedPlants = plants.filter((plant) => plant.name == null);

	return (
		<div className="flex flex-wrap">
			{namedPlants.map((plant) => (
				<PlantCard key={plant.id} plant={plant} />
			))}
			{unnamedPlants.map((plant) => (
				<PlantAddCard
					key={plant.id}
					plant={plant}
					registerPlant={registerPlant}
				/>
			))}
		</div>
	);
}

export default Plants;
