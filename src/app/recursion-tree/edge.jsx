import React, { useEffect, useMemo, useRef, useState } from "react";

export default function Edge(props) {
	const [x1, setX1] = useState(0);
	const animXRef = useRef(null);
	const animYRef = useRef(null);

	function getPolyPointsX() {
		var x1 = props.pos.x1;
		var y1 = props.pos.y1;
		var x2 = props.pos.x2;
		var y2 = props.pos.y2;
		var l = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
		var r = 6.5;
		var xx1 = (x2 * (l - r) + x1 * r) / l;
		var yy1 = (y2 * (l - r) + y1 * r) / l;
		return xx1;
	}

	function getPolyPointsY() {
		var x1 = props.pos.x1;
		var y1 = props.pos.y1;
		var x2 = props.pos.x2;
		var y2 = props.pos.y2;
		var l = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
		var r = 6.5;
		var xx1 = (x2 * (l - r) + x1 * r) / l;
		var yy1 = (y2 * (l - r) + y1 * r) / l;
		return yy1;
	}

	const x2Target = useMemo(() => getPolyPointsX(), [props.pos.x1, props.pos.y1, props.pos.x2, props.pos.y2]);
	const y2Target = useMemo(() => getPolyPointsY(), [props.pos.x1, props.pos.y1, props.pos.x2, props.pos.y2]);

	useEffect(() => {
		setX1(props.pos.x1);
	}, []); // mount [2][19]

	useEffect(() => {
		if (x1 !== props.pos.x1) {
			setX1(props.pos.x1);
			if (animXRef.current && typeof animXRef.current.beginElement === "function") {
				animXRef.current.beginElement();
			}
			if (animYRef.current && typeof animYRef.current.beginElement === "function") {
				animYRef.current.beginElement();
			}
		}
	}, [props.pos.x1]); // update on x1 change [13][18]

	return (
		<g>
			<defs>
				<marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
					<path d="M 0 0 L 10 5 L 0 10 z" />
				</marker>
			</defs>
			<line
				x1={props.pos.x1}
				y1={props.pos.y1}
				x2={x2Target}
				y2={y2Target}
				style={{ stroke: "black", strokeWidth: "0.5" }}
				markerEnd="url(#arrow)"
			>
				<animate
					ref={animXRef}
					attributeName="x2"
					values={props.pos.x1 + ";" + x2Target}
					dur="0.5s"
					repeatCount="1"
				/>
				<animate
					ref={animYRef}
					attributeName="y2"
					values={props.pos.y1 + ";" + y2Target}
					dur="0.5s"
					repeatCount="1"
				/>
			</line>
		</g>
	);
}
