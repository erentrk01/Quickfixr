import {IconContext} from "react-icons";
import { IoMailOutline} from "react-icons/io5";
import { FaRocket,FaTasks,FaCalendarAlt,FaAndroid} from "react-icons/fa";
import{GiAutoRepair,GiElectricalResistance} from "react-icons/gi";
import { SimpleGrid,Card,CardHeader} from "@chakra-ui/react";

import ServiceCardBody from "../../molecules/serviceCardBlock/serviceCardBody";
import ServiceCardFooter from "../../molecules/serviceCardBlock/serviceCardFooter";

const ServiceCardsView=()=>{
	return (
		<SimpleGrid px="10%" py="20px" spacing={4} templateColumns='repeat(auto-fill, minmax(180px, 1fr))'>
			<Card>
				<CardHeader>
					<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
						<IoMailOutline/>
					</IconContext.Provider>
				</CardHeader>
				<ServiceCardBody content={"The ultimate solution for maintaining your building apartments and facilities with ease"}/>
				<ServiceCardFooter/>
			</Card>
			<Card>
				<CardHeader>
					<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
						<FaRocket/>
					</IconContext.Provider>
				</CardHeader>
				<ServiceCardBody content={"Keep everything running smoothly with our user-friendly android and web app"}/>
				<ServiceCardFooter/>
			</Card>
			<Card>
				<CardHeader>
					<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
						<FaTasks/>
					</IconContext.Provider>
				</CardHeader>
				<ServiceCardBody content={"Get real-time updates and access to all maintenance records"}/>
				<ServiceCardFooter/>
			</Card>
			<Card>
				<CardHeader>
					<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
						<FaCalendarAlt/>
					</IconContext.Provider>
				</CardHeader>
				<ServiceCardBody content={"Say goodbye to the hassle of managing building maintenance"}/>
				<ServiceCardFooter/>
			</Card>
			<Card>
				<CardHeader>
					<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
						<GiAutoRepair/>
					</IconContext.Provider>
				</CardHeader>
				<ServiceCardBody content={"Manage all maintenance issues, including electricity cutoffs, in your building and facilities"}/>
				<ServiceCardFooter/>
			</Card>
			<Card>
				<CardHeader>
					<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
						<FaAndroid/>
					</IconContext.Provider>
				</CardHeader>
				<ServiceCardBody content={"powerful android and web app streamlines the process, allowing you to quickly and effectively address any issues that arise"}/>
				<ServiceCardFooter/>
			</Card>

		</SimpleGrid>
	)
}

export default ServiceCardsView;