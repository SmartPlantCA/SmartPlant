import { Route, Routes } from "react-router-dom";

import "./css/index.css";
import Navbar from "./layouts/Navbar";

import Error from "./pages/Error";
import Home from "./pages/Home";
import Plants from "./pages/Plants";
import SelectedPlant from "./pages/SelectedPlant";

function App() {
	return (
		<div>
			<Navbar />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/plants" element={<Plants />} />
				<Route path="/plants/:plantId" element={<SelectedPlant />} />
				<Route path="*" element={<Error />} />
			</Routes>
		</div>
	);
}

export default App;
