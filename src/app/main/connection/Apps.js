import axios from 'axios';
let url = 'http://localhost:5002';

const getApps = async data => {
	console.log(data);
	let res;
	res = await axios.get(`${url}/api/apps`);

	return res;
};

const getApp = async data => {
	console.log(data);
	let res;
	res = await axios.post(`${url}/api/apps/getapp`, data);
	console.log(res);

	return res;
};

const addApps = async data => {
	console.log(data);
	let res;
	res = await axios.post(`${url}/api/apps/add`, data);
	console.log(res);
	return res;
};

const deleteApps = async data => {
	console.log(data);
	let res;
	res = await axios.post(`${url}/api/apps/remove`, data);
	console.log(res);

	return res;
};

const editApps = async data => {
	console.log(data);
	let res = await axios.post(`${url}/api/apps/update`, data);
	console.log(res);

	return res;
};

const getTestEmails = async data => {
	console.log(data);
	let res = await axios.post(`${url}/api/apps/gettestemails`, data);
	console.log(res);

	return res;
};

const sendEmailToOne = async data => {
	console.log(data);
	let res = await axios.post(`${url}/api/apps/sendemailone`, data);
	console.log(res);

	return res;
};

const sendEmailToAll = async data => {
	console.log(data);
	let res = await axios.post(`${url}/api/apps/sendemailall`, data);
	console.log(res);

	return res;
};

export { addApps, deleteApps, editApps, getApps, getApp, getTestEmails, sendEmailToAll, sendEmailToOne };
