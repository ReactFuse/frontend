import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import reducer from '../store';
import { selectBoards, newBoard, getBoards, resetBoards } from '../store/boardsSlice';

import Tableservers from '../../Components/Tableservers';
import Deletedialog from '../../Components/Deletedialog';
import Emailtest from '../../Components/Emailtest';

import { deleteServers, getServer, getServers, getTestEmails } from '../../../connection/Servers';

import Addservers from '../../Components/Addservers';
import Editservers from '../../Components/Editservers';
import { ToastContainer, toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
	root: {
		background: theme.palette.primary.main,
		color: theme.palette.getContrastText(theme.palette.primary.main)
	},
	board: {
		cursor: 'pointer',
		boxShadow: theme.shadows[0],
		transitionProperty: 'box-shadow border-color',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		background: theme.palette.primary.dark,
		color: theme.palette.getContrastText(theme.palette.primary.dark),
		'&:hover': {
			boxShadow: theme.shadows[6]
		}
	},
	newBoard: {
		borderWidth: 2,
		borderStyle: 'dashed',
		borderColor: fade(theme.palette.getContrastText(theme.palette.primary.main), 0.6),
		'&:hover': {
			borderColor: fade(theme.palette.getContrastText(theme.palette.primary.main), 0.8)
		}
	}
}));

function Boards(props) {
	const dispatch = useDispatch();
	const boards = useSelector(selectBoards);

	const classes = useStyles(props);

	useEffect(() => {
		dispatch(getBoards());
		return () => {
			dispatch(resetBoards());
		};
	}, [dispatch]);

	const [openAddServers, setOpenAddServers] = React.useState(false);
	const [openEditServers, setOpenEditServers] = React.useState(false);

	const [deleteActive, setDeleteActive] = React.useState(false);
	const [editActive, setEditActive] = React.useState(false);
	const [selected, setSelected] = React.useState();

	const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
	const [openEmailTestDialog, setOpenEmailTestDialog] = React.useState(false);

	const [servers, setServers] = useState();
	const [update, setUpdate] = useState(false);
	const [editServerData, setEditServerData] = useState();
	const [testEmails, setTestEmails] = useState();

	const [today, setToday] = useState();

	const [search, setSearch] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [filterData, setFilterData] = useState('');

	const user = useSelector(({ auth }) => auth.user);

	const handleSearchChange = evt => {
		let yoo;
		setSearchValue(evt.target.value);
		yoo = servers.filter(server => {
			return server.userName.toLowerCase().includes(evt.target.value.toLowerCase());
		});
		// console.log(yoo);
		setSearch(yoo);
	};

	const handleFilter = type => {
		console.log(type);

		if (type === 'active') {
			let yoo = filterData.filter(server => {
				return server.active === 'Active ';
			});
			console.log(yoo);
			setServers(yoo);
		} else if (type === 'cancel') {
			let yoo = filterData.filter(server => {
				return server.active === 'Canceled';
			});
			setServers(yoo);
		} else if (type === 'all') {
			setServers(filterData);
		}
	};

	const handleOpenDeleteDialog = () => {
		setOpenDeleteDialog(!openDeleteDialog);
	};

	const handleAddServersOpen = () => {
		setOpenAddServers(!openAddServers);
	};

	const handleEditServersOpen = async () => {
		let res = await getServer({ id: selected[0] });
		console.log(res);
		setEditServerData(res.data.server[0]);
		setOpenEditServers(!openEditServers);
	};

	const handleOpenEmailDialog = async type => {
		if (type === 'open') {
			let emails = await getTestEmails({ id: selected[0] });
			console.log(emails.data.testEmails);
			setTestEmails(emails.data.testEmails);
			setOpenEmailTestDialog(true);
		} else if (type === 'close') {
			setOpenEmailTestDialog(false);
		}
	};

	const handleButtons = async len => {
		console.log(len);
		setSelected(len.selectionModel);
		if (len.selectionModel.length > 1) {
			setDeleteActive(false);
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
		let found = servers.find(server => {
			console.log(server, selected[0]);
			return server._id === selected[0];
		});
		console.log(found);

		const checkValid = async (today, endDay) => {
			if (today === endDay) {
				console.log('equal');
				let res = await deleteServers({ id: selected, cancelTime: today });
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
			} else if (today < endDay) {
				let res = await deleteServers({ id: selected, cancelTime: today });
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
			} else if (today > endDay) {
				console.log('bigger');
				toast.error('Your Subscription End Date have Already Passed', {
					position: toast.POSITION.TOP_RIGHT
				});
			}
		};

		checkValid(today, found.endTime);

		handleOpenDeleteDialog();
	};

	const handleUpdate = updateState => {
		setUpdate(updateState);
		setDeleteActive(false);
		setEditActive(false);
	};

	useEffect(() => {
		const fetchServers = async () => {
			let foundServers = await getServers();

			console.log(foundServers);
			let yoo = foundServers.data.servers.map(server => {
				return {
					...server,
					id: server._id,
					startTime: new Date(server.startTime),
					endTime: new Date(server.endTime),
					// cancelTime: new Date(server.cancelTime),
					lastPingTime: new Date(server.lastPingTime),
					autoRenew: new Date(server.autoRenew),
					active: server.active === true ? 'Active ' : 'Canceled'
				};
			});
			console.log(yoo);

			if (user.role !== 'admin') {
				yoo = yoo.filter(server => {
					return server.managerId === user._id;
				});
				setServers(yoo);
				setFilterData(yoo);
			} else if (user.role === 'admin') {
				setServers(yoo);
				setFilterData(yoo);
			}
		};

		fetchServers();
		let date = new Date();
		setToday(date);
		setUpdate(false);
	}, [update === true]);

	return (
		<div className="container mt-5 text-center">
			{console.log(today)}
			<div>
				<h2 className="display-3">Servers Management </h2>
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
							placeholder="Search By User Name"
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
						className={`${editActive ? '' : 'disabled'} btn btn-warning btn-lg mx-2`}
						onClick={() => handleOpenEmailDialog('open')}
						disabled={editActive ? false : true}
					>
						Email <i class="far fa-paper-plane"></i>
					</button>
					<button
						className={`${deleteActive ? '' : 'disabled'} btn btn-danger btn-lg mx-2`}
						onClick={handleOpenDeleteDialog}
						disabled={deleteActive ? false : true}
					>
						Cancel <i class="fas fa-times"></i>
					</button>

					<button
						className={`${editActive ? '' : 'disabled'} btn btn-primary btn-lg mx-2 mt-2 mt-lg-0`}
						onClick={handleEditServersOpen}
						disabled={editActive ? false : true}
					>
						Edit <i class="far fa-edit"></i>
					</button>
					<button className="btn btn-success btn-lg mx-2 mt-2 mt-lg-0" onClick={handleAddServersOpen}>
						Add <i class="fas fa-plus"></i>
					</button>
				</div>
			</div>

			<br />
			{servers && (
				<div>
					<Tableservers
						handleButtons={handleButtons}
						data={searchValue.length > 0 ? search : servers}
						handleUpdate={handleUpdate}
					/>
				</div>
			)}

			{openAddServers && (
				<Addservers open={openAddServers} handleClose={handleAddServersOpen} handleUpdate={handleUpdate} />
			)}
			{openEditServers && (
				<Editservers
					open={openEditServers}
					handleClose={handleEditServersOpen}
					data={editServerData}
					handleUpdate={handleUpdate}
				/>
			)}

			<Deletedialog
				open={openDeleteDialog}
				handleClose={handleOpenDeleteDialog}
				handleClickOpen={handleOpenDeleteDialog}
				handleDelete={handleDelete}
			/>
			{console.log(testEmails)}
			{openEmailTestDialog && (
				<Emailtest data={testEmails} open={openEmailTestDialog} handleOpen={handleOpenEmailDialog} />
			)}
		</div>
	);
}

export default withReducer('scrumboardApp', reducer)(Boards);
