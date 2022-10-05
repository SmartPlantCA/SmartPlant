import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./css/index.css";
import Navbar from "./layouts/Navbar";

import Error from "./pages/Error";
import Home from "./pages/Home";
import Plant from "./pages/Plant";

function App() {
	// check if its the firt time the website is loaded
	const [isFirst, setFirst] = useState(true);

	return (
		<div className="dark:bg-dark p-3">
			<div className="font-reem dark:text-white">
				<Navbar />

				<div className="ml-40 w-auto bg-secondgray/50 dark:bg-dark dark:border-2 dark:border-[#d1d1d1] rounded-3xl p-12 wholePage">
					<Routes>
						<Route path="/" element={<Home firstRender={isFirst} setFirst={setFirst} />} />
						<Route path="/:plantId" element={<Plant />} />
						<Route path="*" element={<Error />} />
					</Routes>
				</div>
			</div>
		</div>
	);
}

export default App;
