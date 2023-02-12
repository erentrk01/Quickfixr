import { Card, CardBody, CardHeader, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../configureStore";
import { DashboardViewModel } from "./dashboard.viewmodel";

import {resetResponseStatus} from "../../../domain/usecases/event/eventSlice"





const DashboardView = ({buildingId}) => {
	const dispatch = useAppDispatch()
	const eventState:any= useAppSelector(state => state.event)

	const {getBuilding,building} = DashboardViewModel();
	useEffect(()=>{
		getBuilding(buildingId);
		console.log(building?.name)
		console.log(building?.address)
		
		
	},[])
	console.log(eventState.activeEvents)

	useEffect(()=>{
		dispatch(resetResponseStatus(null))
	},[])


	
	 


	return(
		<>	
			<VStack mt={3}>
				<HStack >
				<Text>{building?.name}</Text>
				<Text>{building?.address}</Text>
				<Text>Id:{buildingId}</Text>
				</HStack>
				<HStack>
				
				{
					eventState.activeEvents.map((event:any,index)=>{
						return(
							
							<Card  variant='outline'
							w={120}
							h={120}
						bg='"gray.600"'
				>
					<CardHeader>
						<Heading size="sm">{event.title}</Heading>
					</CardHeader>
					<CardBody>
						<Text>{event.functionalArea}</Text>
					</CardBody>
							
						</Card>
						
						)
					})
				}
				</HStack>
				
			</VStack>
		</>
	)
}

export default DashboardView;