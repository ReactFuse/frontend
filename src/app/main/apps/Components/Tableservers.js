import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
	{ field: 'id', headerName: 'ID', width: 200 },
	{ field: 'userName', headerName: 'User name', width: 130 },
	{
		field: 'comment',
		headerName: 'Comment',
		type: 'number',
		width: 250
	},
	{
		field: 'subscriptionType',
		headerName: 'Subscription Type',
		type: 'number',
		width: 250
	},
	{
		field: 'active',
		headerName: 'Server Status',
		type: 'number',
		width: 250
	},
	{
		field: 'serverIp',
		headerName: 'Server IP',
		type: 'number',
		width: 250
	},
	{
		field: 'startTime',
		headerName: 'Start Date',
		type: 'number',
		width: 250
	},
	{
		field: 'endTime',
		headerName: 'End Date',
		type: 'number',
		width: 250
	},
	{
		field: 'cancelTime',
		headerName: 'Cancel Time',
		type: 'number',
		width: 250
	},
	{
		field: 'lastPingTime',
		headerName: 'Last Ping Time',
		type: 'number',
		width: 250
	},
	{
		field: 'autoRenew',
		headerName: 'Auto Renew Date',
		type: 'number',
		width: 250
	},
	{
		field: 'createdAt',
		headerName: 'Created At',
		type: 'number',
		width: 250
	},
	{
		field: 'updatedAt',
		headerName: 'Updated At',
		type: 'number',
		width: 250
	}
	// {
	// 	field: 'fullName',
	// 	headerName: 'Full name',
	// 	description: 'This column has a value getter and is not sortable.',
	// 	sortable: false,
	// 	width: 160,
	// 	valueGetter: params => `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`
	// }
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

export default function Tableservers({ handleButtons, data, handleUpdate }) {
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
