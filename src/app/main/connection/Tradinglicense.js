import axios from 'axios';
// let url = 'http://localhost:5002';
let url = 'https://reactfusebackend.herokuapp.com';

const getTradings = async data => {
	console.log(data);
	let res;
	res = await axios.get(`${url}/api/tradings`);

	return res;
};

const getTrading = async data => {
	console.log(data);
	let res;
	res = await axios.post(`${url}/api/tradings/gettrading`, data);
	console.log(res);

	return res;
};

const addTradings = async data => {
	console.log(data);
	let res;
	res = await axios.post(`${url}/api/tradings/add`, data);
	console.log(res);
	return res;
};

const deleteTradings = async data => {
	console.log(data);
	let res;
	res = await axios.post(`${url}/api/tradings/cancel`, data);
	console.log(res);

	return res;
};

const editTradings = async data => {
	console.log(data);
	let res = await axios.post(`${url}/api/tradings/update`, data);
	console.log(res);

	return res;
};

const getManagers = async data => {
	let res;
	res = axios.get(`${url}/api/users/getmanagers`);
	return res;
};

export { addTradings, deleteTradings, editTradings, getManagers, getTrading, getTradings };
