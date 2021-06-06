import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

// const state = {
// 	labels: ['January', 'February', 'March', 'April', 'May'],
// 	datasets: [
// 		{
// 			label: 'Rainfall',
// 			backgroundColor: ['#B21F00', '#C9DE00', '#2FDE00', '#00A6B4', '#6800B4'],
// 			hoverBackgroundColor: ['#501800', '#4B5000', '#175000', '#003350', '#35014F'],
// 			data: [65, 59, 80, 81, 56]
// 		}
// 	]
// };

export default function Donutchart({ text, ratio }) {
	console.log(text, ratio);
	const [state, setState] = useState();
	useEffect(() => {
		setState({
			labels: ['active', 'cancel'],
			datasets: [
				{
					label: 'My First Dataset',
					data: ratio,
					backgroundColor: ['rgb(97,218,251)', 'rgb(54, 162, 235)'],
					hoverOffset: 4
				}
			]
		});
	}, []);
	return (
		<div>
			<Doughnut
				data={state}
				options={{
					title: {
						display: true,
						text: text,
						fontSize: 20,
						fontWeight: 200
					},
					legend: {
						display: true,
						position: 'right'
					}
				}}
			/>
		</div>
	);
}
