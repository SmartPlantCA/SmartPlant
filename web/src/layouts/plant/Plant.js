import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import Modal from "../../layouts/components/Global/Modal";
import HumiditySettings from "./HumiditySettings";
import IntervalSettings from "./IntervalSettings";
import PlantChart from "./PlantChart";
import TotalWater from "./TotalWater";

function Plant({ plant, updateSettings, updatePlantName }) {
	const [humidtyData, setHumidtyData] = useState([]);
	const [oldSettings, setOldSettings] = useState(plant.settings);

	const editTimerRef = useRef(null);
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
			setHumidtyData(newData);
		}
	}, [plant, updateSettings]);

	useEffect(() => {
		if (oldSettings === undefined) setOldSettings(plant.settings);
	}, [plant, oldSettings]);

	const handleEditName = async (text) => {
		await updatePlantName(text);
		setShowModal(false);
	};

	const handleEditSettings = async (type, target, value) => {
		let newValue = {
			...oldSettings,
			[type]: {
				...oldSettings[type],
				[target]: value,
			},
		};

		setOldSettings(newValue);

		clearTimeout(editTimerRef?.current);
		editTimerRef.current = setTimeout(() => updateSettings(newValue), 2000);
	};

	if (!oldSettings) return null;

	return (
		<div>
			<Modal
				title="Edit plant name"
				message={"Plant Name"}
				onClick={handleEditName}
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
				<PlantChart name="Humidity" data={humidtyData} minimum={minimum} />
				<HumiditySettings oldSettings={oldSettings} handleEditSettings={handleEditSettings} />
				<IntervalSettings oldSettings={oldSettings} handleEditSettings={handleEditSettings} />
				<TotalWater plant={plant}></TotalWater>
			</div>
		</div>
	);
}

export default Plant;
