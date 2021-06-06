import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import React, { useRef, useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

import reducer from './store';
import { getContacts } from './store/contactsSlice';
import { getUserData } from './store/userSlice';

import Tableplans from '../Components/Tableplans';
import Deletedialog from '../Components/Deletedialog';

// import { deletePlans } from '../../connection/Plans';
import Addplans from '../Components/Addplan';
import Editplans from '../Components/Editplans';

import { deletePlans, getPlans, getPlan } from '../../connection/Plans';
import { ToastContainer, toast } from 'react-toastify';

function ContactsApp(props) {
	const [openAddPlans, setOpenAddPlans] = React.useState(false);
	const [openEditPlans, setOpenEditPlans] = React.useState(false);

	const [deleteActive, setDeleteActive] = React.useState(false);
	const [editActive, setEditActive] = React.useState(false);
	const [selected, setSelected] = React.useState();

	const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

	const [plans, setPlans] = useState();
	const [update, setUpdate] = useState(false);
	const [editPlanData, setEditPlanData] = useState();
	const user = useSelector(({ auth }) => auth.user);

	const [search, setSearch] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [filterData, setFilterData] = useState('');

	const handleSearchChange = evt => {
		let yoo;
		setSearchValue(evt.target.value);
		yoo = plans.filter(plan => {
			return plan.managerName.toLowerCase().includes(evt.target.value.toLowerCase());
		});
		// console.log(yoo);
		setSearch(yoo);
	};

	const handleFilter = type => {
		console.log(type);

		if (type === 'active') {
			let yoo = filterData.filter(plan => {
				return plan.active === 'Active ';
			});
			console.log(yoo);
			setPlans(yoo);
		} else if (type === 'cancel') {
			let yoo = filterData.filter(plan => {
				return plan.active === 'Canceled';
			});
			setPlans(yoo);
		} else if (type === 'all') {
			setPlans(filterData);
		}
	};

	const handleOpenDeleteDialog = () => {
		setOpenDeleteDialog(!openDeleteDialog);
	};

	const handleAddPlansOpen = () => {
		setOpenAddPlans(!openAddPlans);
	};

	const handleEditPlansOpen = async () => {
		let res = await getPlan({ id: selected[0] });
		console.log(res);
		setEditPlanData(res.data.plan[0]);
		setOpenEditPlans(!openEditPlans);
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
		let res = await deletePlans(selected);
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
		const fetchPlans = async () => {
			let foundPlans = await getPlans();

			console.log(foundPlans);
			let yoo = foundPlans.data.plans.map(plan => {
				return {
					...plan,
					id: plan._id,
					createdAt: new Date(plan.createdAt),
					updatedAt: plan.updatedAt ? new Date(plan.updatedAt) : '',
					active: plan.active === true ? 'Active ' : 'Canceled'
				};
			});
			console.log(yoo);
			console.log(user);

			if (user.role !== 'admin') {
				yoo = yoo.filter(robot => {
					return robot.managerId === user._id;
				});
				setPlans(yoo);
				setFilterData(yoo);
			} else if (user.role === 'admin') {
				setPlans(yoo);
				setFilterData(yoo);
			}
		};

		fetchPlans();
		setUpdate(false);
	}, [update === true]);

	return (
		<div className="container mt-5 text-center">
			<div>
				<h2 className="display-3">Plans Management </h2>
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
						onClick={handleEditPlansOpen}
						disabled={editActive ? false : true}
					>
						Edit <i class="far fa-edit"></i>
					</button>
					<button className="btn btn-success btn-lg mx-2 mt-2 mt-lg-0" onClick={handleAddPlansOpen}>
						Add <i class="fas fa-plus"></i>
					</button>
				</div>
			</div>

			<br />
			{plans && (
				<div>
					<Tableplans
						handleButtons={handleButtons}
						data={searchValue.length > 0 ? search : plans}
						handleUpdate={handleUpdate}
					/>
				</div>
			)}

			{openAddPlans && (
				<Addplans open={openAddPlans} handleClose={handleAddPlansOpen} handleUpdate={handleUpdate} />
			)}
			{openEditPlans && (
				<Editplans
					open={openEditPlans}
					handleClose={handleEditPlansOpen}
					data={editPlanData}
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

export default withReducer('contactsApp', reducer)(ContactsApp);
