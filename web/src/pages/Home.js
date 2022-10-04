import PlantAddCard from "../layouts/PlantAddCard";
import PlantCard from "../layouts/PlantCard";

function Home() {
	return (
		<div className="ml-40 mt-3 w-auto bg-secondgray/50 mb-3 mr-3 rounded-3xl p-12" id="test">
			<h1 className="font-reem text-4xl font-bold tracking-wide">Overview</h1>
			<div className="flex flex-wrap">
				<PlantCard />
				<PlantCard />
				<PlantCard />
				<PlantCard />
				<PlantCard />
				<PlantCard />
				<PlantCard />
				<PlantCard />
				<PlantCard />
				<PlantCard />
				<PlantCard />
				<PlantCard />
				<PlantCard />
				<PlantCard />
				<PlantCard />
				<PlantCard />
				<PlantCard />
				<PlantCard />
				<PlantAddCard />
			</div>
		</div>
	);
}

export default Home;
