import React, { useEffect, useRef } from "react";

export default function Vertex(props) {
	const cxRef = useRef(null);
	const cyRef = useRef(null);
	const tRef = useRef(null);

	useEffect(() => {
		if (props.id === 0) return;
		if (cxRef.current && typeof cxRef.current.beginElement === "function") cxRef.current.beginElement();
		if (cyRef.current && typeof cyRef.current.beginElement === "function") cyRef.current.beginElement();
		if (tRef.current && typeof tRef.current.beginElement === "function") tRef.current.beginElement();
	}, []);

	return (
		<g>
			<circle
				cx={props.pos.x}
				cy={props.pos.y}
				r={6}
				stroke="black"
				strokeWidth="0.5"
				fill={props.current ? "cyan" : "white"}
			>
				<animate
					ref={cxRef}
					id={"cxanim" + props.id}
					attributeName="cx"
					values={props.pos.px + ";" + props.pos.x}
					dur="0.5s"
					repeatCount="1"
				/>
				<animate
					ref={cyRef}
					id={"cyanim" + props.id}
					attributeName="cy"
					values={props.pos.py + ";" + props.pos.y}
					dur="0.5s"
					repeatCount="1"
				/>
			</circle>
			<text
				style={{ font: "3px sans-serif" }}
				x={props.pos.x}
				y={props.pos.y - 4}
				textAnchor={"middle"}
			>
				<animate
					ref={tRef}
					id={"tanim" + props.id}
					attributeName="opacity"
					values="0;0;1"
					dur="1s"
					repeatCount="1"
				/>
				<tspan x={props.pos.x} dy="1.2em">
					N:{props.label}
				</tspan>
				<tspan x={props.pos.x} dy="1.2em">
					R:{props.ret}
				</tspan>
			</text>
		</g>
	);
}
