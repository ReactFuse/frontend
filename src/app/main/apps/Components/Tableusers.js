import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
	{ field: 'id', headerName: 'ID', width: 200 },
	{ field: 'displayName', headerName: 'Display Name', width: 200 },
	// { field: 'lastName', headerName: 'Last name', width: 130 },
	{
		field: 'email',
		headerName: 'Email',
		type: 'text',
		width: 250
	},
	{
		field: 'role',
		headerName: 'Role',
		type: 'text',
		width: 100
	}
	// {
	// 	field: 'email',
	// 	headerName: 'Email',
	// 	type: 'text',
	// 	width: 350
	// }
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
// 	{
// 		id: 456656546487897654564152145649849841516548974,
// 		displayName: 'Tasadduq Ali',
// 		email: 'tasduq@gmail.com',
// 		role: 'admin'
// 	},
// 	{ id: 457, displayName: 'Tasadduq Ali', email: 'tasduq@gmail.com', role: 'Mnager' },
// 	{ id: 458, displayName: 'Tasadduq Ali', email: 'tasduq@gmail.com', role: 'admin' }
// ];

export default function Tableusers({ handleButtons, data }) {
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
