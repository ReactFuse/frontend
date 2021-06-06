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

import { editTradings } from '../../connection/Tradinglicense';
import { addTradings, getManagers } from '../../connection/Tradinglicense';
import { getPlans } from '../../connection/Plans';
import { getRobots } from '../../connection/Robots';
import { ToastContainer, toast } from 'react-toastify';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';

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

export default function Edittradinglicense({ open, handleClose, handleClickOpen, data, handleUpdate }) {
	const classes = useStyles();
	const [values, setValues] = useState({
		accountNum: data.accountNum,
		description: data.description,
		managerId: data.managerId,
		robotId: data.robotId,
		planId: data.planId,
		managerName: data.managerName,
		id: data._id,
		active: data.active,
		startTime: data.startTime
	});

	const [managers, setManagers] = useState();
	const [plans, setPlans] = useState();
	const [robots, setRobots] = useState();

	const handleManagerChange = e => {
		const { name, value } = e.target;
		console.log(name, value);
		setValues({
			...values,
			managerId: value.id,
			managerName: value.name
		});
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value
		});
	};

	const handlePlanChange = e => {
		const { name, value } = e.target;
		console.log(name, value);
		setValues({
			...values,
			planId: value.id
		});
	};

	const handleStartDateChange = date => {
		setValues({
			...values,
			startTime: date
		});
	};

	async function handleSubmit() {
		let res = await editTradings(values);
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

		let fetchPlans = async () => {
			let foundPlans = await getPlans();
			setPlans(foundPlans.data.plans);
		};
		fetchPlans();

		let fetchRobots = async () => {
			let foundRobots = await getRobots();
			setRobots(foundRobots.data.robots);
		};
		fetchRobots();
	}, []);

	return (
		<div>
			{console.log(data)}
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Edit License </DialogTitle>
				<DialogContent>
					<DialogContentText>Edit Trading License Details</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Account Number"
						type="number"
						fullWidth
						variant="outlined"
						value={values.accountNum}
						name="accountNum"
						onChange={handleChange}
					/>
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
					{plans && (
						<FormControl variant="outlined" className={classes.formControl}>
							<InputLabel id="demo-simple-select-outlined-label">Select Plan</InputLabel>
							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								value={values.planId}
								name="planId"
								onChange={handlePlanChange}
								label="Age"
							>
								{plans.map(plan => {
									return (
										<MenuItem value={{ id: plan._id, name: 'planId' }}>
											<p> Description : {plan.description}</p>
											<p className="d-block mt-2"> ID : {plan._id} </p>{' '}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					)}

					{robots && (
						<FormControl variant="outlined" className={classes.formControl}>
							<InputLabel id="demo-simple-select-outlined-label">Select Robot</InputLabel>
							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								value={values.robotId}
								name="robotId"
								onChange={handleChange}
								label="Age"
							>
								{robots.map(robot => {
									return (
										<MenuItem value={robot._id}>
											<p className="m-2 ml-4"> Description : {robot.description}</p> <hr />
											<p className="d-block mt-2">ID : {robot._id}</p>
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					)}
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Grid>
							<KeyboardDatePicker
								disableToolbar
								variant="inline"
								format="MM/dd/yyyy"
								margin="normal"
								id="date-picker-inline"
								label="Start Date"
								value={values.startTime}
								onChange={handleStartDateChange}
								name="startTime"
								KeyboardButtonProps={{
									'aria-label': 'change date'
								}}
								className="w-100"
							/>
						</Grid>
					</MuiPickersUtilsProvider>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<button className="btn btn-primary btn-lg" onClick={handleSubmit}>
						{' '}
						Update Trading License
					</button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
