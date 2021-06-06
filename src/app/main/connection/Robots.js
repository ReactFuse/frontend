import axios from 'axios';
let url = 'http://localhost:5002';

const getRobots = async data => {
	console.log(data);
	let res;
	res = await axios.get(`${url}/api/robots`);

	return res;
};

const getRobot = async data => {
	console.log(data);
	let res;
	res = await axios.post(`${url}/api/robots/getrobot`, data);
	console.log(res);

	return res;
};

const addRobots = async data => {
	console.log(data);
	let res;
	res = await axios.post(`${url}/api/robots/add`, data);

	return res;
};

const deleteRobots = async data => {
	console.log(data);
	let res;
	res = await axios.post(`${url}/api/robots/cancel`, data);
	console.log(res);

	return res;
};

const editRobots = async data => {
	console.log(data);
	let res = await axios.post(`${url}/api/robots/update`, data);
	console.log(res);

	return res;
};

export { addRobots, deleteRobots, editRobots, getRobots, getRobot };
