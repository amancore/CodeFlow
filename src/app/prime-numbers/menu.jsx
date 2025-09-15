import { CustomSelect } from '@/components/custom-select';
import { CustomSlider } from '@/components/custom-slider';
import { Button } from '@/components/ui/button';
import React from 'react';

function Menu(props) {
	function isClickable() {
		if (props.isDisabled) {
			return { cursor: "not-allowed" };
		} else {
			return {};
		}
	}

	return (
		<div className="w-64 bg-gray-100 p-4 space-y-6">
			<h2 className="text-lg font-semibold">Settings</h2>
			<CustomSelect
				title="Select Algorithm"
				options={["Sieve"]}
				onChange={props.setAlgo}
			/>
			<CustomSlider
				onChange={props.onChangeSpeed}
				title="speed"
				marks={false}
				defaultValue={10}
				step={1}
				min={10}
				max={50}
				isDisabled={false}
			/>
			<CustomSlider
				onChange={props.onChangeValues}
				title="Total Number"
				marks={false}
				defaultValue={100}
				step={1}
				min={10}
				max={500}
				isDisabled={props.isDisabled}
			/>
			<Button
				className="w-full"
				onClick={props.onRefresh}
				disabled={props.isDisabled}
				style={isClickable()}
			>
				Refresh
			</Button>
			<Button
				className="w-full"
				onClick={props.onVisualize}
				disabled={props.isDisabled}
				style={isClickable()}
			>
				Visualize
			</Button>
		</div>
	);
}

export default Menu;
