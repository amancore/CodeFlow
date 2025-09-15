"use client";
import Navbar from '@/components/navbar';
import { Component } from 'react';
import Cells from "./cells";
import Menu from "./menu";

class Seive extends Component {
	state = {
		number: 100,
		cells: [],
		isRunning: false,
		speed: 500,
		primes: [],
		maxPrime: 0,
		algo: 0
	}
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		const cells = getCells(this.state.number);
		this.setState({ cells });
	}
	setAlgo = (val) => {
		this.setState({ algo: val });
	}
	render() {
		return (
			<div className="flex flex-col h-screen">
				<Navbar title="Sieve of Eratosthenes" />
				<div className="flex flex-1 overflow-hidden">

					<Menu
						onChangeSpeed={this.changeSpeed}
						onChangeValues={this.handleValueIncease}
						onVisualize={this.startAlgo}
						onRefresh={this.handleRefresh}
						isDisabled={this.state.isRunning}
						setAlgo={this.setAlgo}
					/>
					<div className="flex flex-1 flex-col overflow-auto">
						{this.state.algo === 0 &&
							<Cells
								num={this.state.number}
								cells={this.state.cells}
							/>
						}
					</div>
				</div>
			</div>
		);
	}

	changeSpeed = (speed) => {
		this.setState({ speed: 600 - speed * 10 });
	}
	handleValueIncease = (value) => {
		this.setState({ number: value });
		if (this.state.algo === 0) {
			this.setState({ cells: getCells(value), isRunning: false });
		}
	}
	handleRefresh = () => {
		this.setState({ cells: getCells(this.state.number), isRunning: false });
	}
	startAlgo = () => {
		if (this.state.algo === 0) {
			this.startSeive();
		}
	}
	startSeive = async () => {
		const speed = this.state.speed;
		this.setState({ isRunning: true });
		const prime = [];
		for (let i = 0; i <= this.state.number; i++) {
			prime.push(1);
		}
		prime[0] = prime[1] = 0;
		let changedCells = this.state.cells;
		let prevCheck = -1;
		let counter = 0;
		for (let i = 2; i <= this.state.number; i++) {
			if (prime[i] === 1) {
				changedCells = getNewCellPrimeToggled(changedCells, i - 1);
				this.setState({ cells: changedCells });
				await sleep(this.state.speed);
				counter++;
				for (let j = i * i; j <= this.state.number; j += i) {
					if (prevCheck != -1) {
						changedCells = getNewCellVisitingToggled(changedCells, prevCheck);
					}
					prevCheck = j - 1;
					changedCells = getNewCellCheckToggled(changedCells, j - 1);
					changedCells = getNewCellVisitingToggled(changedCells, prevCheck);
					this.setState({ cells: changedCells });
					await sleep(this.state.speed);
					counter++;
					prime[j] = 0;
				}
			}
		}
		changedCells = getNewCellVisitingToggled(changedCells, prevCheck);
		this.setState({ cells: changedCells, isRunning: false });
	}
}
const getNewCellPrimeToggled = (cells, pos) => {
	const newCells = cells.slice();
	const cell = newCells[pos];
	const newCell = {
		...cell,
		isPrime: true
	}
	newCells[pos] = newCell;
	return newCells;
}
const getNewCellVisitingToggled = (cells, pos) => {
	const newCells = cells.slice();
	const cell = newCells[pos];
	const newCell = {
		...cell,
		isVisiting: !cell.isVisiting
	}
	newCells[pos] = newCell;
	return newCells;
}
const getNewCellCheckToggled = (cells, pos) => {
	const newCells = cells.slice();
	const cell = newCells[pos];
	const newCell = {
		...cell,
		isChecking: true
	}
	newCells[pos] = newCell;
	return newCells;
}
const getCells = (rows) => {
	const cells = [];
	for (let cell = 1; cell <= rows; cell++) {
		cells.push(createCell(cell))
	}
	return cells;
}
const createCell = (val) => {
	return {
		val,
		isChecking: false,
		isVisiting: false,
		isPrime: false
	};
}
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
export default Seive;