import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
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
	  <Box marginLeft={2}>
	  <DashboardView buildingId={auth.buildingId}/>
	  </Box>

	</>
  );

}

export default Dashboard;