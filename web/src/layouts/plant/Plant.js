import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Modal from "../../layouts/components/Global/Modal";
import HumiditySettings from "./HumiditySettings";
import PlantChart from "./PlantChart";
import PlantSettings from "./PlantSettings";

function Plant({ plant, updateSettings, updatePlantName }) {
	const [data, setData] = useState([]);
	const [minimum, setMinimum] = useState([]);
	let [showModal, setShowModal] = useState(false);

	useEffect(() => {
		let history = plant.humidityHistory;

		if (history !== undefined) {
			history.reverse();
			let newData = [];
			let minimumValue = 100;

			for (let i = 0; i < history.length; i += 120) {
				newData.push(history[i]);
				if (history[i].value < minimumValue) minimumValue = history[i].value;
			}
			setMinimum(minimumValue);
			newData.reverse();
			setData(newData);
		}
	}, [plant, updateSettings]);

	const handleEdit = async (text) => {
		await updatePlantName(text);
		setShowModal(false);
	};

	return (
		<div>
			<Modal
				title="Edit plant name"
				message={"Plant Name"}
				onClick={handleEdit}
				showModal={showModal}
				onClose={setShowModal}
			/>

			<div className="flex flex-col items-center">
				<h1 className="text-4xl font-bold tracking-wide">{plant.name}</h1>
				<FontAwesomeIcon
					icon={faEdit}
					size="lg"
					className="text-gray-300 mr-2"
					onClick={() => {
						setShowModal(true);
					}}
				/>
			</div>

			<div className="flex gap-5">
				<PlantChart name="Humidity" data={data} minimum={minimum} />
				<HumiditySettings oldSettings={plant.settings} updateSettings={updateSettings} />
			</div>

			<PlantSettings oldSettings={plant.settings} updateSettings={updateSettings} />
		</div>
	);
}

export default Plant;
