function Modal({ modal, onClick }) {
	return (
		<div className="absolute top-0 left-0 right-0 bottom-0 m-auto w-2/5 h-2/5 border-2 border-red-500 p-3 rounded-lg">
			<div className="relative w-full h-full">
				<h1 className="text-2xl text-center font-bold tracking-wide">{modal.title}</h1>
				<p className="text-center font-medium mt-16">{modal.message}</p>
				<input type="text" className="absolute bottom-24 w-3/5 mx-auto left-0 right-0 rounded-lg" />
				<button className="modal__button">Send</button>
			</div>
		</div>
	);
}

export default Modal;
