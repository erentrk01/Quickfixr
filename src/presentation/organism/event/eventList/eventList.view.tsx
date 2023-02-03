import { useEffect, useState } from "react";
import { EventListViewModel } from "./eventList.viewmodel"
import {
	List,
	ListItem,
	ListIcon,
	OrderedList,
	UnorderedList,
	Card,
	CardHeader,
	CardBody,
	VStack,
	Text,
	CardFooter,
	Box,
	HStack,
  } from '@chakra-ui/react'
import { IconBaseProps, IconContext, IconType } from "react-icons";
import { IoMailOutline } from "react-icons/io5";
import{IoMdDoneAll} from "react-icons/io"
import {MdTipsAndUpdates} from "react-icons/md"
import {GrLaunch,GrUpdate} from "react-icons/gr"
import {AiTwotoneDelete} from "react-icons/ai";
import {SlLike} from "react-icons/sl";

import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import SkeletonEvents from "../../../molecules/skeletonBlock/skeletonEvents";



export const EventList = () => {
	const {getEvents,events} = EventListViewModel();


	useEffect(()=>{
		getEvents();
		
	},[events])

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
					
						<Card mt={5} key={i} borderRadius={12}>
							<CardHeader>
								<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
									{
										
									detectConditionIcon(event.condition)
									}
								</IconContext.Provider>
								{event.title}
							</CardHeader>
							<ListItem >
								<ListIcon color='green.500' />
								{}
							</ListItem>
							<CardBody>

								
								<Box bg='green.500' borderRadius={12} padding={3}>
								<Text>{event.description}</Text>
								</Box>
								<HStack  borderRadius={12} padding={3}>
									<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
										<AiTwotoneDelete/>
									</IconContext.Provider>
									<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
										<SlLike/>
									</IconContext.Provider>
									<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
									 <MdTipsAndUpdates/>
									</IconContext.Provider>
								</HStack>
							</CardBody>
							<CardFooter >
								<Text>{event.date}</Text>
							</CardFooter>
						</Card>

					);
			})}
			</List>

		</VStack>

	)
}