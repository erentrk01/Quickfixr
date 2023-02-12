import { useState } from "react";
import EventAPIDataSourceImpl from "../../../../data/datasource/api/eventsApi.datasource";
import { EventsRepositoryImpl } from "../../../../data/repository/events.repository.impl";
import { Event } from "../../../../domain/model/event";
import { GetEvents } from "../../../../domain/usecases/event/getEvents";
import { useAppDispatch, useAppSelector } from "../../../../configureStore";
import {getEventsState,setActiveEvents,setPendingEvents,setFinishedEvents} from "../../../../domain/usecases/event/eventSlice"

export  const EventListViewModel = () => {
	
	const dispatch = useAppDispatch()
	let eventState:any=useAppSelector(state => state.event)
	
	const [events, setEvents] = useState<Event[]>([]);
	const UseCase = new GetEvents(
		new EventsRepositoryImpl(new EventAPIDataSourceImpl())
		);



	
	const getEvents = async (buildingId:string) => {
			setEvents(await UseCase.invoke(buildingId))
			dispatch(getEventsState(events))
			dispatch(setActiveEvents(events))
			dispatch(setPendingEvents(events))
			


	}

	return{
		getEvents,
		events
	}

}