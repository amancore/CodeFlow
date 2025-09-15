"use client";
import React, { useState } from 'react';
import EntryPoint from "./entryPoint";
import Search from "./search";
import Navbar from '@/components/navbar';

export default function BinarySearch() {
	// state
	const [upper, setUpper] = useState(100);
	const [lower, setLower] = useState(0);
	const [max, setMax] = useState(100);
	const [isRunning, setIsRunning] = useState(false);

	// actions
	const handleStartGame = () => {
		setIsRunning(true);
	};

	const handleRestart = () => {
		setIsRunning(false);
		setUpper(100);
		setLower(0);
		setMax(100);
	};

	const handleYes = () => {
		const mid = Math.floor((upper + lower) / 2);
		setLower(mid + 1);
	};

	const handleNo = () => {
		const mid = Math.floor((upper + lower) / 2);
		setUpper(mid);
	};

	const handleSetUpper = (up) => {
		let val = parseInt(up, 10);
		if (isNaN(val) || val <= 0) {
			val = 100;
		}
		setUpper(val);
		setMax(val);
	};

	return (
		<div>
			<Navbar title={"Binary Search"} />
			<br />
			<br />
			<br />
			<center>
				{!isRunning && (
					<EntryPoint
						startGame={handleStartGame}
						upper={upper}
						setUpper={handleSetUpper}
					/>
				)}

				{isRunning && (
					<Search
						yesButton={handleYes}
						noButton={handleNo}
						upper={upper}
						lower={lower}
						max={max}
						onRestart={handleRestart}
					/>
				)}
			</center>
		</div>
	);
}
