import { useState } from "react";

function Modal({ title, message, showModal, onClick, onClose }) {
	const [text, setText] = useState("");

	if (!showModal) return null;

	return (
		<div className="absolute top-0 left-0 right-0 bottom-0 m-auto w-2/5 h-2/5 border-2 border-red-500 p-3 rounded-lg">
			<div className="relative w-full h-full">
				<h1 className="text-2xl text-center font-bold tracking-wide">
					{title}
				</h1>
				<p className="text-center font-medium mt-16">{message}</p>
				<input
					type="text"
					className="absolute bottom-24 w-3/5 mx-auto left-0 right-0 rounded-lg"
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<button onClick={() => onClick(text)}>Send</button>
				<button onClick={onClose}>Cancel</button>
			</div>
		</div>
	);
}

Modal.defaultProps = {
	showModal: true,
};

export default Modal;
