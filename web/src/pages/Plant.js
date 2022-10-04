import PlantContext from "../context/PlantContext";
import { useParams } from "react-router-dom";

function Plant() {
	const { plantId } = useParams();

	return (
		<div>
			<PlantContext plantId={plantId} />
		</div>
	);
}

export default Plant;
