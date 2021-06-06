import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import reducer from './store';
import { getUserData } from './store/userSlice';
import { selectContactById, getContacts } from './store/contactsSlice';
import {
	closeContactSidebar,
	openContactSidebar,
	openMobileChatsSidebar,
	closeUserSidebar,
	closeMobileChatsSidebar
} from './store/sidebarsSlice';
import { ToastContainer, toast } from 'react-toastify';

import Tablerobots from '../Components/Tablerobots';
import Deletedialog from '../Components/Deletedialog';
import { deleteRobots, getRobots, getRobot } from '../../connection/Robots';

import Addrobots from '../Components/Addrobots';
import Editrobots from '../Components/Editrobots';
// import { useDispatch, useSelector } from 'react-redux';

const drawerWidth = 400;
const headerHeight = 200;

const useStyles = makeStyles(theme => ({}));

function ChatApp(props) {
	const [openAddRobots, setOpenAddRobots] = React.useState(false);
	const [openEditRobots, setOpenEditRobots] = React.useState(false);

	const [deleteActive, setDeleteActive] = React.useState(false);
	const [editActive, setEditActive] = React.useState(false);
	const [selected, setSelected] = React.useState();

	const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

	const [robots, setRobots] = useState();
	const [update, setUpdate] = useState(false);
	const [editRobotData, setEditRobotData] = useState();
	const user = useSelector(({ auth }) => auth.user);

	const [search, setSearch] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [filterData, setFilterData] = useState('');

	const handleSearchChange = evt => {
		let yoo;
		setSearchValue(evt.target.value);
		yoo = robots.filter(robot => {
			return robot.managerName.toLowerCase().includes(evt.target.value.toLowerCase());
		});
		// console.log(yoo);
		setSearch(yoo);
	};

	const handleFilter = type => {
		console.log(type);

		if (type === 'active') {
			let yoo = filterData.filter(robot => {
				return robot.active === 'Active ';
			});
			console.log(yoo);
			setRobots(yoo);
		} else if (type === 'cancel') {
			let yoo = filterData.filter(robot => {
				return robot.active === 'Canceled';
			});
			setRobots(yoo);
		} else if (type === 'all') {
			setRobots(filterData);
		}
	};

	const handleOpenDeleteDialog = () => {
		setOpenDeleteDialog(!openDeleteDialog);
	};

	const handleAddRobotsOpen = () => {
		setOpenAddRobots(!openAddRobots);
	};

	const handleEditRobotsOpen = async () => {
		let res = await getRobot({ id: selected[0] });
		console.log(res);
		setEditRobotData(res.data.robot[0]);
		setOpenEditRobots(!openEditRobots);
	};

	const handleButtons = len => {
		console.log(len);
		setSelected(len.selectionModel);
		if (len.selectionModel.length > 1) {
			setDeleteActive(true);
			setEditActive(false);
		} else if (len.selectionModel.length === 1) {
			setDeleteActive(true);
			setEditActive(true);
		} else if (len.selectionModel.length === 0) {
			setDeleteActive(false);
			setEditActive(false);
		}
	};

	const handleDelete = async () => {
		let res = await deleteRobots(selected);
		console.log(res);
		if (res.data.success === true) {
			toast.success(res.data.message, {
				position: toast.POSITION.TOP_RIGHT
			});
			handleUpdate(true);
		} else {
			toast.error(res.data.message, {
				position: toast.POSITION.TOP_RIGHT
			});
		}
		handleOpenDeleteDialog();
	};

	const handleUpdate = updateState => {
		setUpdate(updateState);
		setDeleteActive(false);
		setEditActive(false);
	};

	useEffect(() => {
		const fetchRobots = async () => {
			let foundRobots = await getRobots();

			console.log(foundRobots);
			let yoo = foundRobots.data.robots.map(robot => {
				return {
					...robot,
					id: robot._id,
					createdAt: new Date(robot.createdAt),
					updatedAt: robot.updatedAt ? new Date(robot.updatedAt) : '',
					active: robot.active === true ? 'Active ' : 'Canceled'
				};
			});
			console.log(yoo);
			console.log(user);

			if (user.role !== 'admin') {
				yoo = yoo.filter(robot => {
					return robot.managerId === user._id;
				});
				setRobots(yoo);
				setFilterData(yoo);
			} else if (user.role === 'admin') {
				setRobots(yoo);
				setFilterData(yoo);
			}
		};

		fetchRobots();
		setUpdate(false);
	}, [update === true]);

	return (
		<div className="container mt-5 text-center">
			{console.log(robots)}
			<div>
				<h2 className="display-3">Robots Management </h2>
			</div>
			<br />
			<br />
			<div className="row">
				<div className="col-12 col-md-8">
					<div class="input-group">
						<input
							type="text"
							class="form-control"
							aria-label="Dollar amount (with dot and two decimal places)"
							style={{ height: '35px' }}
							value={searchValue}
							onChange={handleSearchChange}
							placeholder="Search By Manager Name"
						/>
						<div class="input-group-append">
							<span class="input-group-text">
								<i class="fas fa-search"></i>
							</span>
						</div>
					</div>
				</div>
				<div className="col-12 col-md-4 mt-3 mt-md-0">
					{console.log(selected)}
					<div class="dropdown">
						<button
							class="btn btn-lg border dropdown-toggle"
							type="button"
							id="dropdownMenuButton"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
							style={{ width: '80%', height: '35px' }}
						>
							Filter : Active/cancceled
						</button>
						<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
							<p class="dropdown-item" onClick={() => handleFilter('active')}>
								Active
							</p>
							<p class="dropdown-item" onClick={() => handleFilter('cancel')}>
								Canceled
							</p>
							<p class="dropdown-item" onClick={() => handleFilter('all')}>
								All
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="row mt-3">
				<div className="col-12 col-md-8"></div>
				<div className="col-12 col-md-4">
					<button
						className={`${deleteActive ? '' : 'disabled'} btn btn-danger btn-lg mx-2`}
						onClick={handleOpenDeleteDialog}
						disabled={deleteActive ? false : true}
					>
						Cancel <i class="fas fa-times"></i>
					</button>

					<button
						className={`${editActive ? '' : 'disabled'} btn btn-primary btn-lg mx-2 mt-2 mt-lg-0`}
						onClick={handleEditRobotsOpen}
						disabled={editActive ? false : true}
					>
						Edit <i class="far fa-edit"></i>
					</button>
					<button className="btn btn-success btn-lg mx-2 mt-2 mt-lg-0" onClick={handleAddRobotsOpen}>
						Add <i class="fas fa-plus"></i>
					</button>
				</div>
			</div>

			<br />
			{robots && (
				<div>
					<Tablerobots
						handleButtons={handleButtons}
						data={searchValue.length > 0 ? search : robots}
						handleUpdate={handleUpdate}
					/>
				</div>
			)}

			{openAddRobots && (
				<Addrobots open={openAddRobots} handleClose={handleAddRobotsOpen} handleUpdate={handleUpdate} />
			)}
			{openEditRobots && (
				<Editrobots
					open={openEditRobots}
					handleClose={handleEditRobotsOpen}
					data={editRobotData}
					handleUpdate={handleUpdate}
				/>
			)}

			<Deletedialog
				open={openDeleteDialog}
				handleClose={handleOpenDeleteDialog}
				handleClickOpen={handleOpenDeleteDialog}
				handleDelete={handleDelete}
			/>
		</div>
	);
}

export default withReducer('chatApp', reducer)(ChatApp);
