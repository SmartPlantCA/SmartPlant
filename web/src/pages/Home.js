import PlantsContext from "../context/PlantsContext";

function Home() {
	return (
		<div>
			<h1 className="text-4xl font-bold tracking-wide">Overview</h1>
			<PlantsContext />
		</div>
	);
}

export default Home;
