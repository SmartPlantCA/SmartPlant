import {
	faClockRotateLeft,
	faDroplet,
	faPlus,
	faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Moment from "react-moment";
function PlantAddCard({ plant, setShowModal, setModal }) {
	return (
		<>
			<div
				className="mt-10 rounded-lg w-96 h-36 bg-gray-400 text-white text-lg flex mx-2 shadow-lg zoom dark:border-2 dark:border-[#6680FF] dark:bg-inherit relative"
				onClick={() => {
					setShowModal(true);
				}}
			>
				<div className="p-6 filter  w-full">
					<div className="h-full w-20 inline-block mr-5 blur-[2px]">
						<div className="flex justify-center items-center h-full">
							<FontAwesomeIcon icon={faSeedling} size="3x" />
						</div>
					</div>
					<div className="inline-block blur-[2px]">
						<h1 className="text-xl mb-1">{plant.name}</h1>
						<div className="text-base text-left">
							<FontAwesomeIcon icon={faDroplet} size="lg" className="text-cyan-300 mr-2" />
							{plant.lastHumidity}%
						</div>
						<div className="text-base text-left mt-1">
							<FontAwesomeIcon icon={faClockRotateLeft} size="lg" className="text-gray-300 mr-2" />
							<Moment fromNow>{plant.lastWatering === 0 ? "" : plant.lastWatering}</Moment>
						</div>
					</div>

					<FontAwesomeIcon
						icon={faPlus}
						size="2x"
						className="absolute left-0 right-0 mx-auto w-10 top-0 bottom-0 my-auto blur-0"
					/>
				</div>
			</div>
		</>
	);
}

<div className="mt-10 rounded-lg w-96 h-36 bg-gray-400 text-white font-reem p-6 text-lg flex mx-2 zoom dark:bg-inherit dark:text-[#6680FF] dark:border-2 dark:border-[#6680FF]"></div>;
export default PlantAddCard;
