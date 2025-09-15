import React from 'react';
import Guess from "./guess";
import Result from "./result";

export default function Search({
	yesButton,
	noButton,
	upper,
	lower,
	max,
	onRestart
}) {
	const isResolved = upper === lower;

	return (
		<div>
			{!isResolved && (
				<Guess
					yesButton={yesButton}
					noButton={noButton}
					upper={upper}
					lower={lower}
					max={max}
				/>
			)}

			{isResolved && (
				<Result
					res={upper}
					onRestart={onRestart}
				/>
			)}
		</div>
	);
}
