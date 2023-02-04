import { useEffect, useState } from "react";
import { EventListViewModel } from "./eventList.viewmodel"
import {
	List,
	ListItem,
	ListIcon,
	Card,
	CardHeader,
	CardBody,
	VStack,
	Text,
	CardFooter,
	Box,
	HStack
  } from '@chakra-ui/react'
import { IconBaseProps, IconContext, IconType } from "react-icons";
import { IoMailOutline } from "react-icons/io5";
import{IoMdDoneAll} from "react-icons/io"
import {MdTipsAndUpdates} from "react-icons/md"
import {GrLaunch,GrUpdate} from "react-icons/gr"
import {AiTwotoneDelete} from "react-icons/ai";
import {SlLike} from "react-icons/sl";

import SkeletonEvents from "../../../molecules/skeletonBlock/skeletonEvents";


import { ReactComponent as Home} from '../../../../assets/building.svg'

export const EventList = () => {
	const {getEvents,events} = EventListViewModel();
	const [isShown, setIsShown] = useState(false);


	useEffect(()=>{
		getEvents();
		
	},[])

	const detectConditionIcon  = (condition) => {
		switch (condition) {
			case "ongoing" :
				return <GrLaunch/>
			case "done" || "tamamlandı":
				return <IoMdDoneAll/>
			case "waiting":
				return <IoMailOutline/>
			default:
				return <IoMailOutline/>
		}
	}
	
	
	return(
		<VStack >
		
			{events.length === 0 &&
				<SkeletonEvents/>
			}

			<List>
			
			{
				events.map((event,i) => {
					return (
					
						<Card  mt={5} key={i} borderRadius={12}>
							<CardHeader >
								<HStack
								justifyContent={"space-between"}
								>
									<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
										{
											detectConditionIcon(event.condition)
										}
									</IconContext.Provider>
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
							<CardBody>
								
								<Box bg="gray.400" borderRadius={12} padding={2}>
								<Text>{event.functionalArea}</Text>
								</Box>
								<Box mt={1} bg='green.600' borderRadius={12} padding={2}>
								<Text>{event.description}</Text>
								</Box>
								<Box mt={1} bg='green.500' borderRadius={12} padding={2}>
								<Text>{event.serviceContactPhone}</Text>
								</Box>


								<Text>{event.date}</Text>
							</CardBody>
							<CardFooter >
							<HStack  											
											borderRadius={12} padding={3}>
									<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
										<AiTwotoneDelete/>
									</IconContext.Provider>
	
									<IconContext.Provider
										value={{color:"#14da8f",size:"22px"}}>
										<SlLike
										/>
									</IconContext.Provider>

									<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
									 <MdTipsAndUpdates/>
									</IconContext.Provider>
								</HStack>

							</CardFooter>
						</Card>

					);
			})}
			</List>

		</VStack>

	)
}