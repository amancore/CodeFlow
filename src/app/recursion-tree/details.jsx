import React from "react";

export default function Details(props) {
	function Switcherr() {
		switch (props.algo) {
			case 0:
				return (
					<div className="row bg-info m-0 p-2">
						<div className="col-3  card me-1 bg-light ">
							The Fibonacci sequence, in which each number is the sum of the two preceding ones. The sequence commonly
							starts from 0 and 1
						</div>
						<div className="col-3  card me-1 bg-light ">N = Nth fibonacchi Number</div>
						<div className="col-3  bg-light ">function = nCr(n,r)</div>
						<div className="col-3  card me-1 bg-light">
							Fib(0) = 0 <br />
							Fib(1) = 1 <br />
							Fib(n) = Fib(n-1) + Fib(n-2)
						</div>
					</div>
				);
			default:
				return <b>Henlo</b>;
		}
	}

	return <div>{Switcherr()}</div>;
}
