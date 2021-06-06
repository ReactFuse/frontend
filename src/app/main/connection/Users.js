import axios from 'axios';
// let url = 'http://localhost:5002';
let url = 'https://reactfusebackend.herokuapp.com';

const getUsers = async () => {
	let res;
	res = await axios.get(`${url}/api/users/`);
	console.log(res);

	return res;
};

const getUser = async data => {
	console.log(data);
	let res;
	res = await axios.post(`${url}/api/users/getuser`, data);
	console.log(res);

	return res;
};

const addUser = async data => {
	console.log(data);
	let res;
	res = await axios.post(`${url}/api/users/register`, data);
	console.log(res);

	return res;
};

const deleteUser = async data => {
	console.log(data);
	let res;
	res = await axios.post(`${url}/api/users/deleteuser`, data);

	return res;
};

const editUser = async data => {
	console.log(data);
	let res;
	res = await axios.post(`${url}/api/users/edituser`, data);
	console.log(res);

	return res;
};

export { addUser, deleteUser, editUser, getUsers, getUser };
