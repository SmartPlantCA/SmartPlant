import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";

import moment from "moment";
import PlantSettings from "./PlantSettings";

function Plant({ plant, updateSettings }) {
	const [data, setData] = useState([]);

	useEffect(() => {
		if (plant.humidityHistory !== undefined) {
			let newData = [];

			for (let i = 0; i < plant.humidityHistory.length; i += 60) {
				newData.push(plant.humidityHistory[i]);
			}

			setData(newData);
		}
	}, [plant]);

	return (
		<div>
			<h1 className="text-4xl font-bold tracking-wide">{plant.name}</h1>

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

			<PlantSettings plant={plant} updateSettings={updateSettings} />
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
