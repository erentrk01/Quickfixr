import { useEffect, useState,useRef } from "react";
import { EventListViewModel } from "./eventList.viewmodel"
import {resetFetchedEvents,resetResponseStatus,resetDeleteState} from "../../../../domain/usecases/event/eventSlice"
import { useNavigate} from 'react-router-dom';
import {SearchIcon} from "@chakra-ui/icons"
import { Button, ButtonGroup, filter, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputLeftElement, InputRightElement, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Select } from "@chakra-ui/react";
import {
	IconButton,
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

  import searching from "../../../../assets/searching.json"



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
import FilterBar from "../../filterBar/filterBar.view";
import {FcFilledFilter} from "react-icons/fc"
import React from "react";
import AnimatedHeading from "../../../atoms/animatedHeading";
 

export const EventList = () => {
	const {eventsData,getEvents}=EventListViewModel();
	const auth:any = useAppSelector(state => state.auth)

	//paging
	const[query,setQuery] = useState<any>("")
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	}


	//filtering
	const [conditionFilter, setConditionFilter] = useState("");
	const [functionalAreaFilter, setFunctionalAreaFilter] = useState("");

	const handleConditionFilterChange = (e) => {
		console.log("conditon filter "+conditionFilter)
		setConditionFilter(e.target.value);
		setCurrentPage(1);
	  };
	
	  const handleFunctionalAreaFilterChange = (e) => {
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

	const BASE_URL = "http://localhost:3000";

	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = useRef<any>(null)
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
	<Flex
	
	position="fixed" backgroundColor={"black"} zIndex={100000}  top={1} left={0}  
	>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
			<SearchIcon color="gray.300" />
			</InputLeftElement>
			<Tooltip
			borderRadius={10}
			placement='right' 
			fontSize='md'
			label="filter"
		>
		<InputRightElement>
		<Popover
      placement='bottom'
      closeOnBlur={false}
    >
      <PopoverTrigger>
	  <IconButton borderRadius={11} size="sm" aria-label='Search database' icon={<FcFilledFilter/>} />
      </PopoverTrigger>
     <FilterBar handleConditionFilterChange={handleConditionFilterChange}
	 handleFunctionalAreaFilterChange={handleFunctionalAreaFilterChange}
	 />
    </Popover>
		
			
			</InputRightElement>
		</Tooltip>
		
			

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
			 <SimpleGrid columns={1}>
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