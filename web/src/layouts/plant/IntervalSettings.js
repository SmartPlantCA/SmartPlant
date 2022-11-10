import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function IntervalSettings({ oldSettings, handleEditSettings }) {
	return (
		<div className="mt-5 px-7 py-5 bg-white rounded-3xl drop-shadow-2xl border-[1px] border-gray-100 hover:scale-110 duration-500 ease-in-out transition-transform">
			<h2 className="text-2xl">
				<FontAwesomeIcon
					icon={faGear}
					className="mr-2 text-blue-500"
					size="sm"
				/>
				Watering Interval
			</h2>
			<div className="w-64 h-52 mt-2">
				<label
					for="toggleC"
					class="flex items-center cursor-pointer select-none"
				>
					<div class="relative">
						<input
							type="checkbox"
							id="toggleC"
							class="sr-only"
							checked={oldSettings.interval.enabled}
							onChange={(e) =>
								handleEditSettings(
									"interval",
									"enabled",
									e.target.checked ? 1 : 0
								)
							}
						/>
						<div class="block bg-gray-600 w-14 h-6 rounded-full"></div>
						<div class="dot absolute left-1 top-1 bg-red-400 w-4 h-4 rounded-full transition"></div>
					</div>
					<div class="ml-3 text-gray-700 font-medium">
						{oldSettings.interval.enabled ? "On" : "Off"}
					</div>
				</label>

				<input
					type="date"
					defaultValue={
						new Date(oldSettings.interval.firstWatering)
							.toISOString()
							.split("T")[0]
					}
					onChange={(e) => {
						handleEditSettings(
							"interval",
							"firstWatering",
							new Date(e.target.value).getTime()
						);
					}}
				/>
				<input
					type="numeric"
					defaultValue={oldSettings.interval.interval}
					onChange={(e) =>
						handleEditSettings(
							"interval",
							"interval",
							Number(e.target.value)
						)
					}
				/>
				<input
					type="numeric"
					defaultValue={oldSettings.interval.length}
					onChange={(e) =>
						handleEditSettings(
							"interval",
							"length",
							Number(e.target.value)
						)
					}
				/>
			</div>
		</div>
	);
}

export default IntervalSettings;
