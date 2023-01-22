import { Heading, Text } from "@chakra-ui/react";
import DaynightToggleImpl from "../atoms/daynightToggle";
import SideBar from "../organism/sideBar/sideBar.view";

const Dashboard = () => {
	  return (
	<>
	<Text px={0}>Hello, Welcome back</Text>
	
	  <SideBar/>
	</>
  );

}

export default Dashboard;