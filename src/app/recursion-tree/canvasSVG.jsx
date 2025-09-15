import React, { useState, useCallback } from "react";
import Edge from "./edge";
import Vertex from "./vertex";

export default function CanvasSvg(props) {
	const [pos, setPos] = useState({ x: 50, y: 10 });

	const increamentXY = useCallback(() => {
		setPos((p) => ({ ...p, x: (p.x + 50) % 240 }));
	}, []);

	const off = props.offset;

	return (
		<div>
			<svg viewBox="0 0 240 150" xmlns="http://www.w3.org/2000/svg">
				{props.edges.map((edge, cellidx) => (
					<Edge
						key={cellidx}
						id={cellidx}
						pos={{
							x1: (edge.x1 - off) * 15 + 120,
							y1: edge.y1 * 15 + 10,
							x2: (edge.x2 - off) * 15 + 120,
							y2: edge.y2 * 15 + 10,
						}}
					/>
				))}
				{props.vertices.map((vertex, cellidx) => (
					<Vertex
						key={cellidx}
						id={cellidx}
						current={props.current === cellidx}
						label={vertex.label}
						ret={vertex.val}
						pos={{
							x: (vertex.x - off) * 15 + 120,
							y: vertex.y * 15 + 10,
							px: (vertex.px - off) * 15 + 120,
							py: vertex.py * 15 + 10,
						}}
					/>
				))}
			</svg>
		</div>
	);
}
