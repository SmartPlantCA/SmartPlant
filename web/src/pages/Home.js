import { useEffect } from "react";
import PlantsContext from "../context/PlantsContext";
import InitialTransition from "../layouts/components/Initial/InitialTransition";

function Home({ firstRender, setFirst }) {
	useEffect(() => {
		if (firstRender) {
			setTimeout(() => {
				setFirst(false);
			}, 3000);
		}
	}, [setFirst, firstRender]);

	return (
		<div>
			{firstRender ? <InitialTransition /> : null}
			<h1 className="text-4xl font-bold tracking-wide">Overview test</h1>
			<PlantsContext />
		</div>
	);
}

export default Home;
