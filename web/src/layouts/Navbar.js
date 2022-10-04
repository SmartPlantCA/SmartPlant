import { faCircleInfo, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import smartplant from "../images/smartplant.png";

function Navbar() {
	return (
		<nav className="absolute left-0 top-0 h-screen w-40">
			<div className="flex flex-col h-screen center items-center">
				<img
					src={smartplant}
					alt="logo"
					width={60}
					className="rounded-2xl mx-auto flex-grow-0 flex-shrink-1 mt-16"
				></img>
				<div className="flex-auto flex flex-col items-center justify-center">
					<div className="bg-green m-5 p-5 w-16 h-16 flex flex-col items-center justify-center rounded-2xl text-white shadow-md">
						<FontAwesomeIcon icon={faHouse} size="lg" />
					</div>
					<div className="m-5 p-5 text-gray-300">
						<FontAwesomeIcon icon={faCircleInfo} />
					</div>
				</div>
				<div className="flex-grow-0 flex-shrink-1 mb-10 h-[60px]"></div>
			</div>
		</nav>
	);
}

export default Navbar;
