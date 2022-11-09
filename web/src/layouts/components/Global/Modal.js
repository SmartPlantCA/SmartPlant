import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function Modal({ title, message, showModal, onClick, onClose }) {
	const [text, setText] = useState("");

	if (!showModal) return null;

	return (
		<div className="absolute top-0 right-0 bottom-0 left-0 backdrop-blur-sm z-50">
			<div className="absolute top-0 left-0 right-0 bottom-0 m-auto w-1/3 h-fit bg-white rounded-lg z-30 bg-opacity-90 border-2 border-gray-400">
				<div className="px-7 p-5">
					<div className="relative w-full h-full">
						<h1 className="text-2xl text-left font-bold tracking-wide">
							{title}
							<FontAwesomeIcon
								icon={faXmark}
								size="xs"
								className="absolute top-0 right-0 text-gray-400 hover:cursor-pointer"
								onClick={() => onClose(false)}
							/>
						</h1>
						<div className="mt-16 align-middle w-full">
							<p className="text-left font-medium text-sm text-gray-400 inline-block w-2/12">
								{message}
							</p>
							<input
								type="text"
								className="rounded-lg border-[1px] border-gray-300 w-10/12 p-1"
								value={text}
								onChange={(e) => setText(e.target.value)}
								id="plantName"
							/>
						</div>
					</div>
				</div>
				<div className="mt-10 w-full text-right text-sm bg-gray-200 rounded-b-lg p-4 ">
					<button
						className="text-gray-600 hover:bg-gray-400 py-2 px-5 rounded-lg"
						onClick={() => onClose(false)}
					>
						Cancel
					</button>
					<button
						className="bg-[#4BAB6D] rounded-lg py-2 px-5 text-white text-sm ml-5 hover:bg-[#3D8B5A]"
						onClick={() => onClick(text)}
					>
						Save Changes
					</button>
				</div>
			</div>
		</div>
	);
}

Modal.defaultProps = {
	showModal: true,
};

export default Modal;
