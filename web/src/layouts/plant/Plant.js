import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";

import moment from "moment";
import PlantSettings from "./PlantSettings";
import Modal from "../../layouts/components/Global/Modal";

function Plant({ plant, updateSettings, updatePlantName }) {
	const [data, setData] = useState([]);
	let [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (plant.humidityHistory !== undefined) {
			let newData = [];

			for (let i = 0; i < plant.humidityHistory.length; i += 60) {
				newData.push(plant.humidityHistory[i]);
			}

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

			<div className="w-96 h-72">
				<h2>Humidity</h2>
				<ResponsiveContainer>
					<AreaChart
						data={data}
						margin={{
							top: 10,
							right: 10,
							left: 10,
							bottom: 10,
						}}
					>
						<Tooltip content={<CustomTooltip />} />
						<Area
							type="monotone"
							dataKey="value"
							stroke="#778be9"
							fill="#dadff9"
							strokeWidth={2.5}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>

			<PlantSettings
				plantSettings={plant.settings}
				updateSettings={updateSettings}
			/>
		</div>
	);
}

function CustomTooltip({ active, payload, label }) {
	if (active && payload) {
		return (
			<div className="bg-white rounded shadow p-4 text-gray-800 text-sm">
				<p>{moment(payload[0].payload.timestamp).format("LLL")}</p>
				<p>{payload[0].payload.value}%</p>
			</div>
		);
	}

	return null;
}

export default Plant;
