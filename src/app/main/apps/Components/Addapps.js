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
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { ToastContainer, toast } from 'react-toastify';
import { getUsers } from '../../connection/Users';
import { addApps } from '../../connection/Apps';

const useStyles = makeStyles(theme => ({
	formControl: {
		marginTop: theme.spacing(1),
		minWidth: '100%',
		minHeight: '20px'
	},
	selectEmpty: {
		marginTop: theme.spacing(3)
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		marginTop: '5px'
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 200
	}
}));

export default function Addapps({ open, handleClose, handleClickOpen, handleUpdate }) {
	const classes = useStyles();
	const [values, setValues] = useState({
		userId: '',
		emailAlertOnError: false,
		emailOnError: '',
		smsAlertOnError: false,
		mobileOnError: '',
		isErrorReported: false,
		userName: '',
		lastPingTime: new Date('2021-08-18T21:11:54'),
		privateKey: ''
	});

	const [users, setUsers] = useState();
	const [userName, setUserName] = useState();

	const handleChange = e => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value
		});
	};

	const handleLastPingDateChange = date => {
		setValues({
			...values,
			lastPingTime: date
		});
	};

	const handleUserNameChange = (id, name) => {
		setValues({
			...values,
			userId: id,
			userName: name
		});
	};

	const handleEmailOnErrorChange = evt => {
		setValues({
			...values,
			emailOnError: evt.target.value
		});
	};

	const handleMobileOnErrorChange = evt => {
		const { value } = evt.target;

		setValues({
			...values,
			mobileOnError: evt.target.value
		});
	};

	async function handleSubmit() {
		let res = await addApps(values);
		console.log(res);
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
		let fetchUsers = async () => {
			let foundUsers = await getUsers();
			setUsers(foundUsers.data.users);
		};
		fetchUsers();
	}, []);

	return (
		<div>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Add New Apps</DialogTitle>
				<DialogContent>
					<DialogContentText>Add New Apps Details</DialogContentText>
					{users && (
						<FormControl variant="outlined" className={classes.formControl}>
							<InputLabel id="demo-simple-select-outlined-label">Select User</InputLabel>
							<Select
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								value={values.userId}
								name="userId"
								// onChange={handleChange}
								label="Age"
								// placeHolder={userName}
							>
								{users.map(user => {
									return (
										<MenuItem
											onClick={() => handleUserNameChange(user._id, user.displayName)}
											value={user._id}
										>
											{user.displayName}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					)}
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="App Name"
						type="text"
						fullWidth
						variant="outlined"
						value={values.appName}
						name="appName"
						onChange={handleChange}
					/>

					<TextField
						margin="dense"
						id="name"
						label="Private Key"
						type="privateKey"
						fullWidth
						variant="outlined"
						value={values.privateKey}
						name="privateKey"
						onChange={handleChange}
					/>

					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">Email Alert on Error</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={values.emailAlertOnError}
							name="emailAlertOnError"
							onChange={handleChange}
							label="Age"
						>
							<MenuItem value={true}>active</MenuItem>
							<MenuItem value={false}>inactive</MenuItem>
						</Select>
					</FormControl>
					<TextField
						margin="dense"
						id="name"
						label="Email list on Error"
						type="text"
						fullWidth
						variant="outlined"
						value={values.emailOnError}
						name="emailOnError"
						onChange={handleEmailOnErrorChange}
						placeholder="Seprate Emails by commas"
					/>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">SMS Alert on Error</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={values.smsAlertOnError}
							name="smsAlertOnError"
							onChange={handleChange}
							label="Age"
						>
							<MenuItem value={true}>active</MenuItem>
							<MenuItem value={false}>inactive</MenuItem>
						</Select>
					</FormControl>
					<TextField
						margin="dense"
						id="name"
						label="Mobile list on Error"
						type="text"
						fullWidth
						variant="outlined"
						value={values.mobileOnError}
						name="mobileOnError"
						onChange={handleMobileOnErrorChange}
						placeholder="Seprate by commas"
					/>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">Is Error Reported?</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={values.isErrorReported}
							name="isErrorReported"
							onChange={handleChange}
							label="Is Error Reported"
						>
							<MenuItem value={true}>Yes</MenuItem>
							<MenuItem value={false}>No</MenuItem>
						</Select>
					</FormControl>

					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Grid>
							<KeyboardDatePicker
								disableToolbar
								variant="inline"
								format="MM/dd/yyyy"
								margin="normal"
								id="date-picker-inline"
								label="Last Ping Date"
								value={values.lastPingTime}
								onChange={handleLastPingDateChange}
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
						Add App
					</button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
