import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function IntervalSettings({ oldSettings, handleEditSettings }) {
	return (
		<div className="mt-5 px-7 py-5 bg-white rounded-3xl drop-shadow-2xl border-[1px] border-gray-100 hover:scale-110 duration-500 ease-in-out transition-transform">
			<h2 className="text-2xl">
				<FontAwesomeIcon icon={faGear} className="mr-2 text-blue-500" size="sm" />
				Watering Interval
			</h2>
			<div className="w-64 h-54 mt-2">
				<label for="toggleC" class="flex items-center cursor-pointer select-none">
					Enabled
					<div className="relative ml-2">
						<input
							type="checkbox"
							id="toggleC"
							className="sr-only "
							checked={oldSettings.interval.enabled}
							onChange={(e) => handleEditSettings("interval", "enabled", e.target.checked ? 1 : 0)}
						/>
						<div class="block bg-gray-600 w-14 h-6 rounded-full"></div>
						<div class="dot absolute left-1 top-1 bg-red-400 w-4 h-4 rounded-full transition"></div>
					</div>
					<div class="ml-3 text-gray-700 font-medium">
						{oldSettings.interval.enabled ? "On" : "Off"}
					</div>
				</label>
				<label className="block mt-1">Start Date</label>
				<input
					type="date"
					className="rounded-full border-[1px] border-gray-400 px-3"
					defaultValue={new Date(oldSettings.interval.firstWatering).toISOString().split("T")[0]}
					onChange={(e) => {
						handleEditSettings("interval", "firstWatering", new Date(e.target.value).getTime());
					}}
				/>
				<h2 className="mt-1 text-xs text-gray-400">The date to use for the values below</h2>

				<label className="block mt-1">Interval</label>
				<input
					type="number"
					defaultValue={oldSettings.interval.interval}
					className="rounded-full border-[1px] border-gray-400 px-3"
					onChange={(e) => handleEditSettings("interval", "interval", Number(e.target.value))}
				/>
				<h2 className="mt-1 text-xs text-gray-400">Every x time to water the plant</h2>

				<label className="block mt-1">Time to water</label>
				<input
					type="number"
					className="rounded-full border-[1px] border-gray-400 px-3"
					defaultValue={oldSettings.interval.length}
					onChange={(e) => handleEditSettings("interval", "length", Number(e.target.value))}
				/>
				<h2 className="mt-1 text-xs text-gray-400">How long to water the olant</h2>
			</div>
		</div>
	);
}

export default IntervalSettings;
