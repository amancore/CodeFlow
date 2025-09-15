import React from 'react';
import { CustomSelect } from '@/components/custom-select';
import { Button } from '@/components/ui/button';

export default function Menu({
	algorithms,
	mazes,
	onAlgoChanged,
	onMazeChanged,
	onClearPath,
	onClearBoard,
	onCreateMaze,
	onVisualize,
}) {
	return (
		<div className="w-64 bg-gray-100 p-4 space-y-6">
			<h2 className="text-lg font-semibold">Settings</h2>

			<CustomSelect
				title="Select Algorithm"
				options={algorithms}
				onChange={onAlgoChanged}
			/>

			<CustomSelect
				title="Select Maze Division"
				options={mazes}
				onChange={onMazeChanged}
			/>

			<Button className="m-1" onClick={onClearPath}>Clear Path</Button>
			<Button className="m-1" onClick={onClearBoard}>Clear Board</Button>
			<Button className="w-full" onClick={onCreateMaze}>Create Maze</Button>
			<Button className="w-full" onClick={onVisualize}>Visualize</Button>
		</div>
	);
}
