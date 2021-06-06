import axios from 'axios';
// let url = 'http://localhost:5002';
let url = 'https://reactfusebackend.herokuapp.com';

const getPlans = async data => {
	console.log(data);
	let res;
	res = await axios.get(`${url}/api/plans`);

	return res;
};

const getPlan = async data => {
	console.log(data);
	let res;
	res = await axios.post(`${url}/api/plans/getplan`, data);
	console.log(res);

	return res;
};

const addPlans = async data => {
	console.log(data);
	let res;
	res = await axios.post(`${url}/api/plans/add`, data);

	return res;
};

const deletePlans = async data => {
	console.log(data);
	let res;
	res = await axios.post(`${url}/api/plans/cancel`, data);
	console.log(res);

	return res;
};

const editPlans = async data => {
	console.log(data);
	let res = await axios.post(`${url}/api/plans/update`, data);
	console.log(res);

	return res;
};

export { addPlans, deletePlans, editPlans, getPlans, getPlan };
