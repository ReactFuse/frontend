import React from 'react';

const Overviewcard = ({ name, color, value }) => {
	return (
		<div>
			<div
				style={{ width: '200px', height: '200px', backgroundColor: 'white' }}
				className="shadow text-center d-flex justify-content-center  align-items-center mt-3 rounded-lg"
			>
				<h3 className=" display-4">{name}</h3>
				<br />
				<p style={{ color: `${color}`, fontSize: '75px', fontWeight: '200' }}>{value}</p>
			</div>
		</div>
	);
};

export default Overviewcard;
