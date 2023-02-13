import { useEffect, useState,useRef } from "react";
import { EventListViewModel } from "./eventList.viewmodel"
import {resetFetchedEvents,resetResponseStatus,resetDeleteState} from "../../../../domain/usecases/event/eventSlice"
import { useNavigate} from 'react-router-dom';

import {
	List,
	ListItem,
	ListIcon,
	Card,
	CardHeader,
	Text,
	Box,
	HStack,
	SimpleGrid,
	VStack,
	useDisclosure,
	Tooltip,
	useToast
  } from '@chakra-ui/react'

import { IconContext } from "react-icons";
import { IoMailOutline } from "react-icons/io5";
import{IoMdDoneAll} from "react-icons/io"
import {MdOutlinePending} from "react-icons/md"
import {GrLaunch,GrUpdate} from "react-icons/gr";
import {GiProgression} from "react-icons/gi"


import EventBody from "../../../molecules/eventCard/eventBody";
import EventFooter from "../../../molecules/eventCard/eventFooter";

import { ReactComponent as Home} from '../../../../assets/building.svg';
import { useAppDispatch, useAppSelector } from "../../../../configureStore";
import { Player } from "@lottiefiles/react-lottie-player";
import loading from "../../../../assets/loading.json"

import { selectCurrentAccessToken } from "../../../../domain/usecases/authenticate/login/login.usecase";


import {motion} from 'framer-motion'


export const EventList = () => {
	
	const auth:any = useAppSelector(state => state.auth)
	
	const {events,getEvents}=EventListViewModel();

	const dispatch = useAppDispatch()
	let eventState:any=useAppSelector(state => state.event)
	const token = useAppSelector(selectCurrentAccessToken);

	const BASE_URL = "http://localhost:3000";

	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = useRef<any>(null)
	const toast = useToast()
	const navigate = useNavigate()

	const [show, setShow] = useState(false)



 
useEffect(() => {
	console.log("buildingID: " +auth.buildingId)
	getEvents(auth.buildingId);
}, [token,eventState.eventCreationStatus,eventState.deleteStatus]);

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

	useEffect(() => {
		if (eventState.deleteStatus === "rejected") {
			toast({
                title: `${eventState.deleteError}`,
                status: "error",
                isClosable: true,
				duration: 2000
              })
            }
		else if (eventState.deleteStatus === "success") {
			console.log("event deleted successfully:" + eventState.deleteStatus)
			toast({
				title: "Event deleted successfully",
				status: "success",
				isClosable: true,
				duration: 3000
			})
			dispatch(resetDeleteState(null))
			
			
		}
	}, [eventState.deleteStatus])
	
	


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

	

			 <SimpleGrid columns={1} >
			<List>
			
			{	
				events.map((event,i) => {
					return (
						<motion.div 
									initial={{ opacity: 0 }}
									whileInView={{ opacity: 1 }}
									viewport={{ once: true }}
						>
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
							<EventFooter eventId={event._id}/>

						</Card>
						</motion.div>

					);
			})}
			  	
			</List>
			</SimpleGrid>

		</VStack>
	)
}