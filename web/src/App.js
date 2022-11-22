import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./css/index.css";
import InitialTransition from "./layouts/components/Initial/InitialTransition";
import Navbar from "./layouts/components/Navbar/Navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRef } from "react";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Plant from "./pages/Plant";

function App() {
	// check if its the firt time the website is loaded
	const [isFirst, setFirst] = useState(true);
	const playerRef = useRef(null);

	useEffect(() => {
		if (isFirst) {
			setTimeout(() => {
				setFirst(false);
			}, 3000);
		}
	}, [isFirst]);

	useEffect(() => {
		console.log(playerRef.current);
	}, [playerRef]);

	return (
		<div className="dark:bg-dark p-3">
			<ToastContainer />
			<div className="font-reem dark:text-white">
				<Navbar />
				<iframe
					title="music"
					src="https://olafwempe.com/mp3/silence/silence.mp3"
					type="audio/mp3"
					allow="autoplay"
					id="audio"
					ref={playerRef}
				>
					<video autoPlay muted loop playsInline preload="metadata">
						<source src="http://192.95.39.65:5607/stream" />
					</video>
				</iframe>

				<div className="ml-40 w-auto bg-secondgray/50 dark:bg-dark dark:border-2 dark:border-[#d1d1d1] rounded-3xl p-12 wholePage">
					{isFirst ? <InitialTransition /> : null}

					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/:plantId" element={<Plant />} />
						<Route path="*" element={<Error />} />
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default App;
