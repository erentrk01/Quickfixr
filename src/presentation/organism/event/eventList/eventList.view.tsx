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
	VStack,
	Text,
  } from '@chakra-ui/react'
import { IconContext } from "react-icons";
import { IoMailOutline } from "react-icons/io5";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import SkeletonEvents from "../../../molecules/skeletonBlock/skeletonEvents";


export const EventList = () => {
	let isLoaded = false;

	const {getEvents,events} = EventListViewModel();
	isLoaded = true;
	console.log(events.length)
	useEffect(()=>{
		getEvents();
		
	},[events])
	
	
	return(
		<VStack >
		
		{events.length === 0 &&
		<SkeletonEvents/>
		}
		<List>

			{
				
				
				
			events.map((event,i) => {
                return (
					
					<Card mt={5} key={i}>
						<CardHeader>
							<IconContext.Provider value={{color:"#14da8f",size:"22px"}}>
							<IoMailOutline/>
					</IconContext.Provider>
					{events.length}
						</CardHeader>
                    <ListItem >
                          <ListIcon color='green.500' />
					{event.description}

                    </ListItem>
					</Card>

                );
            })}
		</List>
		</VStack>

	)
}