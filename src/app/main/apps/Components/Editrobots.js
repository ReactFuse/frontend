import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ToastContainer, toast } from 'react-toastify';

import { addTradingLicense, getManagers } from '../../connection/Tradinglicense';
import { editRobots } from '../../connection/Robots';

const useStyles = makeStyles(theme => ({
	formControl: {
		marginTop: theme.spacing(1),
		minWidth: '100%',
		minHeight: '20px'
	},
	selectEmpty: {
		marginTop: theme.spacing(3)
	}
}));

export default function Editrobots({ open, handleClose, handleClickOpen, data, handleUpdate }) {
	const classes = useStyles();
	const [values, setValues] = useState({
		active: data.active,
		description: data.description,
		managerId: data.managerId,
		managerName: data.managerName,
		id: data._id
	});

	const [managers, setManagers] = useState();

	const handleChange = e => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value
		});
	};

	const handleManagerChange = e => {
		const { name, value } = e.target;
		console.log(name, value);
		setValues({
			...values,
			managerId: value.id,
			managerName: value.name
		});
	};

	async function handleSubmit() {
		let res = await editRobots(values);
		if (res.data.success === true) {
			toast.success(res.data.message, {
				position: toast.POSITION.TOP_RIGHT
			});
			handleUpdate(true);
		} else {
			toast.error(res.data.message, {
				position: toast.POSITION.TOP_RIGHT
			});
		}
		handleClose();
	}

	useEffect(() => {
		let fetchManagers = async () => {
			let foundManagers = await getManagers();
			setManagers(foundManagers.data.managers);
		};
		fetchManagers();
	}, []);

	return (
		<div>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Edit Robot</DialogTitle>
				<DialogContent>
					<DialogContentText>Edit Robot Details</DialogContentText>
					<textarea
						aria-label="minimum height"
						rows="4"
						cols="50"
						placeholder="Description"
						value={values.description}
						style={{ border: '1px solid grey' }}
						className="w-100 p-4 my-2"
						name="description"
						onChange={handleChange}
					/>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">Select Robot Active Status</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={values.active}
							name="active"
							onChange={handleChange}
							label="Age"
						>
							<MenuItem value={true}>Active</MenuItem>
							<MenuItem value={false}>In Active</MenuItem>
						</Select>
					</FormControl>
					{/* {managers && (
						<FormControl variant="outlined" className={classes.formControl}>
							<InputLabel id="demo-simple-select-outlined-label">Select Manager</InputLabel>
							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								value={values.managerId}
								name="managerId"
								onChange={handleManagerChange}
								label="Age"
							>
								{managers.map(manager => {
									return (
										<MenuItem value={{ id: manager._id, name: manager.displayName }}>
											{manager.displayName}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					)} */}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<button className="btn btn-primary btn-lg" onClick={handleSubmit}>
						{' '}
						Update Robot
					</button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
