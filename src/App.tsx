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
import { useAppSelector } from './store';

const App  =()=> {
	const location = useLocation();




  return (

		<>
			{
				location.pathname !==("/dashboard") &&
				<HeaderView/>
			}
		
			<Routes>
				<Route path="/" element={<Landing/>}></Route>
				<Route path="/home" element={<Landing/>}></Route>
				<Route path="/login" element={<Login/>}></Route>
				<Route path="/register" element={<RegisterView/>}></Route>
				<Route path="/career" element={<Career/>}></Route>
				<Route path="*" element={<NotFound/>}></Route>
				
				

					<Route path="/dashboard" element={<Dashboard/>}></Route>
					<Route path="/Events" element={<Events/>}></Route>


			</Routes>
		</>
		
		
			
  )
}

export default App;

