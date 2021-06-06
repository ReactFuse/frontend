import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import { updateProfile } from '../../connection/profile';
import { ToastContainer, toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
	// root: {
	// 	'& .MuiTextField-root': {
	// 		margin: theme.spacing(1),
	// 		width: '25ch'
	// 	}
	// },
	layoutHeader: {
		height: 320,
		minHeight: 320,
		[theme.breakpoints.down('md')]: {
			height: 240,
			minHeight: 240
		}
	}
}));

function ProfilePage() {
	const classes = useStyles();

	const [displayName, setDisplayName] = useState();
	const [newPassword, setNewPassword] = useState();
	const [passwordChanged, setPasswordChanged] = useState(false);
	const [update, setUpdate] = useState(false);
	const [disableButton, setDiableButton] = useState(true);

	const user = useSelector(({ auth }) => auth.user);

	console.log(user);

	const handleDisplayName = evt => {
		console.log(evt.target.value);
		setDisplayName(evt.target.value);
		setUpdate(true);
	};

	const handleNewPassword = evt => {
		setUpdate(false);
		console.log(evt.target.value.length);
		setNewPassword(evt.target.value);
		if (evt.target.value.length === 0) {
			console.log('i am zero');
			setUpdate(true);
		}
		if (evt.target.value.length >= 6) {
			setPasswordChanged(true);
			setUpdate(true);
		} else if (evt.target.value.length < 6) {
			setPasswordChanged(false);
		}
	};

	const handleSubmit = async () => {
		if (passwordChanged) {
			let res = await updateProfile({ displayName, newPassword, userId: user.userId });
		} else {
			let res = await updateProfile({ displayName, userId: user.userId });
			console.log(res);
		}
	};

	useEffect(() => {
		setDisplayName(user.displayName);
		setNewPassword('');
	}, []);

	return (
		<div>
			<FusePageSimple
				classes={{
					header: classes.layoutHeader,
					toolbar: 'px-16 sm:px-24'
				}}
				header={
					<div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
						<div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
							<FuseAnimate animation="transition.expandIn" delay={300}>
								<Avatar className="w-96 h-96" src="assets/images/avatars/Velazquez.jpg" />
							</FuseAnimate>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Typography
									className="md:mx-24 text-24 md:text-32 my-8 md:my-0"
									variant="h4"
									color="inherit"
								>
									{user ? user.displayName : 'John Doe'}
								</Typography>
							</FuseAnimate>
						</div>

						{/* <div className="flex items-center justify-end">
							<Button className="mx-8 normal-case" variant="contained" color="secondary" aria-label="Follow">
							Follow
						</Button>
						<Button className="normal-case" variant="contained" color="primary" aria-label="Send Message">
							Send Message
						</Button>
						</div> */}
					</div>
				}
			/>
			<div className="container  text-center">
				<br />
				<br />
				<div>
					<h2 className="display-3">Profile Management</h2>
				</div>
				<br />
				<br />
				{displayName && (
					<div className="">
						<div>
							<form onSubmit={handleSubmit}>
								<TextField
									id="outlined-password-input"
									label="Display Name"
									type="text"
									// autoComplete="current-password"
									variant="outlined"
									className="w-50"
									value={displayName}
									onChange={handleDisplayName}
								/>
								<br />
								<br />
								<TextField
									id="outlined-password-input"
									label="Email"
									type="email"
									autoComplete="current-password"
									variant="outlined"
									disabled
									className="w-50"
									value={user.email}
								/>
								<br />
								<br />
								<TextField
									id="outlined-password-input"
									label="New Password"
									type="password"
									autoComplete="current-password"
									variant="outlined"
									className="w-50"
									value={newPassword}
									onChange={handleNewPassword}
								/>
								<br />
								<br />
								<TextField
									id="outlined-password-input"
									label="Role"
									type="text"
									disabled
									autoComplete="current-password"
									variant="outlined"
									className="w-50"
									value={user.role}
								/>
								<br />
								<br />
								<TextField
									id="outlined-password-input"
									label="Private Key"
									type="text"
									disabled
									autoComplete="current-password"
									variant="outlined"
									className="w-50"
									disabled
									value={user._id}
								/>
								<br />
								<br />
							</form>
							{update && (
								<button
									onClick={handleSubmit}
									className={`btn btn-primary btn-lg w-50`}
									style={{ height: '45px' }}
								>
									Update
								</button>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default ProfilePage;
