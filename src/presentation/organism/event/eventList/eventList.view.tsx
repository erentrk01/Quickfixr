import { useEffect, useState,useRef } from "react";
import { EventListViewModel } from "./eventList.viewmodel"
import {resetLikeState,resetFetchedEvents,resetResponseStatus,resetDeleteState,resetUnlikeState} from "../../../../domain/usecases/event/eventSlice"
import {resetEventCreationState} from "../../../../domain/usecases/event/eventSlice";
import {Text,Box,HStack,SimpleGrid,VStack,useToast,Flex} from '@chakra-ui/react'

import searching from "../../../../assets/searching.json"
import {motion} from 'framer-motion'

import{IoMdDoneAll} from "react-icons/io"
import {MdOutlinePending} from "react-icons/md"
import {GiProgression} from "react-icons/gi"

import { ReactComponent as Home} from '../../../../assets/building.svg';
import { useAppDispatch, useAppSelector } from "../../../../configureStore";
import { Player } from "@lottiefiles/react-lottie-player";

import { selectCurrentAccessToken } from "../../../../domain/usecases/authenticate/login/login.usecase";


import PaginationView from "../../pagination/paginationView";
import React from "react";
import AnimatedHeading from "../../../atoms/animatedHeading";
import SearchBar from "../../searchBar/searchBar.view";
import { lte } from "lodash";
import EventCard from "../eventCard/eventCard";

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
		window.scrollTo(0, 0);
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
		console.log( "Create and delete hook")
		console.log("event creations statusss: "+eventState.eventCreationStatus)
		if(eventState.deleteStatus === "success" || eventState.eventCreationStatus === "success")
		{	 
 			getEvents(auth.buildingId,query,currentPage, conditionFilter, functionalAreaFilter);
			setTotalPages(eventsData.totalPages);
			 dispatch(resetResponseStatus(null))
			 resetEventCreationState(null)
		}	
	}, [eventState.eventCreationStatus,eventState.deleteStatus]);

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

	useEffect(() => {
	
		if(eventState.likeStatus === "success")
		{
			getEvents(auth.buildingId,query,currentPage, conditionFilter, functionalAreaFilter);
			toast({
				title: "Event liked successfully",
				status: "success",
				isClosable: false,
				duration: 1000
			})
		}
		else if(eventState.likeStatus === "rejected")
		{
			toast({
				title: "Event like failed",
				status: "error",
				isClosable: false,
				duration: 1000
			})
		}

		dispatch(resetLikeState(null))
	}, [eventState.likeStatus])

	useEffect(() => {
		if(eventState.unlikeStatus === "success")
		{
			getEvents(auth.buildingId,query,currentPage, conditionFilter, functionalAreaFilter);
			toast({
				title: "Event unliked successfully",
				status: "success",
				isClosable: false,
				duration: 1000
			})
		}
		else if(eventState.unlikeStatus === "rejected")
		{
			toast({
				title: "Event unlike failed",
				status: "error",
				isClosable: false,
				duration: 1000
			})
		}
		dispatch(resetUnlikeState(null))
	}, [eventState.unlikeStatus])

	return(
		<VStack >
			{filterHeading}
		
				<Flex borderRadius={15} position="fixed" backgroundColor={"black"} zIndex={100000}  top={1} left={0}>
					<SearchBar
						onQueryChange={handleQueryChange} 
						handleConditionFilterChange={handleConditionFilterChange}
						handleFunctionalAreaFilterChange={handleFunctionalAreaFilterChange}/>
				</Flex>
	
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
			{
				eventsData.events.map((event,k) => {
					const eventIcon = iconLookUp[event.condition];
					
					return (
						<motion.div
						initial={{ opacity: 0 }}
								whileInView={{ opacity: 1 }}
								viewport={{ once: true }}
								
						>
						<EventCard
							key={event._id}
							event={event}
							eventIcon={eventIcon}
						/>
						</motion.div>
					);
			})}
			</SimpleGrid>
			<PaginationView onPageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages}/>
		</VStack>
	)
}
