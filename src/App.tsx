import { useState } from 'react'

import { Route,Routes } from 'react-router-dom';
import './App.css'
import { HeaderView } from './presentation/organism/header/header.view';
import { Career } from './presentation/pages/career';
import Landing from './presentation/pages/landing';
import Login from './presentation/pages/login';

const App  =()=> {
 

  return (
	
	
		<>
			<HeaderView/>
			<Routes>
			<Route path="/" element={<Landing/>}></Route>
			<Route path="/home" element={<Landing/>}></Route>
			<Route path="/login" element={<Login/>}></Route>
			<Route path="/career" element={<Career/>}></Route>
			 
			</Routes>
		</>
		
		
			
  )
}

export default App;

