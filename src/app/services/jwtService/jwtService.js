import FuseUtils from '@fuse/utils/FuseUtils';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import history from '@history';
import { ToastContainer, toast } from 'react-toastify';

//import { Redirect } from 'react-router-dom';

/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);
						history.push({
							pathname: '/login'
						});
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');

			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			// this.setSession(null);
			// this.emit('onAutoLogout', 'token expired');
		}
	};

	createUser = data => {
		return new Promise((resolve, reject) => {
			console.log(data);
			axios.post('http://localhost:5002/api/users/register', data).then(response => {
				console.log(response);
				if (response.data) {
					console.log('userID checking ', response.data.userId);
					this.setSession(response.data.access_token, response.data.userId);
					resolve(response.data);
				} else {
					reject(response.data.error);
				}
			});
		});
	};
	signInWithEmailAndPassword = (email, password) => {
		var data = { email, password };
		console.log(data);
		return new Promise((resolve, reject) => {
			axios.post('http://localhost:5002/api/users/login', data).then(response => {
				if (response.data.success === true) {
					localStorage.setItem('jwt_access_token', response.data.access_token);
					console.log('our token', response.data.access_token);
					this.setSession(response.data.access_token, response.data.userId);
					console.log('login data check ', response.data);
					toast.success('Logged in Successfully', {
						position: toast.POSITION.TOP_RIGHT
					});

					console.log('login access_token ', response.data.access_token);
					resolve(response.data);

					//	resolve(response.data.user);
				} else if (response.data.success === false) {
					console.log('IN ELSE');
					toast.error('Logged in error Email or password is wrong', {
						position: toast.POSITION.TOP_RIGHT
					});
					reject(response.data.error);
				}
			});
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			console.log('cheking in token coming');
			var access_token = this.getAccessToken();
			access_token = localStorage.getItem('jwt_access_token');
			console.log('access token', access_token);
			axios
				.post('http://localhost:5002/api/users/access-token', { access_token })
				.then(response => {
					console.log('Setting up token', response.data);
					if (response.data.user) {
						this.setSession(response.data.access_token);
						resolve(response.data.user);
					} else {
						alert('hyhyhyhyhjshakdjshdajksh');
						this.logout();
						reject(new Error('Failed to login with token.'));
					}
				})
				.catch(error => {
					console.log('hellllllllllllllllllllllllllllllloooooooooooooooo');
					history.push({
						pathname: '/login'
					});
					this.logout();
					reject(new Error('Failed to login with token.'));
				});
		});
	};

	updateUserData = user => {
		return axios.post('/api/user/update', {
			user
		});
	};

	setSession = (access_token, userId) => {
		if (access_token) {
			console.log('hahaha>>>>>>>>>>>>>');
			console.log('hahaha>>>>>>>>>>>>>', access_token);
			console.log('hahaha>>>>>>>>>>>>>', userId);
			localStorage.setItem('jwt_access_token', access_token);
			localStorage.setItem('user-id', userId);
			//in here

			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.removeItem('jwt_access_token');
			localStorage.removeItem('user-id');
			delete axios.defaults.headers.common.Authorization;
			history.push({
				pathname: '/login'
			});
		}
	};

	logout = () => {
		this.setSession(null);
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		// const currentTime = Date.now() / 1000;
		// if (decoded.exp < currentTime) {
		// 	console.warn('access token expired');
		// 	return false;
		// }

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('jwt_access_token');
	};
}

const instance = new JwtService();

export default instance;
