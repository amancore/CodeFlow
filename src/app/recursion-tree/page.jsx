"use client";
import React, { useCallback, useState } from "react";
import Navbar from "@/components/navbar";
import CanvasSvg from "./canvasSVG";
import { getTree } from "./fib";
import Menu from "./menu";
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
export default function Graph() {
	const [root, setRoot] = useState(undefined);
	const [vertices, setVertices] = useState([]);
	const [edges, setEdges] = useState([]);
	const [current, setCurrent] = useState(-1);
	const [n, setN] = useState(0);
	const [r, setR] = useState(2);
	const [algo, setAlgo] = useState(0);
	const [offset, setOffset] = useState(0);
	const setAlgoHandler = useCallback((val) => setAlgo(val), []);
	const setNHandler = useCallback((val) => setN(val), []);
	const setRHandler = useCallback((val) => setR(val), []);
	const recur = useCallback(async function recur(node, parent) {
		const currentIndex = vertices.length;
		if (parent !== undefined) {
			if (node.children.length) {
				setVertices((prev) => [
					...prev,
					{ label: node.tree.label, val: 0, x: node.x, y: node.y, px: parent.x, py: parent.y },
				]);
			} else {
				setVertices((prev) => [
					...prev,
					{ label: node.tree.label, val: node.tree.node, x: node.x, y: node.y, px: parent.x, py: parent.y },
				]);
			}
			setCurrent(currentIndex);
			setEdges((prev) => [
				...prev,
				{ x1: parent.x, y1: parent.y, x2: node.x, y2: node.y },
			]);
		} else {
			if (node.children.length) {
				setVertices((prev) => [
					...prev,
					{ label: node.tree.label, val: 0, x: node.x, y: node.y, px: node.x, py: node.y },
				]);
			} else {
				setVertices((prev) => [
					...prev,
					{ label: node.tree.label, val: node.tree.node, x: node.x, y: node.y, px: node.x, py: node.y },
				]);
			}
			setCurrent(currentIndex);
		}
		await sleep(500);
		for (let i = 0; i < node.children.length; i++) {
			await recur(node.children[i], node);
			setCurrent(currentIndex);
			await sleep(500);
		}
		setVertices((prev) => {
			const copy = prev.slice();
			copy[currentIndex] = { ...copy[currentIndex], val: node.tree.node };
			return copy;
		});
	}, [vertices.length]);
	const addNumber = useCallback(async () => {
		const tree = getTree(n, algo, r);
		setRoot(tree);
		setEdges([]);
		setVertices([]);
		setCurrent(-1);
		setOffset(tree.x);

		await recur(tree, undefined);
	}, [n, algo, r, recur]);

	return (
		<div className="flex flex-col h-screen">
			<Navbar title="Recursive Tree" />
			<div className="flex flex-1 overflow-hidden">
				<Menu
					setN={setNHandler}
					setR={setRHandler}
					setAlgo={setAlgoHandler}
					onStart={addNumber}
				/>
				<div className="flex flex-1 flex-col items-center justify-center overflow-auto">
					<div className="w-full h-full ">
						<CanvasSvg
							vertices={vertices}
							edges={edges}
							current={current}
							offset={offset}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
