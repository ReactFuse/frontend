import * as React from 'react';
import { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
	{ field: 'id', headerName: 'ID', width: 250 },
	{ field: 'accountNum', headerName: 'Account No.', width: 150 },
	{ field: 'managerName', headerName: 'Manager', width: 150 },
	// {
	// 	field: 'license',
	// 	headerName: 'License',
	// 	type: 'number',
	// 	width: 150
	// },
	{
		field: 'active',
		headerName: 'License Status',
		type: 'text',
		width: 150
	},
	{
		field: 'planId',
		headerName: 'Plan ID',
		type: 'text',
		width: 250
	},
	{
		field: 'robotId',
		headerName: 'Robot ID',
		type: 'text',
		width: 250
	},
	{
		field: 'startTime',
		headerName: 'Start Date',
		type: 'text',
		width: 250
	},
	{
		field: 'createdAt',
		headerName: 'Creation Date',
		type: 'text',
		width: 250
	},
	{
		field: 'canceledTime',
		headerName: 'Canceled Date',
		type: 'text',
		width: 250
	},
	{
		field: 'updatedAt',
		headerName: 'Updation Date',
		type: 'text',
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
// 	{
// 		id: 456,
// 		displayName: 'Tasduq',
// 		role: 'Manager',
// 		license: 'N/A',
// 		licenseStatus: 'active',
// 		plan: 'N/A',
// 		robot: 'N/A'
// 	},
// 	{
// 		id: 457,
// 		displayName: 'Tasduq',
// 		role: 'Manager',
// 		license: 'N/A',
// 		licenseStatus: 'active',
// 		plan: 'N/A',
// 		robot: 'N/A'
// 	},
// 	{
// 		id: 458,
// 		displayName: 'Tasduq',
// 		role: 'Manager',
// 		license: 'N/A',
// 		licenseStatus: 'active',
// 		plan: 'N/A',
// 		robot: 'N/A'
// 	}
// ];

export default function Tabletrading({ handleButtons, data, handleUpdate }) {
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
