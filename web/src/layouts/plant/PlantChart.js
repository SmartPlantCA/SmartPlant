import moment from "moment";
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";

function PlantChart({ name, data, minimum }) {
	return (
		<div className="dark:bg-dark mt-5 px-7 py-5 bg-white rounded-3xl drop-shadow-2xl border-[1px] border-gray-100 hover:scale-110 duration-500 ease-in-out transition-transform">
			<h2 className="text-2xl">{name}</h2>
			<div className="w-64 h-52">
				<ResponsiveContainer>
					<AreaChart
						data={data}
						margin={{
							top: 10,
							bottom: 10,
						}}
					>
						<Tooltip content={<CustomTooltip />} />
						<YAxis
							type="number"
							domain={[minimum - 5, "dataMax"]}
							width={25}
						/>
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
