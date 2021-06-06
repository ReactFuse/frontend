import _ from '@lodash';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import reducer from '../store';
import { getCategories, selectCategories } from '../store/categoriesSlice';
import { getCourses, selectCourses } from '../store/coursesSlice';
import Tableusers from '../../Components/Tableusers';
import Adduser from '../../Components/Adduser';
import Deletedialog from '../../Components/Deletedialog';
import { deleteUser, getUsers, getUser } from '../../../connection/Users';
import Edituser from '../../Components/Edituser';
import { ToastContainer, toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
	header: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.getContrastText(theme.palette.primary.main)
	},
	headerIcon: {
		position: 'absolute',
		top: -64,
		left: 0,
		opacity: 0.04,
		fontSize: 512,
		width: 512,
		height: 512,
		pointerEvents: 'none'
	}
}));

function Courses(props) {
	const dispatch = useDispatch();
	const courses = useSelector(selectCourses);
	const categories = useSelector(selectCategories);

	const classes = useStyles(props);
	const theme = useTheme();
	const [filteredData, setFilteredData] = useState(null);
	const [searchText, setSearchText] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');

	const [users, setUsers] = useState();

	const [openAddUser, setOpenAddUser] = React.useState(false);
	const [openEditUser, setOpenEditUser] = React.useState(false);

	const [deleteActive, setDeleteActive] = React.useState(false);
	const [editActive, setEditActive] = React.useState(false);
	const [selected, setSelected] = React.useState();

	const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
	const [update, setUpdate] = React.useState(false);
	const [editUserData, setEditUserData] = useState();

	const [search, setSearch] = useState('');
	const [searchValue, setSearchValue] = useState('');

	const handleOpenDeleteDialog = () => {
		setOpenDeleteDialog(!openDeleteDialog);
	};

	const handleAddUserOpen = () => {
		setOpenAddUser(!openAddUser);
	};

	const handleSearchChange = evt => {
		let yoo;
		setSearchValue(evt.target.value);
		yoo = users.filter(user => {
			return user.displayName.toLowerCase().includes(evt.target.value.toLowerCase());
		});
		// console.log(yoo);
		setSearch(yoo);
	};

	const handleEditUserOpen = async () => {
		let res = await getUser({ id: selected[0] });
		console.log(res);
		setEditUserData(res.data.user[0]);
		setOpenEditUser(!openEditUser);
	};

	useEffect(() => {
		dispatch(getCategories());
		dispatch(getCourses());
	}, [dispatch]);

	useEffect(() => {
		function getFilteredArray() {
			if (searchText.length === 0 && selectedCategory === 'all') {
				return courses;
			}

			return _.filter(courses, item => {
				if (selectedCategory !== 'all' && item.category !== selectedCategory) {
					return false;
				}
				return item.title.toLowerCase().includes(searchText.toLowerCase());
			});
		}

		if (courses) {
			setFilteredData(getFilteredArray());
		}
	}, [courses, searchText, selectedCategory]);

	function handleSelectedCategory(event) {
		setSelectedCategory(event.target.value);
	}

	function handleSearchText(event) {
		setSearchText(event.target.value);
	}

	function buttonStatus(course) {
		switch (course.activeStep) {
			case course.totalSteps:
				return 'COMPLETED';
			case 0:
				return 'START';
			default:
				return 'CONTINUE';
		}
	}

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
		let res = await deleteUser(selected);
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
		const fetchUsers = async () => {
			let foundUsers = await getUsers();

			console.log(foundUsers);
			let yoo = foundUsers.data.users.map(user => {
				return { ...user, id: user._id };
			});
			console.log(yoo);
			setUsers(yoo);
		};

		fetchUsers();
		setUpdate(false);
	}, [update === true]);

	return (
		<div className="container mt-5 text-center">
			<div>
				<h2 className="display-3">Users Management </h2>
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
					<button
						className={`${deleteActive ? '' : 'disabled'} btn btn-danger btn-lg mx-2`}
						onClick={handleOpenDeleteDialog}
						disabled={deleteActive ? false : true}
					>
						Delete <i class="far fa-trash-alt"></i>
					</button>

					<button
						className={`${editActive ? '' : 'disabled'} btn btn-primary btn-lg mx-2 mt-2 mt-lg-0`}
						onClick={handleEditUserOpen}
						disabled={editActive ? false : true}
					>
						Edit <i class="far fa-edit"></i>
					</button>
					<button className="btn btn-success btn-lg mx-2 mt-2 mt-lg-0" onClick={handleAddUserOpen}>
						Add <i class="fas fa-plus"></i>
					</button>
				</div>
			</div>

			<br />
			{users && (
				<div>
					<Tableusers handleButtons={handleButtons} data={searchValue.length > 0 ? search : users} />
				</div>
			)}

			{openAddUser && <Adduser open={openAddUser} handleClose={handleAddUserOpen} handleUpdate={handleUpdate} />}
			{openEditUser && (
				<Edituser
					open={openEditUser}
					handleClose={handleEditUserOpen}
					data={editUserData}
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

export default withReducer('academyApp', reducer)(Courses);
