import { Button } from '@/components/ui/button';
import React from 'react';

export default function Result({ res, onRestart }) {
	return (
		<div>
			<span className='text-4xl display-10'>
				Your number is {res}
			</span>
			<br />
			<Button
				className='btn btn-warning btn-lg'
				onClick={onRestart}
			>
				Restart
			</Button>
		</div>
	);
}
