import {
	faClockRotateLeft,
	faDroplet,
	faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";

function PlantCard({ plant }) {
	let navigate = useNavigate();
	return (
		<div
			className="mt-10 rounded-lg w-96 h-36 bg-darkgreen text-white p-6 text-lg flex mx-2 shadow-lg zoom"
			onClick={() => navigate(`/${plant.id}`)}
		>
			<div className="h-full w-20 inline-block mr-5">
				<div className="flex justify-center items-center h-full">
					<FontAwesomeIcon icon={faSeedling} size="3x" />
				</div>
			</div>
			<div className="inline-block">
				<h1 className="text-xl mb-1">{plant.name}</h1>
				<div className="text-base text-left">
					<FontAwesomeIcon
						icon={faDroplet}
						size="lg"
						className="text-cyan-300 mr-2"
					/>
					{plant.lastHumidity}%
				</div>
				<div className="text-base text-left mt-1">
					<FontAwesomeIcon
						icon={faClockRotateLeft}
						size="lg"
						className="text-gray-300 mr-2"
					/>
					<Moment fromNow>
						{plant.lastWatering === 0 ? "" : plant.lastWatering}
					</Moment>
				</div>
			</div>
		</div>
	);
}
export default PlantCard;
