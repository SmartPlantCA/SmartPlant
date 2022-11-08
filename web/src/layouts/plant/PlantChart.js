import moment from "moment";
import { Area, AreaChart, ResponsiveContainer, Tooltip } from "recharts";

function PlantChart({ name, data }) {
	return (
		<div className="w-96 h-72">
			<h2>{name}</h2>
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
					<Area type="monotone" dataKey="value" stroke="#778be9" fill="#dadff9" strokeWidth={2.5} />
				</AreaChart>
			</ResponsiveContainer>
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

export default PlantChart;
