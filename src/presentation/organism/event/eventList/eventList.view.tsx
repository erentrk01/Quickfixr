import { useEffect, useState,useRef } from "react";
import { EventListViewModel } from "./eventList.viewmodel"
import {resetFetchedEvents,resetResponseStatus,resetDeleteState} from "../../../../domain/usecases/event/eventSlice"
import { useNavigate} from 'react-router-dom';
import {SearchIcon} from "@chakra-ui/icons"
import { Button, IconButton, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
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
import {getEventsState,setActiveEvents,setPendingEvents,setFinishedEvents} from "../../../../domain/usecases/event/eventSlice"

import EventBody from "../../../molecules/eventCard/eventBody";
import EventFooter from "../../../molecules/eventCard/eventFooter";

import { ReactComponent as Home} from '../../../../assets/building.svg';
import { useAppDispatch, useAppSelector } from "../../../../configureStore";
import { Player } from "@lottiefiles/react-lottie-player";
import loading from "../../../../assets/loading.json"

import { selectCurrentAccessToken } from "../../../../domain/usecases/authenticate/login/login.usecase";


import {motion} from 'framer-motion'
import PaginationView from "../../pagination/paginationView";


export const EventList = () => {
	const {eventsData,getEvents}=EventListViewModel();
	const auth:any = useAppSelector(state => state.auth)

	const[query,setQuery] = useState<any>("")
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const dispatch = useAppDispatch()
	let eventState:any=useAppSelector(state => state.event)
	const token = useAppSelector(selectCurrentAccessToken);

	const BASE_URL = "http://localhost:3000";

	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = useRef<any>(null)
	const toast = useToast()
	const navigate = useNavigate()


	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	}


	useEffect(() => {
		getEvents(auth.buildingId,query,currentPage);
		setTotalPages(eventsData.totalPages);
		console.log(eventsData)
	  }, [query, currentPage]);
	

	useEffect(() => {
		console.log("hookkkkkk !")
		if(eventState.deleteStatus === "success" || eventState.eventCreationStatus === "success")
		{	 
 			getEvents(auth.buildingId,query,currentPage);
			setTotalPages(eventsData.totalPages);
			 //dispatch(getEventsState(events))
			 //dispatch(setPendingEvents(events))
			// dispatch(setActiveEvents(events))
			 //dispatch(setFinishedEvents(events))
			 dispatch(resetResponseStatus(null))
			
		}

	}, [eventState.eventCreationStatus,eventState.deleteStatus]);

	useEffect(()=>{
console.log("useeffect dispathc")
		getEvents(auth.buildingId,query,currentPage);
		setTotalPages(eventsData.totalPages);
	
	
		console.log("Events state:" + eventState.events.length+ JSON.stringify( eventState.events))
		
		//
	},[])

	useEffect(() => {
		console.log("useeffect 2")
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
			
		}

		dispatch(resetDeleteState(null))
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

	return(
		<VStack >
			 <Text>Page {currentPage}</Text>
			 <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
			<SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search events..."
          _placeholder={{ color: "gray.400" }}
          variant="outline"
          borderColor="gray.300"
          focusBorderColor="blue.500"
          borderRadius="full"
          size="md"
        />
      </InputGroup>
	 
    </motion.div>
			 <SimpleGrid columns={1} >
			{<List>
			{
				eventsData.events.map((event,i) => {
					return (
						<motion.div 
								initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								key={i}
						>
							<Card  mt={4} borderRadius={12}>
								<CardHeader >
									<HStack justifyContent={"space-between"}
									>
										<Tooltip label={event.condition} 
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
			</List>}
			</SimpleGrid>
			<PaginationView onPageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages}/>
		</VStack>
	)
}