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
				<label htmlFor="toggleC" className="flex items-center cursor-pointer select-none">
					Enabled
					<div className="relative ml-2">
						<input
							type="checkbox"
							id="toggleC"
							className="sr-only "
							checked={oldSettings.interval.enabled}
							onChange={(e) => handleEditSettings("interval", "enabled", e.target.checked ? 1 : 0)}
						/>
						<div className="block bg-gray-600 w-14 h-6 rounded-full"></div>
						<div className="dot absolute left-1 top-1 bg-red-400 w-4 h-4 rounded-full transition"></div>
					</div>
					<div className="ml-3 text-gray-700 font-medium">
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
				<select
					onChange={(e) => handleEditSettings("interval", "interval", Number(e.target.value))}
					className="rounded-full border-[1px] border-gray-400 px-3"
					value={oldSettings.interval.interval}
				>
					<option value={1800000}>30 Minutes</option>
					<option value={3600000}>1 Hour</option>
					<option value={86400000}>1 Day</option>
					<option value={259200000}>3 Days</option>
					<option value={604800000}>7 Days</option>
					<option value={1209600000}>14 Days</option>
				</select>

				<h2 className="mt-1 text-xs text-gray-400">Every x time to water the plant</h2>

				<label className="block mt-1">Time to water</label>

				<select
					onChange={(e) => handleEditSettings("interval", "length", Number(e.target.value))}
					value={oldSettings.interval.length}
					className="rounded-full border-[1px] border-gray-400 px-3"
				>
					<option value={5000}>5 Seconds</option>
					<option value={10000}>10 Seconds</option>
					<option value={15000}>15 Seconds</option>
					<option value={30000}>30 Seconds</option>
					<option value={60000}>1 Minute</option>
				</select>

				<h2 className="mt-1 text-xs text-gray-400">How long to water the plant</h2>
			</div>
		</div>
	);
}

export default IntervalSettings;
