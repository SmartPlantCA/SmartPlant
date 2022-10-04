import PlantAddCard from "./PlantAddCard";
import PlantCard from "./PlantCard";

function Plants({ plants }) {
	return (
		<div className="flex flex-wrap">
			{plants.map((plant) => (
				<PlantCard key={plant.id} plant={plant} />
			))}
			<PlantAddCard />
		</div>
	);
}

export default Plants;
