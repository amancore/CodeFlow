import React, { useEffect, useRef, useState } from "react";

export default function Vertex(props) {
	const [poss, setPoss] = useState({ x: 0, y: 0, xx: 0, yy: 0 });
	const animRef = useRef(null);

	useEffect(() => {
		if (poss.x !== props.pos.x) {
			const pp = { ...poss, xx: poss.x, yy: poss.y, x: props.pos.x, y: props.pos.y };
			setPoss(pp);
			setPrevPoss({ x: poss.x, y: poss.y });
			setPrevX(poss.x);
			if (animRef.current && typeof animRef.current.beginElement === "function") {
				animRef.current.beginElement();
			}
		}
	}, [props.pos.x, props.pos.y]); // runs on pos change [12][6]

	return (
		<g>
			<circle
				cx={poss.x}
				cy={poss.y}
				r={props.radius}
				stroke="black"
				strokeWidth="1"
				fill="red"
			>
				<animate
					ref={animRef}
					id={"vbanim"}
					attributeName="cx"
					values={poss.x - 50 + ";" + poss.x}
					dur="2s"
					repeatCount="1"
				/>
			</circle>
			<text style={{ font: "5px sans-serif" }} x={props.pos.x} y={props.pos.y}>
				{props.label}
			</text>
			<rect width="10" height="10">
				<animate attributeName="rx" values="0;5;0" dur="10s" repeatCount="2" />
			</rect>
		</g>
	);
}
