// import FuseAnimate from '@fuse/core/FuseAnimate';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import { makeStyles } from '@material-ui/core/styles';
// import { darken } from '@material-ui/core/styles/colorManipulator';
// import Tab from '@material-ui/core/Tab';
// import Tabs from '@material-ui/core/Tabs';
// import Typography from '@material-ui/core/Typography';
// import clsx from 'clsx';
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Auth0LoginTab from './tabs/Auth0LoginTab';
// import FirebaseLoginTab from './tabs/FirebaseLoginTab';
// import JWTLoginTab from './tabs/JWTLoginTab';

// const useStyles = makeStyles(theme => ({
// 	root: {
// 		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
// 			theme.palette.primary.dark,
// 			0.5
// 		)} 100%)`,
// 		color: theme.palette.primary.contrastText
// 	},
// 	leftSection: {},
// 	rightSection: {
// 		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
// 			theme.palette.primary.dark,
// 			0.5
// 		)} 100%)`,
// 		color: theme.palette.primary.contrastText
// 	}
// }));

// function Login() {
// 	const classes = useStyles();
// 	const [selectedTab, setSelectedTab] = useState(0);

// 	function handleTabChange(event, value) {
// 		setSelectedTab(value);
// 	}

// 	return (
// 		<div
// 			className={clsx(
// 				classes.root,
// 				'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
// 			)}
// 		>
// 			<FuseAnimate animation="transition.expandIn">
// 				<div className="flex w-full max-w-400 md:max-w-3xl rounded-12 shadow-2xl overflow-hidden">
// 					<Card
// 						className={clsx(
// 							classes.leftSection,
// 							'flex flex-col w-full max-w-sm items-center justify-center'
// 						)}
// 						square
// 						elevation={0}
// 					>
// 						<CardContent className="flex flex-col items-center justify-center w-full py-96 max-w-320">
// 							<FuseAnimate delay={300}>
// 								<div className="flex items-center mb-32">
// 									<img className="logo-icon w-48" src="assets/images/logos/fuse.svg" alt="logo" />
// 									<div className="border-l-1 mr-4 w-1 h-40" />
// 									<div>
// 										<Typography className="text-24 font-800 logo-text" color="inherit">
// 											FUSE
// 										</Typography>
// 										<Typography
// 											className="text-16 tracking-widest -mt-8 font-700"
// 											color="textSecondary"
// 										>
// 											REACT
// 										</Typography>
// 									</div>
// 								</div>
// 							</FuseAnimate>

// 							<Tabs
// 								value={selectedTab}
// 								onChange={handleTabChange}
// 								variant="fullWidth"
// 								className="w-full mb-32"
// 							>
// 								<Tab
// 									icon={
// 										<img
// 											className="h-40 p-4 bg-black rounded-12"
// 											src="assets/images/logos/jwt.svg"
// 											alt="firebase"
// 										/>
// 									}
// 									className="min-w-0"
// 									label="JWT"
// 								/>
// 								{/* <Tab
// 									icon={
// 										<img className="h-40" src="assets/images/logos/firebase.svg" alt="firebase" />
// 									}
// 									className="min-w-0"
// 									label="Firebase"
// 								/>
// 								<Tab
// 									icon={<img className="h-40" src="assets/images/logos/auth0.svg" alt="auth0" />}
// 									className="min-w-0"
// 									label="Auth0"
// 								/> */}
// 							</Tabs>

// 							{selectedTab === 0 && <JWTLoginTab />}
// 							{/* {selectedTab === 1 && <FirebaseLoginTab />}
// 							{selectedTab === 2 && <Auth0LoginTab />} */}
// 						</CardContent>

// 						<div className="flex flex-col items-center justify-center pb-32">
// 							<div>
// 								<span className="font-medium mr-8">Don't have an account?</span>
// 								<Link className="font-medium" to="/register">
// 									Register
// 								</Link>
// 							</div>
// 							<Link className="font-medium mt-8" to="/">
// 								Back to Dashboard
// 							</Link>
// 						</div>
// 					</Card>

// 					<div
// 						className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center p-64')}
// 					>
// 						<div className="max-w-320">
// 							<FuseAnimate animation="transition.slideUpIn" delay={400}>
// 								<Typography variant="h3" color="inherit" className="font-800 leading-tight">
// 									Welcome <br />
// 									to the <br /> FUSE React!
// 								</Typography>
// 							</FuseAnimate>

// 							<FuseAnimate delay={500}>
// 								<Typography variant="subtitle1" color="inherit" className="mt-32">
// 									Powerful and professional admin template for Web Applications, CRM, CMS, Admin
// 									Panels and more.
// 								</Typography>
// 							</FuseAnimate>
// 						</div>
// 					</div>
// 				</div>
// 			</FuseAnimate>
// 		</div>
// 	);
// }

// export default Login;

import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
import JWTLoginTab from './tabs/JWTLoginTab';

const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));

function Login() {
	const classes = useStyles();

	const { form, handleChange, resetForm } = useForm({
		email: '',
		password: '',
		remember: true
	});

	function isFormValid() {
		return form.email.length > 0 && form.password.length > 0;
	}

	function handleSubmit(ev) {
		ev.preventDefault();
		resetForm();
	}

	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 p-24 md:flex-row md:p-0')}>
			<div className="flex flex-col flex-grow-0 items-center text-white p-16 text-center md:p-128 md:items-start md:flex-shrink-0 md:flex-1 md:text-left">
				<FuseAnimate animation="transition.expandIn">
					<img className="w-128 mb-32" src="assets/images/logos/fuse.svg" alt="logo" />
				</FuseAnimate>

				<FuseAnimate animation="transition.slideUpIn" delay={300}>
					<Typography variant="h3" color="inherit" className="font-light">
						Welcome to the FUSE!
					</Typography>
				</FuseAnimate>

				<FuseAnimate delay={400}>
					<Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper nisl erat, vel
						convallis elit fermentum pellentesque. Sed mollis velit facilisis facilisis.
					</Typography>
				</FuseAnimate>
			</div>

			<FuseAnimate animation={{ translateX: [0, '100%'] }}>
				<Card className="w-full max-w-400 mx-auto m-16 md:m-0" square>
					<CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">
						<Typography variant="h6" className="md:w-full mb-32">
							LOGIN TO YOUR ACCOUNT
						</Typography>

						<JWTLoginTab />

						{/* <form
							name="loginForm"
							noValidate
							className="flex flex-col justify-center w-full"
							onSubmit={handleSubmit}
						>
							<TextField
								className="mb-16"
								label="Email"
								autoFocus
								type="email"
								name="email"
								value={form.email}
								onChange={handleChange}
								variant="outlined"
								required
								fullWidth
							/>

							<TextField
								className="mb-16"
								label="Password"
								type="password"
								name="password"
								value={form.password}
								onChange={handleChange}
								variant="outlined"
								required
								fullWidth
							/>

							<div className="flex items-center justify-between">
								<FormControl>
									<FormControlLabel
										control={
											<Checkbox name="remember" checked={form.remember} onChange={handleChange} />
										}
										label="Remember Me"
									/>
								</FormControl>

								<Link className="font-medium" to="/pages/auth/forgot-password-2">
									Forgot Password?
								</Link>
							</div>

							<Button
								variant="contained"
								color="primary"
								className="w-full mx-auto mt-16"
								aria-label="LOG IN"
								disabled={!isFormValid()}
							>
								LOGIN
							</Button>
						</form> */}

						<div className="my-24 flex items-center justify-center">
							<Divider className="w-32" />
							<span className="mx-8 font-bold">OR</span>
							<Divider className="w-32" />
						</div>

						{/* <Button variant="contained" color="secondary" size="small" className="normal-case w-192 mb-8">
							Log in with Google
						</Button>

						<Button variant="contained" color="primary" size="small" className="normal-case w-192">
							Log in with Facebook
						</Button> */}

						<div className="flex flex-col items-center justify-center pt-32 pb-24">
							<span className="font-medium">Don't have an account?</span>
							<Link className="font-medium" to="/pages/auth/register-2">
								Create an account
							</Link>
						</div>
					</CardContent>
				</Card>
			</FuseAnimate>
		</div>
	);
}

export default Login;
