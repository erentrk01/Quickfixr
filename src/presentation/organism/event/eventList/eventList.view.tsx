import { useEffect, useState,useRef } from "react";
import { EventListViewModel } from "./eventList.viewmodel"
import {resetFetchedEvents,resetResponseStatus,resetDeleteState} from "../../../../domain/usecases/event/eventSlice"

import {   Flex  } from "@chakra-ui/react";
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
	Tooltip,
	useToast
  } from '@chakra-ui/react'

import searching from "../../../../assets/searching.json"
import { IconContext } from "react-icons";

import{IoMdDoneAll} from "react-icons/io"
import {MdOutlinePending} from "react-icons/md"
import {GiProgression} from "react-icons/gi"

import EventBody from "../../../molecules/eventCard/eventBody";
import EventFooter from "../../../molecules/eventCard/eventFooter";

import { ReactComponent as Home} from '../../../../assets/building.svg';
import { useAppDispatch, useAppSelector } from "../../../../configureStore";
import { Player } from "@lottiefiles/react-lottie-player";

import { selectCurrentAccessToken } from "../../../../domain/usecases/authenticate/login/login.usecase";

import {motion} from 'framer-motion'
import PaginationView from "../../pagination/paginationView";
import React from "react";
import AnimatedHeading from "../../../atoms/animatedHeading";
import SearchBar from "../../searchBar/searchBar.view";

export const EventList = () => {
	const {eventsData,getEvents}=EventListViewModel();
	const auth:any = useAppSelector(state => state.auth)

	//paging
	const[query,setQuery] = useState<any>("")
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	// Function to update query state in parent component
	function handleQueryChange(newQuery: string) {
		setQuery(newQuery);
		
	  }

	const handlePageChange = (page: number):void => {
		setCurrentPage(page);
	}

	//Filtering
	const [conditionFilter, setConditionFilter] = useState("");
	const [functionalAreaFilter, setFunctionalAreaFilter] = useState("");

	const handleConditionFilterChange = (e):void => {
		console.log("conditon filter "+conditionFilter)
		setConditionFilter(e.target.value);
		setCurrentPage(1);
	  };
	
	  const handleFunctionalAreaFilterChange = (e):void => {
		setFunctionalAreaFilter(e.target.value);
		setCurrentPage(1);
	  };

	// Filter Headings
	const headingLookUp = {
	pending: <AnimatedHeading title="Pending Events"/>,
	"in progress": <AnimatedHeading title="Active Events"/>,
	done: <AnimatedHeading title="Completed Events"/>
	}
	const filterHeading =headingLookUp[conditionFilter]

	const dispatch = useAppDispatch()
	let eventState:any=useAppSelector(state => state.event)
	const token = useAppSelector(selectCurrentAccessToken);

	const toast = useToast()

	const iconLookUp = {
		"in progress": <GiProgression/>,
		done: <IoMdDoneAll/>,
		pending: <MdOutlinePending/>
	  }

	 
	useEffect(() => {
		getEvents(auth.buildingId,query,currentPage, conditionFilter, functionalAreaFilter);
		setTotalPages(eventsData.totalPages);
		console.log(eventsData)
	  }, [query, currentPage, conditionFilter, functionalAreaFilter]);

	useEffect(() => {
		
		if(eventState.deleteStatus === "success" || eventState.eventCreationStatus === "success")
		{	 
 			getEvents(auth.buildingId,query,currentPage, conditionFilter, functionalAreaFilter);
			setTotalPages(eventsData.totalPages);
			 dispatch(resetResponseStatus(null))
			
		}

	}, [eventState.eventCreationStatus,eventState.deleteStatus]);

	useEffect(()=>{
	
		getEvents(auth.buildingId,query,currentPage, conditionFilter, functionalAreaFilter);
		setTotalPages(eventsData.totalPages);
		
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

	return(
		<VStack >
			{filterHeading}
			<Text>Page {currentPage}</Text>
			<motion.div
				initial={{ opacity: 0, y: -20}}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}
			>
				<Flex position="fixed" backgroundColor={"black"} zIndex={100000}  top={1} left={0}>
					<SearchBar
						onQueryChange={handleQueryChange} 
						handleConditionFilterChange={handleConditionFilterChange}
						handleFunctionalAreaFilterChange={handleFunctionalAreaFilterChange}/>
				</Flex>
			</motion.div>
	
	{ 
	eventsData.events.length === 0 && <>
	<Text>No such a post exist :(</Text>
	<Player
		src={searching}
		className="player"
		loop
		autoplay
		style={{ height: '400px', width: '80%' }}
		/>
		</>
		}
			 <SimpleGrid columns={1}    >
			{<List>
			{
				eventsData.events.map((event,i) => {
					const eventIcon = iconLookUp[event.condition];
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
												{eventIcon}
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
