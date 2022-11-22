import { faClock, faDroplet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo } from "react";
import CountUp from "react-countup";

function TotalWater({ plant }) {
	return (
		<div>
			<div className="mt-5 px-7 py-5 bg-white rounded-3xl drop-shadow-2xl border-[1px] border-gray-100 hover:scale-110 duration-500 ease-in-out transition-transform">
				<h2 className="text-2xl">Total Water Poured</h2>
				<FontAwesomeIcon icon={faDroplet} className=" text-blue-500 mr-2 mt-2" size="lg" />
				<CountUp
					end={plant.totalWateringML}
					delay={0}
					duration={7.75}
					suffix=" ml"
					useEasing={true}
					onStart={() => console.log("Started! 💨")}
				>
					{({ countUpRef }) => (
						<>
							<span ref={countUpRef} />
						</>
					)}
				</CountUp>
			</div>
			<div className="mt-5 px-7 py-5 bg-white rounded-3xl drop-shadow-2xl border-[1px] border-gray-100 hover:scale-110 duration-500 ease-in-out transition-transform">
				<h2 className="text-2xl">Saved time watering</h2>
				<FontAwesomeIcon icon={faClock} className=" text-blue-500 mr-2 mt-2" size="lg" />
				<CountUp
					end={plant.totalWateringMS / 1000 / 60 / 60}
					delay={0}
					decimal="."
					decimals={2}
					duration={7.75}
					suffix=" hrs"
					useEasing={true}
					onStart={() => console.log("Started! 💨")}
				>
					{({ countUpRef }) => (
						<>
							<span ref={countUpRef}></span>
						</>
					)}
				</CountUp>
			</div>
		</div>
	);
}

function areEqual(prevProps, nextProps) {
	if (prevProps.plant.totalWateringML === nextProps.plant.totalWateringML) return true;
	return false;
}

export default memo(TotalWater, areEqual);
