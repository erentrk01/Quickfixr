import { useEffect, useState,useRef } from "react";
import { EventListViewModel } from "./eventList.viewmodel"
import {resetFetchedEvents,resetResponseStatus} from "../../../../domain/usecases/event/eventSlice"

import {
	List,
	ListItem,
	ListIcon,
	Card,
	CardHeader,
	Text,
	Box,
	HStack,
	Button,
	AlertDialogFooter,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialog,
	SimpleGrid,
	VStack,
	useDisclosure,
	Tooltip
  } from '@chakra-ui/react'

import { IconContext } from "react-icons";
import { IoMailOutline } from "react-icons/io5";
import{IoMdDoneAll} from "react-icons/io"
import {MdOutlinePending} from "react-icons/md"
import {GrLaunch,GrUpdate} from "react-icons/gr";
import {GiProgression} from "react-icons/gi"

import SkeletonEvents from "../../../molecules/skeletonBlock/skeletonEvents";
import EventBody from "../../../molecules/eventCard/eventBody";
import EventFooter from "../../../molecules/eventCard/eventFooter";

import { ReactComponent as Home} from '../../../../assets/building.svg';
import warning from '../../../../assets/warning.png';
import { useAppDispatch, useAppSelector } from "../../../../configureStore";
import { Player } from "@lottiefiles/react-lottie-player";
import loading from "../../../../assets/loading.json"

import { selectCurrentAccessToken } from "../../../../domain/usecases/authenticate/login/login.usecase";




export const EventList = () => {
	
	const auth:any = useAppSelector(state => state.auth)
	
	const {events,getEvents}=EventListViewModel();

	const dispatch = useAppDispatch()
	let eventState:any=useAppSelector(state => state.event)
	const token = useAppSelector(selectCurrentAccessToken);

	const BASE_URL = "http://localhost:3000";

	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = useRef<any>(null)

	const [show, setShow] = useState(false)


 
useEffect(() => {
	console.log("buildingID: " +auth.buildingId)
	getEvents(auth.buildingId);
}, [token]);

	//
	useEffect(()=>{
		dispatch(resetFetchedEvents(null))
		console.log("triggered")
		console.log("build ıd:" +auth.buildingId)
		getEvents(auth.buildingId);
		console.log(events)

		//dispatch(getEventsState(events))
		console.log(eventState.events)

		
	},[events.length])


	useEffect(()=>{
		dispatch(resetResponseStatus(null))
	},[])

	
	


	const detectConditionIcon  = (condition) => {

		
		switch (condition) {
			case "in progress" || "devam ediyor":
				return <GiProgression/>
			case "done" || "tamamlandı":
				return <IoMdDoneAll/>
			case "pending":
				return <MdOutlinePending/>
			default:
				return <IoMailOutline/>
		}
	}


	
		if(eventState.responseStatus == ""){
			console.log(eventState.responseStatus)
			 return (
			 <Player
			 src={loading}
			 className="player"
			 loop
			 autoplay
			 style={{ height: '400px', width: '80%' }}/>)
		}
		
	
			
		
	
	
	return(
		<VStack >
			 <Text>{events.length } events posted in this building</Text>

			   <AlertDialog
        			isOpen={isOpen}
					leastDestructiveRef={cancelRef}
					onClose={onClose}
					isCentered
				 >
       				 <AlertDialogOverlay>
							<AlertDialogContent    color={"red.500"}  bgGradient={[
							'linear(to-tr, teal.300, yellow.400)',
							'linear(to-t, blue.200, teal.500)',
							'linear(to-b, orange.100, purple.300)']}>

								<AlertDialogHeader fontWeight='bold' fontSize='lg'  >
									Delete Event
									</AlertDialogHeader>
								<VStack alignItems={"center"}>
								<img src={warning} alt='warning' width='100px' height='100px' />

								<AlertDialogBody>

									
									Are you sure? You can't undo this action afterwards.
									</AlertDialogBody>
									</VStack>

								<AlertDialogFooter>
									<Button ref={cancelRef} onClick={onClose}>
										Cancel
									</Button>
									<Button colorScheme='red' onClick={onClose} ml={3}>
										Delete
									</Button>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialogOverlay>
					</AlertDialog> 

			 <SimpleGrid columns={1} >
			<List>
			
			{	
				events.map((event,i) => {
					return (
					
						<Card  mt={4} key={i} borderRadius={12}>
							<CardHeader >
								<HStack
								justifyContent={"space-between"}
								><Tooltip label={event.condition} 
								borderRadius={10}
								placement='auto-start' fontSize='md'>
									<Box>
										<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
											{detectConditionIcon(event.condition)}
										</IconContext.Provider>
									</Box>
									</Tooltip>
									<Home 

										width="100px"
										height="100px"/>
								</HStack>
								<Box width="300px" bg='orange.300' borderRadius={12} padding={2}>
								<Text>{event.title}</Text>
								</Box>
							</CardHeader>
							<ListItem >
								<ListIcon color='green.500' />
								{}
							</ListItem>
							<EventBody event={event}/>
							<EventFooter onOpen={onOpen}/>
						</Card>

					);
			})}
			  	
			</List>
			</SimpleGrid>

		</VStack>
	)
}