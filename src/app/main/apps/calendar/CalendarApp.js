import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import * as ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import CalendarHeader from './CalendarHeader';
import EventDialog from './EventDialog';
import reducer from './store';
import {
	dateFormat,
	selectEvents,
	openNewEventDialog,
	openEditEventDialog,
	updateEvent,
	getEvents,
	removeEvent
} from './store/eventsSlice';

import Addtradinglicense from '../Components/Addtradinglicense';
import Edittradinglicense from '../Components/Edittradinglicense';

import Tabletrading from '../Components/Tabletrading';
import Deletedialog from '../Components/Deletedialog';

import { ToastContainer, toast } from 'react-toastify';
import { deleteTradings, getTradings, getTrading } from '../../connection/Tradinglicense';
// import { useSelector } from 'react-redux';

const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(Calendar);

const allViews = Object.keys(Views).map(k => Views[k]);

const useStyles = makeStyles(theme => ({}));

function CalendarApp(props) {
	const [openAddTradingLicense, setOpenAddTradingLicense] = React.useState(false);
	const [openEditTradingLicense, setOpenEditTradingLicense] = React.useState(false);

	const [deleteActive, setDeleteActive] = React.useState(false);
	const [editActive, setEditActive] = React.useState(false);
	const [selected, setSelected] = React.useState();

	const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

	const [tradings, setTradings] = useState();
	const [update, setUpdate] = useState(false);
	const [editTradingData, setEditTradingData] = useState();
	const user = useSelector(({ auth }) => auth.user);

	const [search, setSearch] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [filterData, setFilterData] = useState('');

	const handleSearchChange = evt => {
		let yoo;
		setSearchValue(evt.target.value);
		yoo = tradings.filter(trading => {
			return trading.accountNum.toString().includes(evt.target.value);
		});
		// console.log(yoo);
		setSearch(yoo);
	};

	const handleFilter = type => {
		console.log(type);

		if (type === 'active') {
			let yoo = filterData.filter(trading => {
				return trading.active === 'Active ';
			});
			console.log(yoo);
			setTradings(yoo);
		} else if (type === 'cancel') {
			let yoo = filterData.filter(trading => {
				return trading.active === 'Canceled';
			});
			setTradings(yoo);
		} else if (type === 'all') {
			setTradings(filterData);
		}
	};

	const handleOpenDeleteDialog = () => {
		setOpenDeleteDialog(!openDeleteDialog);
	};

	const handleAddTradingLicenseOpen = () => {
		setOpenAddTradingLicense(!openAddTradingLicense);
	};

	const handleEditTradingLicenseOpen = async () => {
		let res = await getTrading({ id: selected[0] });
		console.log(res);
		setEditTradingData(res.data.trading[0]);
		setOpenEditTradingLicense(!openEditTradingLicense);
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
		let res = await deleteTradings(selected);
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
		const fetchTradings = async () => {
			let foundTradings = await getTradings();

			console.log(foundTradings);

			let yoo = foundTradings.data.tradings.map(trading => {
				return {
					...trading,
					id: trading._id,
					startTime: new Date(trading.startTime),
					canceledTime: new Date(trading.canceledTime),
					createdAt: new Date(trading.createdAt),
					updatedAt: new Date(trading.updatedAt),
					active: trading.active === true ? 'Active ' : 'Canceled'
				};
			});
			console.log(yoo);

			console.log(user);

			if (user.role !== 'admin') {
				yoo = yoo.filter(trading => {
					return trading.managerId === user._id;
				});
				setTradings(yoo);
				setFilterData(yoo);
			} else if (user.role === 'admin') {
				setTradings(yoo);
				setFilterData(yoo);
			}
		};

		fetchTradings();
		setUpdate(false);
	}, [update === true]);

	return (
		<div className="container mt-5 text-center">
			<div>
				<h2 className="display-3">Trading License Management </h2>
			</div>
			<br />
			<br />
			<div className="row">
				<div className="col-12 col-md-8">
					<div class="input-group">
						<input
							type="number"
							placeholder="Search By Account Number"
							class="form-control"
							aria-label="Dollar amount (with dot and two decimal places)"
							style={{ height: '35px' }}
							value={searchValue}
							onChange={handleSearchChange}
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
							Filter : By Active/Canceled
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
						onClick={handleEditTradingLicenseOpen}
						disabled={editActive ? false : true}
					>
						Edit <i class="far fa-edit"></i>
					</button>
					<button className="btn btn-success btn-lg mx-2 mt-2 mt-lg-0" onClick={handleAddTradingLicenseOpen}>
						Add <i class="fas fa-plus"></i>
					</button>
				</div>
			</div>

			<br />
			{tradings && (
				<div>
					<Tabletrading
						handleButtons={handleButtons}
						data={searchValue.length > 0 ? search : tradings}
						handleUpdate={handleUpdate}
					/>
				</div>
			)}

			{openAddTradingLicense && (
				<Addtradinglicense
					open={openAddTradingLicense}
					handleClose={handleAddTradingLicenseOpen}
					handleUpdate={handleUpdate}
				/>
			)}
			{openEditTradingLicense && (
				<Edittradinglicense
					open={openEditTradingLicense}
					handleClose={handleEditTradingLicenseOpen}
					data={editTradingData}
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

export default withReducer('calendarApp', reducer)(CalendarApp);
