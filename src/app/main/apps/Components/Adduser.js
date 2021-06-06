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

import { addUser } from '../../connection/Users';

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

export default function Adduser({ open, handleClose, handleUpdate }) {
	const classes = useStyles();
	const [values, setValues] = useState({
		displayName: '',
		email: '',
		password: '',
		role: ''
	});

	const handleChange = e => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value
		});
	};

	function validateEmail(email) {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	}

	async function handleSubmit() {
		let valid = validateEmail(values.email);
		if (valid) {
			if (values.displayName.length >= 2) {
				if (values.password.length >= 6) {
					if (values.role.length >= 4) {
						let res = await addUser(values);
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
					} else {
						toast.error('Please select a valid Role', {
							position: toast.POSITION.TOP_RIGHT
						});
					}
				} else {
					toast.error('password cannot be less than 6 words ', {
						position: toast.POSITION.TOP_RIGHT
					});
				}
			} else {
				toast.error('Display name cannot be empty or smaller than 2 words', {
					position: toast.POSITION.TOP_RIGHT
				});
			}
		} else {
			toast.error('Email is not valid', {
				position: toast.POSITION.TOP_RIGHT
			});
		}
	}

	return (
		<div>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				<DialogTitle id="form-dialog-title">Add New User</DialogTitle>
				<DialogContent>
					<DialogContentText>Add New User Details</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Display Name"
						type="text"
						fullWidth
						variant="outlined"
						value={values.displayName}
						name="displayName"
						onChange={handleChange}
					/>
					<TextField
						margin="dense"
						id="name"
						label="Email Address"
						type="email"
						fullWidth
						variant="outlined"
						value={values.email}
						name="email"
						onChange={handleChange}
					/>
					<TextField
						margin="dense"
						id="name"
						label="Password"
						type="password"
						fullWidth
						variant="outlined"
						value={values.password}
						name="password"
						onChange={handleChange}
					/>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel id="demo-simple-select-outlined-label">Select Role</InputLabel>
						<Select
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={values.role}
							name="role"
							onChange={handleChange}
							label="Age"
						>
							<MenuItem value="admin">Admin</MenuItem>
							<MenuItem value="manager">Manager</MenuItem>
							<MenuItem value="user">User</MenuItem>
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<button className="btn btn-primary btn-lg" onClick={handleSubmit}>
						{' '}
						Add User
					</button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
