import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
const blackBox = {
	initial: {
		height: "100vh",
		bottom: 0,
	},
	animate: {
		height: 0,
		transition: {
			when: "afterChildren",
			duration: 1.5,
			ease: [0.87, 0, 0.13, 1],
		},
	},
};

const icon = {
	initial: {
		scale: 0,
		opacity: 0,
	},
	animate: {
		scale: 1,
		opacity: 1,
		transition: {
			delay: 0.3,
			duration: 0.8,
			ease: [0.87, 0, 0.13, 1],
		},
	},
};
const textContainer = {
	initial: {
		opacity: 1,
	},
	animate: {
		opacity: 0,
		transition: {
			duration: 0.25,
			when: "afterChildren",
		},
	},
};

const text = {
	initial: {
		x: 50,
	},
	animate: {
		x: 250,
		transition: {
			duration: 1.5,
			ease: [0.87, 0, 0.13, 1],
		},
	},
};

function InitialTransition() {
	return (
		<div className="absolute inset-0 flex items-center justify-center" id="initial">
			<motion.div
				className="absolute z-50 flex items-center justify-center w-full bg-darkgreen"
				initial="initial"
				animate="animate"
				variants={blackBox}
				onAnimationStart={() => {
					document.body.classList.add("overflow-hidden");
					setTimeout(() => {
						document.getElementById("icon").style.animation = "fading 2s forwards";
					}, 1500);
					setTimeout(() => {
						document.body.classList.remove("overflow-hidden");
					}, 3000);
				}}
			>
				<motion.div variants={icon} id="icon" className="icon">
					<FontAwesomeIcon icon={faSeedling} size="10x" className=" text-darkestgreen" />
				</motion.div>

				<motion.svg className="absolute z-50 flex" variants={textContainer}>
					<svg>
						<pattern
							id="pattern"
							patternUnits="userSpaceOnUse"
							width={750}
							height={800}
							className="text-white"
						>
							<rect className="w-full h-full fill-current" />
							<motion.rect
								variants={text}
								className="w-full h-full text-darkergreen fill-current"
							/>
						</pattern>

						<text
							className="text-4xl font-bold"
							textAnchor="middle"
							x="50%"
							y="50%"
							style={{ fill: "url(#pattern)" }}
						>
							SmartPlant
						</text>
					</svg>
				</motion.svg>
			</motion.div>
		</div>
	);
}

export default InitialTransition;
