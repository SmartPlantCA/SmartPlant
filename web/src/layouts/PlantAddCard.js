import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PlantAddCard() {
	return (
		<div className="mt-10 rounded-lg w-96 h-36 bg-gray-400 text-white font-reem p-6 text-lg flex mx-2 zoom">
			<FontAwesomeIcon icon={faPlus} size="2x" className="m-auto" />
		</div>
	);
}
export default PlantAddCard;
