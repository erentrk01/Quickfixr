import { Heading, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../configureStore";
import { DashboardViewModel } from "./dashboard.viewmodel";

const DashboardView = ({buildingId}) => {
	const dispatch = useAppDispatch()
	const eventState:any= useAppSelector(state => state.event)
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
				{
					eventState.events.map((event:any)=>{
						return(
							<Text>{event.title}</Text>
						)
					})
				}
				
			</VStack>
		</>
	)
}

export default DashboardView;