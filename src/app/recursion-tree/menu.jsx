import { CustomSelect } from '@/components/custom-select';
import { Button } from '@/components/ui/button';
import React from 'react';

function Menu(props) {
	return (
		<div className="w-64 bg-gray-100 p-4 space-y-6">
			<h2 className="text-lg font-semibold">Settings</h2>
			<CustomSelect
				title="Select Task"
				options={['Fibonacci']}
				onChange={props.setAlgo}
			/>
			<CustomSelect
				title={'N'}
				options={["0", "1", "2", "3", "4", "5", "6"]}
				onChange={props.setN}
			/>
			<CustomSelect
				title={'R'}
				options={["0", "1", "2", "3", "4", "5", "6"]}
				onChange={props.setR}
			/>
			<Button
				className="w-full"
				onClick={props.onStart}
				disabled={props.disable}
			>Visualize</Button>
		</div>
	);
}

export default Menu;
