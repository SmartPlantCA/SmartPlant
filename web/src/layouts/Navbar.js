import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import smartplant from "../images/smartplant.png";
function Navbar() {
	return (
		<nav className="bg-red-500 absolute left-0">
			<div className="flex flex-col w-40 h-screen">
				<img src={smartplant} alt="logo" width={50} height={50}></img>
				<button className="bg-red text-white mt-20">
					<FontAwesomeIcon icon={faHouse} size={3} />
				</button>
			</div>
		</nav>
	);
}

export default Navbar;
