import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
	{ field: 'id', headerName: 'ID', width: 150 },

	{
		field: 'managerName',
		headerName: 'Manager',
		type: 'text',
		width: 150
	},
	{
		field: 'active',
		headerName: 'Active Status',
		type: 'text',
		width: 150
	},
	{ field: 'description', headerName: 'Description', width: 300 },
	{ field: 'createdAt', headerName: 'Creation Date', width: 300 },
	{ field: 'updatedAt', headerName: 'Updation Date', width: 300 }
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
// 	{ id: 456, name: 'Robot1', displayName: 'Manager1', active: 'Active' },
// 	{ id: 457, name: 'Robot1', displayName: 'Manager1', active: 'Active' },
// 	{ id: 458, name: 'Robot1', displayName: 'Manager1', active: 'Active' }
// ];

export default function Tablerobots({ handleButtons, data, handleUpdate }) {
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
