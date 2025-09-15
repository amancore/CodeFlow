import React from 'react';
import Node from "./node";
import './grid.css';

export default function Grid({ grid, onMouseDown, onMouseEnter, onMouseUp }) {
	return (
		<div className="Grid">
			{grid.map((rowArr, rowidx) => (
				<div key={rowidx}>
					{rowArr.map((node, nodeidx) => {
						const { row, col, isWall, visitedNode } = node;
						return (
							<Node
								key={nodeidx}
								row={row}
								col={col}
								node={node}
								isWall={isWall}
								visitedNode={visitedNode}
								onMouseDown={onMouseDown}
								onMouseEnter={onMouseEnter}
								onMouseUp={onMouseUp}
							/>
						);
					})}
				</div>
			))}
		</div>
	);
}
