import { Heading, Text } from "@chakra-ui/react";
import { useAppSelector } from "../../configureStore";
import DaynightToggleImpl from "../atoms/daynightToggle";
import {  Navigate,useNavigate } from 'react-router-dom'
import SideBar from "../organism/sideBar/sideBar.view";
import { useEffect } from "react";
import DashboardView from "../organism/dashboard/dashboard.view";

const Dashboard = () => {
	const auth:any = useAppSelector(state => state.auth)

	if(!auth._id) return <Navigate to="/login" /> ;



	return (
	<>

	
	  <SideBar/>
	  <Text px={0}>Hello, Welcome back</Text>
	  <DashboardView buildingId={auth.buildingId}/>
	</>
  );

}

export default Dashboard;