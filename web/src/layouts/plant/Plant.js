import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import PlantSettings from "./PlantSettings";
import Modal from "../../layouts/components/Global/Modal";
import PlantChart from "./PlantChart";

function Plant({ plant, updateSettings, updatePlantName }) {
	const [data, setData] = useState([]);
	let [showModal, setShowModal] = useState(false);

	useEffect(() => {
		let history = plant.humidityHistory;

		if (history !== undefined) {
			history.reverse();
			let newData = [];

			for (let i = 0; i < history.length; i += 60)
				newData.push(history[i]);

			newData.reverse();
			setData(newData);
		}
	}, [plant]);

	const handleEdit = async (text) => {
		await updatePlantName(text);
		setShowModal(false);
	};

	return (
		<div>
			<Modal
				title="Edit plant name"
				message={"Please enter the new name for your plant"}
				onClick={handleEdit}
				showModal={showModal}
				onClose={setShowModal}
			/>

			<div className="flex flex-col items-center">
				<h1 className="text-4xl font-bold tracking-wide">
					{plant.name}
				</h1>
				<FontAwesomeIcon
					icon={faEdit}
					size="lg"
					className="text-gray-300 mr-2"
					onClick={() => {
						setShowModal(true);
					}}
				/>
			</div>

			<PlantChart name="Humidity" data={data} />

			<PlantSettings
				plantSettings={plant.settings}
				updateSettings={updateSettings}
			/>
		</div>
	);
}

export default Plant;
