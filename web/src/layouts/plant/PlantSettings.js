import { useEffect, useState } from "react";

function PlantSettings({ plantSettings, updateSettings }) {
	const [settings, setSettings] = useState(plantSettings);

	useEffect(() => {
		if (settings === undefined) setSettings(plantSettings);
	}, [plantSettings, settings]);

	const handleChange = (type, target, value) => {
		setSettings({
			...settings,
			[type]: {
				...settings[type],
				[target]: value,
			},
		});
	};

	return (
		<div>
			{settings && (
				<div>
					<div>
						<h2>Humidity Check</h2>
						<input
							type="checkbox"
							checked={settings.humidity.enabled}
							onChange={(e) =>
								handleChange(
									"humidity",
									"enabled",
									e.target.checked ? 1 : 0
								)
							}
						/>
						<input
							type="numeric"
							value={settings.humidity.humidity}
							onChange={(e) =>
								handleChange(
									"humidity",
									"humidity",
									e.target.value
								)
							}
						/>
					</div>

					<div>
						<h2>Interval Watering</h2>
						<input
							type="checkbox"
							checked={settings.interval.enabled}
							onChange={(e) =>
								handleChange(
									"interval",
									"enabled",
									e.target.checked ? 1 : 0
								)
							}
						/>
						<input
							type="date"
							value={settings.interval.firstWatering}
							onChange={(e) =>
								handleChange(
									"interval",
									"firstWatering",
									e.target.value
								)
							}
						/>
						<input
							type="numeric"
							value={settings.interval.interval}
							onChange={(e) =>
								handleChange(
									"interval",
									"interval",
									e.target.value
								)
							}
						/>
						<input
							type="numeric"
							value={settings.interval.length}
							onChange={(e) =>
								handleChange(
									"interval",
									"length",
									e.target.value
								)
							}
						/>
					</div>

					<button onClick={() => updateSettings(settings)}>
						Save
					</button>
				</div>
			)}
		</div>
	);
}

export default PlantSettings;
