import { Box, Button, Card, CardBody, CardHeader, Divider, Flex, Heading, HStack, SimpleGrid, Text, Tooltip, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../configureStore";
import { DashboardViewModel } from "./dashboard.viewmodel";

import {resetResponseStatus} from "../../../domain/usecases/event/eventSlice"

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useClipboard } from '@chakra-ui/react'
import {motion} from 'framer-motion'

import { ReactComponent as Team} from '../../../assets/team.svg'
import loading from "../../../assets/loading.json"
import { Player } from "@lottiefiles/react-lottie-player";

const DashboardView = ({buildingId}) => {
	let easing =[0.6, -0.05, 0.01, 0.99]
	const dispatch = useAppDispatch()
	const eventState:any= useAppSelector(state => state.event)
	const { onCopy, hasCopied } = useClipboard(buildingId);
	const[activeEvents,setActiveEvents] = useState<any>([])
	const[pendingEvents,setPendingEvents] = useState<any>([])
	const[finishedEvents,setFinishedEvents] = useState<any>([])

	

	const {getBuilding,building,getEvents,events} = DashboardViewModel();


	useEffect(()=>{
		getBuilding(buildingId);
		getEvents(buildingId);
	

		
	
	},[events.length])



	useEffect(()=>{

		dispatch(resetResponseStatus(null))
	},[eventState.deleteStatus,eventState.eventCreationStatus])

	
	
	 


	return(
		<>	
			<SimpleGrid columns={{ base: 1, md: 2, lg: 2 }} gap={5} p={2}>
			<VStack>
				<Team/>
			<SimpleGrid columns={{ base: 1, md: 2, lg: 1 }} gap={5}>
				<Text>{building?.name}</Text>
				<Divider orientation='horizontal' />
				<Text>{building?.address}</Text>
				<Divider orientation='horizontal' />
				
				<HStack justifyContent={"center"}>
				<Tooltip borderRadius={15} label={"Share with your neighbours!"} placement='top-start'  defaultIsOpen >
					<Text>Building Id:{buildingId}</Text>
					</Tooltip>
				<Button h="20px" size="sm" onClick={onCopy}>{hasCopied ? "Copied!" : "Copy"}
				</Button>
				
				</HStack>
				
				
			</SimpleGrid>
			</VStack>
				
			
				
				<Tabs variant='soft-rounded' colorScheme='green'>
  <TabList>
	<Box maxW="md" mx="auto">
  <SimpleGrid columns={{ base: 1, md: 3, lg: 3 }}  mt={4}>
    <Tab >Active Events</Tab>
    <Tab>Pending Events</Tab>
	<Tab>Completed Events</Tab>
	</SimpleGrid>
	</Box>
  </TabList>
  <TabPanels>
    <TabPanel>
	<SimpleGrid columns={{ base: 1, md: 2, lg: 3}} gap={6} >
				{
					activeEvents.map((event:any,index)=>{
						return(
							<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:0.2,ease:easing}}>
							<Card  variant='outline'
							
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
	<SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} gap={5}>
				{
					pendingEvents.map((event:any,index)=>{
						return(
							<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:0.2,ease:easing}}>
							<Card  variant='outline'
							
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
	<TabPanel  >
	<SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} gap={5} >
				{
					eventState.finishedEvents.map((event:any,index)=>{
						return(
							<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:0.2,ease:easing}}>
							<Card  variant='outline'
							
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
	
  </TabPanels>
  
				
				</Tabs>

				
	
				
			
				

				
				</SimpleGrid>
				
		</>
	)
}

export default DashboardView;