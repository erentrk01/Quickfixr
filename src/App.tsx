import { useState } from 'react'

import { Route,Routes,useLocation } from 'react-router-dom';
import './App.css'
import { HeaderView } from './presentation/organism/header/header.view';
import RegisterView from './presentation/organism/register/register.view';

import { Career } from './presentation/pages/career';
import Dashboard from './presentation/pages/dashboard';
import Landing from './presentation/pages/landing';
import Login from './presentation/pages/login';

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
			<Route path="/dashboard" element={<Dashboard/>}></Route>

			 
			</Routes>
		</>
		
		
			
  )
}

export default App;

