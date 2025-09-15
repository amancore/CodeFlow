"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/components/navbar";
import { bfsdfs } from "@/lib/algorithms/bfs";
import { dijkstra, getNodesInShortestPathOrder } from "@/lib/algorithms/dijkstra";
import { randomMaze } from "@/lib/algorithms/randomMaze";
import { getMaze } from "@/lib/algorithms/recursiveMaze";
import Grid from "./grid";
import Menu from "./menu";

export default function Pathfinder() {
	const [grid, setGrid] = useState([]);
	const [mouseIsPressed, setMouseIsPressed] = useState(false);
	const [algo, setAlgo] = useState(0);
	const [maze, setMaze] = useState(0);
	const [row, setRow] = useState(0);
	const [col, setCol] = useState(0);
	const [startNode, setStartNode] = useState({ row: 4, col: 4 });
	const [endNode, setEndNode] = useState({ row: 0, col: 0 });

	const algorithms = useMemo(() => ["Dijsktra", "BFS", "DFS"], []);
	const mazes = useMemo(
		() => ["Recursive division", "Random", "Recursive Horizontal", "Recursive Vertical"],
		[]
	);

	const gridRef = useRef(null);

	// mount: compute grid size based on container, initialize nodes
	useEffect(() => {
		if (!gridRef.current) return;

		const width = gridRef.current.offsetWidth;
		const height = gridRef.current.offsetHeight;

		const r = Math.max(Math.floor(height / 25) - 2, 10);
		const c = Math.floor(width / 25);

		const s = { row: 4, col: 4 };
		const e = { row: r - 5, col: c - 5 };

		const g = getInitialGrid(r, c);
		g[s.row][s.col].isStartNode = true;
		g[e.row][e.col].isEndNode = true;

		setGrid(g);
		setRow(r);
		setCol(c);
		setStartNode(s);
		setEndNode(e);
	}, []);

	// mouse handlers
	const handleMouseDown = useCallback(
		(r, c) => {
			if ((startNode.row !== r || startNode.col !== c) && (endNode.row !== r || endNode.col !== c)) {
				setGrid((prev) => getNewGridWithWallToggled(prev, r, c));
			}
			setMouseIsPressed(true);
		},
		[startNode, endNode]
	);

	const handleMouseEnter = useCallback(
		(r, c) => {
			if (!mouseIsPressed) return;
			if ((startNode.row !== r || startNode.col !== c) && (endNode.row !== r || endNode.col !== c)) {
				setGrid((prev) => getNewGridWithWallToggled(prev, r, c));
			}
		},
		[mouseIsPressed, startNode, endNode]
	);

	const handleMouseUp = useCallback(() => {
		setMouseIsPressed(false);
	}, []);

	// menu handlers
	const handleAlgoChanged = useCallback((val) => setAlgo(val), []);
	const handleMazeChanged = useCallback((val) => setMaze(val), []);

	const handleCreateMaze = useCallback(() => {
		if (!grid.length) return;
		let pairs;
		switch (maze) {
			case 1:
				pairs = randomMaze(grid, row, col);
				break;
			default:
				pairs = getMaze(grid, row, col);
		}
		const s = startNode;
		const e = endNode;

		for (let i = 0; i < pairs.length; i++) {
			setTimeout(() => {
				if (i === pairs.length - 1) {
					setGrid((prev) => {
						const copy = prev.map((r) => r.slice());
						copy[s.row][s.col] = { ...copy[s.row][s.col], isWall: false };
						copy[e.row][e.col] = { ...copy[e.row][e.col], isWall: false };
						return copy;
					});
				}
				if (
					(pairs[i].xx !== s.row || pairs[i].yy !== s.col) &&
					(pairs[i].xx !== e.row || pairs[i].yy !== e.col)
				) {
					const el = document.getElementById(`node-${pairs[i].xx}-${pairs[i].yy}`);
					if (el) el.className = "node node-wall";
				}
			}, i * 20);
		}
	}, [maze, grid, row, col, startNode, endNode]);

	const handleClearBoard = useCallback(() => {
		setGrid((prev) => clearBoard(prev, row, col));
	}, [row, col]);

	const handleClearPath = useCallback(() => {
		setGrid((prev) => clearPath(prev, row, col));
	}, [row, col]);

	const handleClick = useCallback(() => {
		visualizeDijkstra();
	}, [grid, startNode, endNode, algo]);

	// visualization
	const visualizeDijkstra = () => {
		const start = grid[startNode.row][startNode.col];
		const finish = grid[endNode.row][endNode.col];
		let visitedNodesInOrder;

		switch (algo) {
			case 0:
				visitedNodesInOrder = dijkstra(grid, start, finish);
				break;
			case 1:
				visitedNodesInOrder = bfsdfs(grid, start, finish, "bfs");
				break;
			case 2:
				visitedNodesInOrder = bfsdfs(grid, start, finish, "bfs");
				break;
			default:
				visitedNodesInOrder = bfsdfs(grid, start, finish, "dfs");
		}

		const nodesInShortestPathOrder = getNodesInShortestPathOrder(finish);
		animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
	};

	const animateDijkstra = async (visitedNodesInOrder, nodesInShortestPathOrder) => {
		for (let i = 0; i <= visitedNodesInOrder.length; i++) {
			if (i === visitedNodesInOrder.length) {
				await sleep(100);
				await animateShortestPath(nodesInShortestPathOrder);
				return;
			}
			const node = visitedNodesInOrder[i];
			setGrid((prev) => toggleVisit(prev, node.row, node.col));
			const el = document.getElementById(`node-${node.row}-${node.col}`);
			if (el) el.className = "node node-visited";
			await sleep(10);
		}
	};

	const animateShortestPath = async (nodesInShortestPathOrder) => {
		setGrid((prev) => {
			const copy = prev.map((r) => r.slice());
			return copy;
		});
		for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
			const node = nodesInShortestPathOrder[i];
			setGrid((prev) => {
				const next = prev.map((r) => r.slice());
				next[node.row][node.col] = { ...next[node.row][node.col], ispathNode: true };
				return next;
			});
			const el = document.getElementById(`node-${node.row}-${node.col}`);
			if (el) el.className = "node node-shortest-path";
			await sleep(50);
		}
	};

	return (
		<div className="flex flex-col h-screen">
			<Navbar title="Dijkstra" />
			<div className="flex flex-1 overflow-hidden">
				<Menu
					onAlgoChanged={handleAlgoChanged}
					onVisualize={handleClick}
					algorithms={algorithms}
					mazes={mazes}
					onMazeChanged={handleMazeChanged}
					onCreateMaze={handleCreateMaze}
					onClearBoard={handleClearBoard}
					onClearPath={handleClearPath}
				/>
				<span style={{ margin: 2 }} />
				<div className="flex flex-1 flex-col items-center justify-center overflow-auto">
					<div className="w-full h-full flex items-center justify-center" ref={gridRef}>
						<Grid
							grid={grid}
							onMouseDown={handleMouseDown}
							onMouseEnter={handleMouseEnter}
							onMouseUp={handleMouseUp}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

// helpers identical to original behavior

const clearPath = (grid, row, col) => {
	const newGrid = grid.map((r) => r.slice());
	for (let i = 0; i < row; i++) {
		for (let j = 0; j < col; j++) {
			const node = newGrid[i][j];
			const newNode = {
				...node,
				distance: Infinity,
				visitedNode: false,
				isVisited: false,
				ispathNode: false,
				previousNode: null,
			};
			newGrid[i][j] = newNode;
		}
	}
	return newGrid;
};

const clearBoard = (grid, row, col) => {
	const newGrid = grid.map((r) => r.slice());
	for (let i = 0; i < row; i++) {
		for (let j = 0; j < col; j++) {
			const node = newGrid[i][j];
			const newNode = {
				...node,
				isWall: false,
				distance: Infinity,
				visitedNode: false,
				isVisited: false,
				ispathNode: false,
				previousNode: null,
			};
			newGrid[i][j] = newNode;
		}
	}
	return newGrid;
};

const toggleVisit = (grid, row, col) => {
	const newGrid = grid.map((r) => r.slice());
	const node = newGrid[row][col];
	const newNode = {
		...node,
		visitedNode: !node.visitedNode,
	};
	newGrid[row][col] = newNode;
	return newGrid;
};

const getNewGridWithWallToggled = (grid, row, col) => {
	const newGrid = grid.map((r) => r.slice());
	const node = newGrid[row][col];
	const newNode = {
		...node,
		isWall: true, // same as original: set to wall when dragging
	};
	newGrid[row][col] = newNode;
	return newGrid;
};

const getInitialGrid = (totRow, totCol) => {
	const grid = [];
	for (let row = 0; row < totRow; row++) {
		const currentRow = [];
		for (let col = 0; col < totCol; col++) {
			currentRow.push(createNode(row, col));
		}
		grid.push(currentRow);
	}
	return grid;
};

const createNode = (row, col) => {
	return {
		row,
		col,
		isWall: false,
		isStartNode: false,
		isEndNode: false,
		distance: Infinity,
		visitedNode: false,
		isVisited: false,
		ispathNode: false,
		previousNode: null,
	};
};

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
