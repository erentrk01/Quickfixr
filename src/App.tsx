import { useState } from 'react'

import { Route,Routes,useLocation } from 'react-router-dom';
import './App.css'
import { HeaderView } from './presentation/organism/header/header.view';
import RegisterView from './presentation/organism/register/register.view';

import { Career } from './presentation/pages/career';
import Dashboard from './presentation/pages/dashboard';
import Landing from './presentation/pages/landing';
import Login from './presentation/pages/login';
import NotFound from './presentation/pages/notFound';
import { useAppSelector } from './store';

const App  =()=> {
	const location = useLocation();
	let isAuthenticated =useAppSelector(state => state.login.isAuthenticated)


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
				{
					isAuthenticated &&
					<Route path="/dashboard" element={<Dashboard/>}></Route>
				}

			</Routes>
		</>
		
		
			
  )
}

export default App;

