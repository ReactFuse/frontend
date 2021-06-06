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

import { addServers } from '../../connection/Servers';

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

export default function Editservers({ open, handleClose, handleClickOpen }) {
	const classes = useStyles();
	const [values, setValues] = useState({
		userId: '',
		serverIp: '',
		subscriptionType: '',
		startTime: new Date().toLocaleString(),
		endTime: new Date().toLocaleString(),
		canceledTime: new Date().toLocaleString(),
		autoRenew: false,
		comment: '',
		lastPingTime: new Date().toLocaleString(),
		emailAlertOnError: '',
		emailOnError: '',
		smsAlertOnError: '',
		mobileOnError: '',
		isErrorReported: false
	});

	const handleChange = e => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value
		});
	};

	function handleSubmit() {
		addServers(values);
		handleClose();
	}

	return (
		<div>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Edit Server</DialogTitle>
				<DialogContent>
					<DialogContentText>Edit Server Details</DialogContentText>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">Select User</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={values.userId}
							name="role"
							onChange={handleChange}
							label="Age"
						>
							<MenuItem value="user1">user1</MenuItem>
							<MenuItem value="user2">user2</MenuItem>
							<MenuItem value="user3">User3</MenuItem>
						</Select>
					</FormControl>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Server IP"
						type="text"
						fullWidth
						variant="outlined"
						value={values.serverIp}
						name="serverIp"
						onChange={handleChange}
					/>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">Select Subscription Type</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={values.subscriptionType}
							name="role"
							onChange={handleChange}
							label="Subscription Type"
						>
							<MenuItem value="type1">type1</MenuItem>
							<MenuItem value="type2">type2</MenuItem>
							<MenuItem value="type3">type3</MenuItem>
						</Select>
					</FormControl>
					<form className={classes.container} noValidate>
						<TextField
							id="time"
							label="Start Time"
							type="time"
							defaultValue="07:30"
							className={classes.textField}
							InputLabelProps={{
								shrink: true
							}}
							inputProps={{
								step: 300 // 5 min
							}}
							style={{ width: '100%' }}
							// value={values.startTime}
						/>
					</form>
					<form className={classes.container} noValidate>
						<TextField
							id="time"
							label="End Time"
							type="time"
							defaultValue="07:30"
							className={classes.textField}
							InputLabelProps={{
								shrink: true
							}}
							inputProps={{
								step: 300 // 5 min
							}}
							style={{ width: '100%' }}
							// value={values.endTime}
						/>
					</form>
					<form className={classes.container} noValidate>
						<TextField
							id="time"
							label="Canceled Time"
							type="time"
							defaultValue="07:30"
							className={classes.textField}
							InputLabelProps={{
								shrink: true
							}}
							inputProps={{
								step: 300 // 5 min
							}}
							style={{ width: '100%' }}
							// value={values.canceledTime}
						/>
					</form>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">Active Auto Renew </InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={values.autoRenew}
							name="role"
							onChange={handleChange}
							label="Age"
						>
							<MenuItem value={true}>active</MenuItem>
							<MenuItem value={false}>inactive</MenuItem>
						</Select>
					</FormControl>
					<form className={classes.container} noValidate>
						<TextField
							id="time"
							label="Last Ping Time"
							type="time"
							defaultValue="07:30"
							className={classes.textField}
							InputLabelProps={{
								shrink: true
							}}
							inputProps={{
								step: 300 // 5 min
							}}
							style={{ width: '100%' }}
							// value={values.canceledTime}
						/>
					</form>
					<TextField
						margin="dense"
						id="name"
						label="Comment"
						type="comment"
						fullWidth
						variant="outlined"
						value={values.comment}
						name="comment"
						onChange={handleChange}
					/>
					<TextField
						margin="dense"
						id="name"
						label="Email Alert On Error"
						type="text"
						fullWidth
						variant="outlined"
						value={values.emailAlertOnError}
						name="emailAlertOnError"
						onChange={handleChange}
					/>
					<TextField
						margin="dense"
						id="name"
						label="Email on Error"
						type="text"
						fullWidth
						variant="outlined"
						value={values.emailOnError}
						name="emailOnError"
						onChange={handleChange}
					/>
					<TextField
						margin="dense"
						id="name"
						label="Sms Alert On Error"
						type="text"
						fullWidth
						variant="outlined"
						value={values.smsAlertOnError}
						name="smsAlertOnError"
						onChange={handleChange}
					/>
					<TextField
						margin="dense"
						id="name"
						label="Mobile Alert On Error"
						type="text"
						fullWidth
						variant="outlined"
						value={values.mobileAlertOnError}
						name="mobileAlertOnError"
						onChange={handleChange}
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
							<MenuItem value={true}>true</MenuItem>
							<MenuItem value={false}>false</MenuItem>
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<button className="btn btn-primary btn-lg" onClick={handleSubmit}>
						{' '}
						Update Server
					</button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
