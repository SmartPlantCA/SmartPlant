import { Route, Routes } from "react-router-dom";

import Header from "./layouts/Header";

import Home from "./pages/Home";
import Plants from "./pages/Plants";
import SelectedPlant from "./pages/SelectedPlant";
import Error from "./pages/Error";

function App() {
	return (
		<div>
			<Header />

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
