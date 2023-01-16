import { useEffect } from "react";
import { EventListViewModel } from "./eventList.viewmodel"
import {
	List,
	ListItem,
	ListIcon,
	OrderedList,
	UnorderedList,
  } from '@chakra-ui/react'

export const EventList = () => {
	const {getEvents,events} = EventListViewModel();
	useEffect(()=>{
		getEvents();
	},[])
	return(
		<List>
			{
			events.map((event,i) => {
                return (
                    <ListItem key={i}>
                          <ListIcon color='green.500' />
						{event.id}
                    </ListItem>
                );
            })}
		</List>

	)
}