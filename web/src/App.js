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
	const [isFirstClick, setFirstClick] = useState(true);
	const [mute, setMuted] = useState(true);
	const playerRef = useRef(null);

	useEffect(() => {
		if (isFirst) {
			setTimeout(() => {
				setFirst(false);
			}, 3000);
		}
	}, [isFirst]);

	const invertMuted = (value) => {
		playerRef.current.muted = value === undefined ? !mute : value;
		setMuted(value === undefined ? !mute : value);
	};
	return (
		<div
			className="dark:bg-dark p-3"
			onClick={() => {
				if (isFirstClick) {
					invertMuted(false);
					setFirstClick(false);
				}
			}}
			onTouchStart={() => {
				if (isFirstClick) {
					invertMuted(false);
					setFirstClick(false);
				}
			}}
		>
			<ToastContainer />
			<div className="font-reem dark:text-white">
				<Navbar mute={mute} invertMuted={invertMuted} />

				<video
					autoPlay
					muted
					loop
					playsInline
					preload="metadata"
					className="-z-10 fixed top-0 left-0 w-1 h-1 object-cover"
					ref={playerRef}
				>
					{/*<source src="https://1000christmashits.stream.laut.fm/1000christmashits" type="audio/mpeg" />*/}
					<source
						src="http://192.95.39.65:5607/stream"
						type="audio/mpeg"
					/>
				</video>

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
