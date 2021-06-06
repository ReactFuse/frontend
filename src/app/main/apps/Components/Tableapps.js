import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
	{ field: 'id', headerName: 'ID', width: 250 },
	{ field: 'appName', headerName: 'App name', width: 130 },
	{
		field: 'privateKey',
		headerName: 'Private Key',
		type: 'number',
		width: 150
	},
	{
		field: 'active',
		headerName: 'App Status',
		type: 'number',
		width: 150
	},
	{
		field: 'userName',
		headerName: 'User Name',
		type: 'number',
		width: 150
	},
	{
		field: 'createdAt',
		headerName: 'Created At',
		type: 'number',
		width: 150
	},
	{
		field: 'lastPingTime',
		headerName: 'Last Ping Time',
		type: 'number',
		width: 150
	}
];

// const rows = [
// 	{ id: 456, lastName: 'Snow', firstName: 'Jon', age: 35 },
// 	{ id: 457, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
// 	{ id: 458, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
// 	{ id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
// 	{ id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
// 	{ id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
// 	{ id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
// 	{ id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
// 	{ id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
// ];

export default function Tableapps({ handleButtons, data }) {
	const [selectionModel, setSelectionModel] = React.useState([]);
	return (
		<div style={{ height: 400, width: '100%' }}>
			<DataGrid
				rows={data}
				columns={columns}
				pageSize={5}
				checkboxSelection
				onSelectionModelChange={newSelection => {
					console.log(newSelection);
					setSelectionModel(newSelection.selectionModel);
					handleButtons(newSelection);
				}}
				selectionModel={selectionModel}
			/>
			<h1>{selectionModel.map(val => console.log(val.firstName))}</h1>
		</div>
	);
}
