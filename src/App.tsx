import { useEffect, useState } from 'react'

import { Route,Routes,useLocation } from 'react-router-dom';
import './App.css'
import { HeaderView } from './presentation/organism/header/header.view';
import RegisterView from './presentation/organism/register/register.view';

import { Career } from './presentation/pages/career';
import Dashboard from './presentation/pages/dashboard';
import Events from './presentation/pages/events';
import Landing from './presentation/pages/landing';
import Login from './presentation/pages/login';
import NotFound from './presentation/pages/notFound';
import EmailVerifyPage from './presentation/pages/emailverifypage';
import { useAppDispatch, useAppSelector } from './configureStore';
import { useNavigate} from 'react-router-dom';
import EventCard from './presentation/organism/event/eventCard/eventCard';
import PollsPage from './presentation/pages/polls';
import Earthquake from './presentation/organism/earthquake/earthquake';

const App  =()=> {
	const location = useLocation();
	const dispatch = useAppDispatch();
	const auth:any=useAppSelector(state => state.auth)

	// In Dashboard mode, header will not be visible
	const[dashboardMode,setDashboardMode]=useState(false)
	const navigate = useNavigate();
	const pathnameMap = {
		"/Dashboard": true,
		"/Events": true,
		"/Polls": true,
	  };

	useEffect(() => {
		const dashboardMode = pathnameMap[location.pathname] || false;
		setDashboardMode(dashboardMode);
	}, [location.pathname])

	useEffect(() => {
		if(auth._id && location.pathname=="/") navigate("/Events");
	},[])
	
	return (
		<>
			{
				!dashboardMode &&
				<HeaderView/>
			}

			<Routes>
				<Route path="/" element={<Landing/>}></Route>
				<Route path="/home" element={<Landing/>}></Route>
				<Route path="/login" element={<Login/>}></Route>
				<Route path="/register" element={<RegisterView/>}></Route>
				<Route path="/career" element={<Career/>}></Route>
				<Route path="*" element={<NotFound/>}></Route>
				<Route path="/:id/verify/:token" element={<EmailVerifyPage/>} />
				<Route path="/Dashboard" element={<Dashboard/>}></Route>
				<Route path="/Events" element={<Events/>}></Route>
				<Route path="/Polls" element={<PollsPage/>}></Route>
				<Route path="/Earthquake" element={<Earthquake/>}></Route>
				<Route path="/Logout" element={<Login/>}></Route>
			</Routes>
		</>
	)
}

export default App;

