import { useEffect, useState } from "react";
import PlantsContext from "../context/PlantsContext";
import Modal from "../layouts/components/Global/Modal";
import InitialTransition from "../layouts/components/Initial/InitialTransition";

function Home({ firstRender, setFirst }) {
	let [showModal, setShowModal] = useState(false);
	let [modal, setModal] = useState({
		title: "Add Plant",
		message: "How should we name the plant?",
	});

	useEffect(() => {
		if (firstRender) {
			setTimeout(() => {
				setFirst(false);
			}, 3000);
		}
	}, [setFirst, firstRender]);

	return (
		<div>
			{firstRender ? <InitialTransition /> : null}
			{showModal ? <Modal modal={modal} /> : null}
			<h1 className="text-4xl font-bold tracking-wide">Overview</h1>
			<PlantsContext setShowModal={setShowModal} setModal={setModal} />
		</div>
	);
}

export default Home;
