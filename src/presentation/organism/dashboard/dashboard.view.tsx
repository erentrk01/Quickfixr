import { Heading, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { DashboardViewModel } from "./dashboard.viewmodel";

const DashboardView = ({buildingId}) => {
	const {getBuilding,building} = DashboardViewModel();
	useEffect(()=>{
		getBuilding(buildingId);
		console.log(building?.name)
		console.log(building?.address)
		
	},[])
	return(
		<>	
			<VStack>
				<Heading>{building?.name}</Heading>
				<Heading>{building?.address}</Heading>
				<Heading>Id:{buildingId}</Heading>
				
			</VStack>
		</>
	)
}

export default DashboardView;