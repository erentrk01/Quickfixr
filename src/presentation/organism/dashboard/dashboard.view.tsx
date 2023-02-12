import { Card, CardBody, CardHeader, Flex, Heading, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../configureStore";
import { DashboardViewModel } from "./dashboard.viewmodel";

import {resetResponseStatus} from "../../../domain/usecases/event/eventSlice"

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import {motion} from 'framer-motion'


const DashboardView = ({buildingId}) => {
	let easing =[0.6, -0.05, 0.01, 0.99]
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
			<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5}>
				<Text>{building?.name}</Text>
				<Text>{building?.address}</Text>
				<Text>Id:{buildingId}</Text>
			</SimpleGrid>
				<HStack>
				<Tabs variant='soft-rounded' colorScheme='green'>
  <TabList>
  <SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} gap={2}>
    <Tab>Active Events</Tab>
    <Tab>Pending Event</Tab>
	<Tab>Completed Events</Tab>
	</SimpleGrid>
  </TabList>
  <TabPanels>
    <TabPanel>
	<SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} gap={5}>
				{
					eventState.activeEvents.map((event:any,index)=>{
						return(
							<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:0.2,ease:easing}}>
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
						</motion.div>
						
						)
					})
				}
				</SimpleGrid>
    </TabPanel>
    <TabPanel>
      <p>two!</p>
    </TabPanel>
  </TabPanels>

				
				</Tabs>
				</HStack>

				
			</VStack>
		</>
	)
}

export default DashboardView;