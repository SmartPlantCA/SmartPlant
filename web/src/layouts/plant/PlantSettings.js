import { useEffect, useState } from "react";

function PlantSettings({ oldSettings, updateSettings }) {
	const [settings, setSettings] = useState(oldSettings);

	useEffect(() => {
		if (settings === undefined) setSettings(oldSettings);
	}, [oldSettings, settings]);

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
							onChange={(e) => handleChange("humidity", "enabled", e.target.checked ? 1 : 0)}
						/>
						<input
							type="numeric"
							defaultValue={settings.humidity.humidity}
							onChange={(e) => handleChange("humidity", "humidity", Number(e.target.value))}
						/>
					</div>

					<div className="grid grid-cols-1">
						<h2>Interval Watering</h2>
						<input
							type="checkbox"
							checked={settings.interval.enabled}
							onChange={(e) => handleChange("interval", "enabled", e.target.checked ? 1 : 0)}
						/>
						<input
							type="date"
							defaultValue={new Date(settings.interval.firstWatering).toISOString().split("T")[0]}
							onChange={(e) => {
								handleChange("interval", "firstWatering", new Date(e.target.value).getTime());
							}}
						/>
						<input
							type="numeric"
							defaultValue={settings.interval.interval}
							onChange={(e) => handleChange("interval", "interval", Number(e.target.value))}
						/>
						<input
							type="numeric"
							defaultValue={settings.interval.length}
							onChange={(e) => handleChange("interval", "length", Number(e.target.value))}
						/>
					</div>

					<button onClick={() => updateSettings(settings)}>Save</button>
				</div>
			)}
		</div>
	);
}

export default PlantSettings;
