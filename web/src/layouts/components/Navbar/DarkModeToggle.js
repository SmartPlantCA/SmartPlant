import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "framer-motion";

function DarkModeToggle({ darkMode, setDarkMode }) {
	function toggleDarkMode() {
		if (!darkMode) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
		setDarkMode(!darkMode);
	}

	return (
		<div
			className="bg-gray-500 m-5 p-5 w-16 h-16 flex flex-col items-center justify-center rounded-2xl text-white shadow-md navFocus hover:cursor-pointer dark:bg-inherit dark:border-2 dark:border-[#d1d1d1]"
			onClick={toggleDarkMode}
		>
			{darkMode ? (
				<AnimatePresence mode="wait">
					<motion.div
						key="sun"
						initial={{ rotate: 180 }}
						animate={{ rotate: 360 }}
						exit={{ rotate: 0 }}
					>
						<FontAwesomeIcon icon={faSun} size="lg" />
					</motion.div>
				</AnimatePresence>
			) : (
				<AnimatePresence mode="wait">
					<motion.div
						key="moon"
						initial={{ rotate: 180 }}
						animate={{ rotate: 360 }}
						exit={{ rotate: 0 }}
					>
						<FontAwesomeIcon icon={faMoon} size="lg" />
					</motion.div>
				</AnimatePresence>
			)}
		</div>
	);
}

export default DarkModeToggle;
