import { faCircleInfo, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import darksmartplant from "../images/dark_smartplant.png";
import smartplant from "../images/smartplant.png";
import DarkModeToggle from "./components/Navbar/DarkModeToggle";

function Navbar() {
	let navigate = useNavigate();

	const [time, setTime] = useState(0);
	const [darkMode, setDarkMode] = useState(false);
	const logo = createRef();
	const [interval, setIntervalValue] = useState(null);

	function startTimer() {
		setIntervalValue(
			setInterval(() => {
				setTime((time) => time + 1);
			}, 1000)
		);
	}

	function stopTimer() {
		clearInterval(interval);
		setTime(0);
	}

	useEffect(() => {
		if (time >= 2 && time < 4) {
			logo.current.classList.remove("logo");
			logo.current.classList.add("logo2");
		} else if (time >= 4 && time < 6) {
			logo.current.classList.remove("logo2");
			logo.current.classList.add("logo3");
		} else if (time >= 6 && time < 8) {
			logo.current.classList.remove("logo3");
			logo.current.classList.add("logo4");
		} else if (time >= 8) {
			logo.current.classList.remove("logo4");
			logo.current.classList.add("logo5");
		} else {
			logo.current.classList.add("logo");
			logo.current.classList.remove("logo2");
			logo.current.classList.remove("logo3");
			logo.current.classList.remove("logo4");
			logo.current.classList.remove("logo5");
		}
	}, [time, logo]);

	return (
		<nav className="fixed left-0 top-0 h-screen w-40 dark:bg-inherit">
			<div className="flex flex-col h-screen center items-center">
				<img
					src={darkMode ? darksmartplant : smartplant}
					alt="logo"
					width={60}
					ref={logo}
					className="rounded-2xl mx-auto flex-grow-0 flex-shrink-1 mt-16 logo dark:filter dark:grayscale"
					onMouseEnter={startTimer}
					onMouseLeave={stopTimer}
				></img>
				<div className="flex-auto flex flex-col items-center justify-center">
					<div
						className="bg-green dark:bg-inherit dark:border-2 dark:border-[#d1d1d1] m-5 p-5 w-16 h-16 flex flex-col items-center justify-center rounded-2xl text-white shadow-md navFocus hover:cursor-pointer"
						onClick={() => navigate("/")}
					>
						<FontAwesomeIcon icon={faHouse} size="lg" />
					</div>
					<div className="m-5 p-5 text-gray-300">
						<DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
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
