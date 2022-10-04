import { Route, Routes } from "react-router-dom";

import "./css/index.css";
import Navbar from "./layouts/Navbar";

import Error from "./pages/Error";
import Home from "./pages/Home";
import Plant from "./pages/Plant";

function App() {
	return (
		<div className="font-reem">
			<Navbar />

			<div className="ml-40 mt-3 w-auto bg-secondgray/50 mb-3 mr-3 rounded-3xl p-12 wholePage">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/:plantId" element={<Plant />} />
					<Route path="*" element={<Error />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
