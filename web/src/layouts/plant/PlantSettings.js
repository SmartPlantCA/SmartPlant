import { useState } from "react";

function PlantSettings({ plant, updateSettings }) {
	const [settings, setSettings] = useState(plant.settings);
	console.log(settings);

	const handleChange = (e) => {
		console.log(e.target.name);
		console.log(e.target.value);

		setSettings({
			...settings,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<div>
			{plant.settings && (
				<div>
					<div>
						<h2>Humidity Check</h2>
						<input
							type="numeric"
							value={plant.settings.humidity.humidity}
							onChange={handleChange}
						/>
						<input
							type="checkbox"
							checked={plant.settings.humidity.enabled}
							onChange={handleChange}
						/>
					</div>

					<div>
						<h2>Interval Watering</h2>
						<input
							type="date"
							value={plant.settings.interval.firstWatering}
							onChange={handleChange}
						/>
						<input
							type="numeric"
							value={plant.settings.interval.interval}
							onChange={handleChange}
						/>
						<input
							type="numeric"
							value={plant.settings.interval.length}
							onChange={handleChange}
						/>
						<input
							type="checkbox"
							checked={plant.settings.interval.enabled}
							onChange={handleChange}
						/>
					</div>

					<button onClick={() => updateSettings(plant.settings)}>
						Save
					</button>
				</div>
			)}
		</div>
	);
}

export default PlantSettings;
