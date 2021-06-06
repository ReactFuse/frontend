import axios from 'axios';
// let url = 'http://localhost:5002';
let url = 'https://reactfusebackend.herokuapp.com';

const getServers = async data => {
	console.log(data);
	let res;
	res = await axios.get(`${url}/api/servers`);

	return res;
};

const getServer = async data => {
	console.log(data);
	let res;
	res = await axios.post(`${url}/api/servers/getserver`, data);
	console.log(res);

	return res;
};

const addServers = async data => {
	console.log(data);
	let res;
	res = await axios.post(`${url}/api/servers/add`, data);
	console.log(res);
	return res;
};

const deleteServers = async data => {
	console.log(data);
	let res;
	res = await axios.post(`${url}/api/servers/cancel`, data);
	console.log(res);

	return res;
};

const editServers = async data => {
	console.log(data);
	let res = await axios.post(`${url}/api/servers/update`, data);
	console.log(res);

	return res;
};

const getTestEmails = async data => {
	console.log(data);
	let res = await axios.post(`${url}/api/servers/gettestemails`, data);
	console.log(res);

	return res;
};

const sendEmailToOne = async data => {
	console.log(data);
	let res = await axios.post(`${url}/api/servers/sendemailone`, data);
	console.log(res);

	return res;
};

const sendEmailToAll = async data => {
	console.log(data);
	let res = await axios.post(`${url}/api/servers/sendemailall`, data);
	console.log(res);

	return res;
};

export { addServers, deleteServers, editServers, getServers, getServer, getTestEmails, sendEmailToAll, sendEmailToOne };
