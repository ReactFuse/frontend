import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import reducer from './store';

import Emailtest from '../Components/Emailtest';

import Tableapps from '../Components/Tableapps';
import Deletedialog from '../Components/Deletedialog';

// import { deleteApps } from '../../connection/Apps';
import Addapps from '../Components/Addapps';
import Editapps from '../Components/Editapps';

import { deleteApps, getApp, getApps, getTestEmails } from '../../connection/Apps';
import { ToastContainer, toast } from 'react-toastify';

function TodoApp(props) {
	const [openAddApps, setOpenAddApps] = React.useState(false);
	const [openEditApps, setOpenEditApps] = React.useState(false);

	const [deleteActive, setDeleteActive] = React.useState(false);
	const [editActive, setEditActive] = React.useState(false);
	const [selected, setSelected] = React.useState();

	const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
	const [openEmailTestDialog, setOpenEmailTestDialog] = React.useState(false);

	const [apps, setApps] = useState();
	const [update, setUpdate] = useState(false);
	const [editAppData, setEditAppData] = useState();
	const [testEmails, setTestEmails] = useState();

	const [search, setSearch] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [filterData, setFilterData] = useState('');

	const user = useSelector(({ auth }) => auth.user);

	const handleSearchChange = evt => {
		let yoo;
		setSearchValue(evt.target.value);
		yoo = apps.filter(app => {
			return app.appName.toLowerCase().includes(evt.target.value.toLowerCase());
		});
		// console.log(yoo);
		setSearch(yoo);
	};

	const handleFilter = type => {
		console.log(type);

		if (type === 'active') {
			let yoo = filterData.filter(app => {
				return app.active === 'Active ';
			});
			console.log(yoo);
			setApps(yoo);
		} else if (type === 'cancel') {
			let yoo = filterData.filter(app => {
				return app.active === 'Canceled';
			});
			setApps(yoo);
		} else if (type === 'all') {
			setApps(filterData);
		}
	};

	const handleOpenDeleteDialog = () => {
		setOpenDeleteDialog(!openDeleteDialog);
	};

	const handleAddAppsOpen = () => {
		setOpenAddApps(!openAddApps);
	};

	const handleEditAppsOpen = async () => {
		let res = await getApp({ id: selected[0] });
		console.log(res);
		setEditAppData(res.data.app[0]);
		setOpenEditApps(!openEditApps);
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

	const handleUpdate = updateState => {
		setUpdate(updateState);
		setDeleteActive(false);
		setEditActive(false);
	};

	const handleDelete = async () => {
		let res = await deleteApps(selected);
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

	useEffect(() => {
		const fetchApps = async () => {
			let foundApps = await getApps();

			console.log(foundApps);
			let yoo = foundApps.data.apps.map(app => {
				return { ...app, id: app._id, active: app.active === true ? 'Active ' : 'Canceled' };
			});
			console.log(yoo);
			if (user.role !== 'admin') {
				yoo = yoo.filter(server => {
					return server.managerId === user._id;
				});
				setApps(yoo);
				setFilterData(yoo);
			} else if (user.role === 'admin') {
				setApps(yoo);
				setFilterData(yoo);
			}
		};

		fetchApps();
		setUpdate(false);
	}, [update === true]);

	return (
		<div className="container mt-5 text-center">
			<div>
				<h2 className="display-3">Apps Management </h2>
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
						Remove <i class="far fa-trash-alt"></i>
					</button>

					<button
						className={`${editActive ? '' : 'disabled'} btn btn-primary btn-lg mx-2 mt-2 mt-lg-0`}
						onClick={handleEditAppsOpen}
						disabled={editActive ? false : true}
					>
						Edit <i class="far fa-edit"></i>
					</button>
					<button className="btn btn-success btn-lg mx-2 mt-2 mt-lg-0" onClick={handleAddAppsOpen}>
						Add <i class="fas fa-plus"></i>
					</button>
				</div>
			</div>

			<br />
			{apps && (
				<div>
					<Tableapps
						handleButtons={handleButtons}
						data={searchValue.length > 0 ? search : apps}
						handleUpdate={handleUpdate}
					/>
				</div>
			)}

			{openAddApps && <Addapps open={openAddApps} handleClose={handleAddAppsOpen} handleUpdate={handleUpdate} />}
			{openEditApps && (
				<Editapps
					open={openEditApps}
					handleClose={handleEditAppsOpen}
					data={editAppData}
					handleUpdate={handleUpdate}
				/>
			)}

			<Deletedialog
				open={openDeleteDialog}
				handleClose={handleOpenDeleteDialog}
				handleClickOpen={handleOpenDeleteDialog}
				handleDelete={handleDelete}
			/>

			{openEmailTestDialog && (
				<Emailtest data={testEmails} open={openEmailTestDialog} handleOpen={handleOpenEmailDialog} />
			)}
		</div>
	);
}

export default withReducer('todoApp', reducer)(TodoApp);
