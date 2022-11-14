import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HumiditySettings({ oldSettings, handleEditSettings }) {
	return (
		<div className="mt-5 px-7 py-5 bg-white rounded-3xl drop-shadow-2xl border-[1px] border-gray-100 hover:scale-110 duration-500 ease-in-out transition-transform">
			<h2 className="text-2xl">
				<FontAwesomeIcon icon={faGear} className="mr-2 text-blue-500" size="sm" />
				Watering Threshold
			</h2>
			<div className="w-64 h-52 mt-2">
				<label for="toggleB" class="flex items-center cursor-pointer select-none mb-2">
					Enabled
					<div class="ml-2 relative">
						<input
							type="checkbox"
							id="toggleB"
							class="sr-only"
							checked={oldSettings.humidity.enabled}
							onChange={(e) => handleEditSettings("humidity", "enabled", e.target.checked ? 1 : 0)}
						/>
						<div class="block bg-gray-600 w-14 h-6 rounded-full"></div>
						<div class="dot absolute left-1 top-1 bg-red-400 w-4 h-4 rounded-full transition"></div>
					</div>
					<div class="ml-3 text-gray-700 font-medium">
						{oldSettings.humidity.enabled ? "On" : "Off"}
					</div>
				</label>
				<div className="w-full">
					<label for="numberPErcentage" className="inline-block">
						Percentage
					</label>
					<input
						type="number"
						className=" rounded-full border-[1px] border-gray-400 px-3 inline-block w-auto"
						defaultValue={oldSettings.humidity.humidity}
						id="numberPErcentage"
						onChange={(e) => handleEditSettings("humidity", "humidity", Number(e.target.value))}
					/>
					<h2 className="mt-2 text-xs text-gray-400">
						The plant will be watered when the humidity is below this percentage.
					</h2>
				</div>
			</div>
		</div>
	);
}

export default HumiditySettings;
