import axios from 'axios';
let url = 'http://localhost:5002';

const updateProfile = data => {
	console.log(data);
	let res;
	res = axios.post(`${url}/api/users/updateprofile`, data);

	return res;
};

export { updateProfile };
