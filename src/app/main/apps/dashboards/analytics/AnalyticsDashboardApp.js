import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import reducer from './store';
import { selectWidgetsEntities, getWidgets } from './store/widgetsSlice';
import Widget1 from './widgets/Widget1';
import Widget2 from './widgets/Widget2';
import Widget3 from './widgets/Widget3';
import Widget4 from './widgets/Widget4';
import Widget5 from './widgets/Widget5';
import Widget6 from './widgets/Widget6';
import Widget7 from './widgets/Widget7';
import Widget8 from './widgets/Widget8';
import Widget9 from './widgets/Widget9';
import Donutchart from '../../Components/Donutchart';
import { getTradings } from '../../../connection/Tradinglicense';
import { getRobots } from '../../../connection/Robots';
import { getPlans } from '../../../connection/Plans';
import { getServers } from '../../../connection/Servers';
import { getApps } from '../../../connection/Apps';
import { getUsers } from '../../../connection/Users';
import Overviewcard from '../../Components/Overviewcard';

function AnalyticsDashboardApp() {
	const dispatch = useDispatch();

	const widgets = useSelector(selectWidgetsEntities);
	const [tradings, setTradings] = useState();
	const [robots, setRobots] = useState();
	const [plans, setPlans] = useState();
	const [servers, setServers] = useState();
	const [apps, setApps] = useState();
	const [users, setUsers] = useState();
	const [tradingsLength, setTradingsLength] = useState();
	const [robotsLength, setRobotsLength] = useState();
	const [plansLength, setPlansLength] = useState();
	const [serversLength, setServersLength] = useState();
	const [appsLength, setAppsLength] = useState();

	const count = foundData => {
		let active = 0,
			cancel = 0;
		foundData.map(trading => {
			if (trading.active === true) {
				active = active + 1;
			} else {
				cancel = cancel + 1;
			}
		});
		return [active, cancel];
	};

	useEffect(() => {
		const fetchUsers = async () => {
			let foundUsers = await getUsers();
			setUsers(foundUsers.data.users.length);
		};

		const fetchTradings = async () => {
			let foundTradings = await getTradings();
			let result = count(foundTradings.data.tradings);
			console.log(result);
			setTradings(result);
			setTradingsLength(foundTradings.data.tradings.length);
		};

		const fetchRobots = async () => {
			let foundRobots = await getRobots();
			let result = count(foundRobots.data.robots);
			console.log(result);
			setRobots(result);
			setRobotsLength(foundRobots.data.robots.length);
		};

		const fetchPlans = async () => {
			let foundPlans = await getPlans();
			let result = count(foundPlans.data.plans);
			console.log(result);
			setPlans(result);
			setPlansLength(foundPlans.data.plans.length);
		};

		const fetchServers = async () => {
			let foundServers = await getServers();
			let result = count(foundServers.data.servers);
			console.log(result);
			setServers(result);
			setServersLength(foundServers.data.servers.length);
		};

		const fetchApps = async () => {
			let foundApps = await getApps();
			let result = count(foundApps.data.apps);
			console.log(result);
			setApps(result);
			setAppsLength(foundApps.data.apps.length);
		};

		fetchTradings();
		fetchRobots();
		fetchPlans();
		fetchServers();
		fetchApps();
		fetchUsers();
	}, []);

	useEffect(() => {
		dispatch(getWidgets());
	}, [dispatch]);

	if (_.isEmpty(widgets)) {
		return null;
	}

	return (
		<div className="w-full text-center container">
			{/* <Widget1 data={widgets.widget1} /> */}
			<br />
			{/* <div>
				<h2 className="display-3">Permissions Management </h2>
			</div>
			<br />
			<br />
			<div className="text-left ">
				<h2 className="display-5">Manage Permission for Admin </h2>
			</div> */}

			{/* <FuseAnimate animation="transition.slideUpIn" delay={200}>
				<div className="flex flex-col md:flex-row sm:p-8 container">
					<div className="flex flex-1 flex-col min-w-0">
						<FuseAnimate delay={600}>
							<Typography className="p-16 pb-8 text-18 font-300">
								How are your active users trending over time?
							</Typography>
						</FuseAnimate>
						<div>
							<Donutchart />
						</div>

						<div className="flex flex-col sm:flex sm:flex-row pb-32">
							<div className="widget flex w-full sm:w-1/3 p-16">
								<Widget2 data={widgets.widget2} />
							</div>

							<div className="widget flex w-full sm:w-1/3 p-16">
								<Widget3 data={widgets.widget3} />
							</div>

							<div className="widget w-full sm:w-1/3 p-16">
								<Widget4 data={widgets.widget4} />
							</div>
						</div>

						<FuseAnimate delay={600}>
							<Typography className="px-16 pb-8 text-18 font-300">
								How many pages your users visit?
							</Typography>
						</FuseAnimate>

						<div className="widget w-full p-16 pb-32">
							<Widget5 data={widgets.widget5} />
						</div>

						<FuseAnimate delay={600}>
							<Typography className="px-16 pb-8 text-18 font-300">Where are your users?</Typography>
						</FuseAnimate>

						<div className="widget w-full p-16 pb-32">
							<Widget6 data={widgets.widget6} />
						</div>
					</div>

					<div className="flex flex-wrap w-full md:w-320 pt-16">
						<div className="mb-32 w-full sm:w-1/2 md:w-full">
							<FuseAnimate delay={600}>
								<Typography className="px-16 pb-8 text-18 font-300">
									What are your top devices?
								</Typography>
							</FuseAnimate>

							<div className="widget w-full p-16">
								<Widget7 data={widgets.widget7} />
							</div>
						</div>

						<div className="mb-32 w-full sm:w-1/2 md:w-full">
							<FuseAnimate delay={600}>
								<div className="px-16 pb-8 text-18 font-300">How are your sales?</div>
							</FuseAnimate>

							<div className="widget w-full p-16">
								<Widget8 data={widgets.widget8} />
							</div>
						</div>

						<div className="mb-32 w-full sm:w-1/2 md:w-full">
							<FuseAnimate delay={600}>
								<Typography className="px-16 pb-8 text-18 font-300 lg:pt-0">
									What are your top campaigns?
								</Typography>
							</FuseAnimate>
							<div className="widget w-full p-16">
								<Widget9 data={widgets.widget9} />
							</div>
						</div>
					</div>
				</div>
			</FuseAnimate> */}
			<div className="container">
				<br />
				<h1 className="display-4">Overview of Tables</h1>
				<br />
				<div className="row">
					<div className="col-12 col-md-6 col-lg-4">
						<Overviewcard name="Users" value={users} color="#0275d8" />
					</div>
					<div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
						<Overviewcard name="Trading " value={tradingsLength} color="#5cb85c" />
					</div>
					<div className="col-12 col-md-6 col-lg-4 d-flex justify-content-end">
						<Overviewcard name="Robots" value={robotsLength} color="#5bc0de" />
					</div>
					<div className="col-12 col-md-6 col-lg-4">
						<Overviewcard name="Plans" value={plansLength} color="#f0ad4e" />
					</div>
					<div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
						<Overviewcard name="Servers" value={serversLength} color="#669073" />
					</div>
					<div className="col-12 col-md-6 col-lg-4 d-flex justify-content-end">
						<Overviewcard name="Apps" value={appsLength} color="#d9534f" />
					</div>
				</div>
			</div>
			<br />

			<br />
			<br />
			<hr />
			<div className="container">
				<h1 className="display-4">Presenting Active and Canceled Ratios on Charts</h1>
				<br />
				<br />
				<div className="row">
					<div className="col-12 col-md-6 mt-5">
						{tradings && <Donutchart text="Trading License Active and Cancel Ratio" ratio={tradings} />}
					</div>

					<div className="col-12 col-md-6 mt-5 ">
						{robots && <Donutchart text="Robots Active and Cancel Ratio" ratio={robots} />}
					</div>

					<div className="col-12 col-md-6 mt-5">
						{plans && <Donutchart text="Plans Active and Cancel Ratio" ratio={plans} />}
					</div>
					<div className="col-12 col-md-6 mt-5">
						{servers && <Donutchart text="Servers Active and Cancel Ratio" ratio={servers} />}
					</div>
					<div className="col-12 col-md-6  mt-5">
						{apps && <Donutchart text="Apps Active and Cancel Ratio" ratio={apps} />}
					</div>
				</div>
				<br />
				<br />
			</div>
			<br />
			<br />
		</div>
	);
}

export default withReducer('analyticsDashboardApp', reducer)(AnalyticsDashboardApp);
