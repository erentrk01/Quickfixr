import { useState } from "react";
import EventAPIDataSourceImpl from "../../../../data/datasource/api/eventsApi.datasource";
import { EventsRepositoryImpl } from "../../../../data/repository/events.repository.impl";
import { Event } from "../../../../domain/model/event";
import { GetEvents } from "../../../../domain/usecases/event/getEvents";
import { useAppDispatch, useAppSelector } from "../../../../configureStore";
import {getEventsState,setActiveEvents,setPendingEvents,setFinishedEvents} from "../../../../domain/usecases/event/eventSlice"
import { EventData } from "../../../../domain/model/eventData";

export  const EventListViewModel = () => {
	
	const dispatch = useAppDispatch()
	let eventState:any=useAppSelector(state => state.event)
	
	const [eventsData, setEvents] = useState<EventData>({
		events:[],
		totalPages:1,
		currentPage:1,
		conditionFilter:"",
		functionalAreaFilter:""
	});
	const UseCase = new GetEvents(
		new EventsRepositoryImpl(new EventAPIDataSourceImpl())
		);

	const getEvents = async (buildingId:string,query,currentPage,conditionFilter,functionalAreaFilter) => {
		setEvents(await UseCase.invoke(buildingId,query,currentPage,conditionFilter,functionalAreaFilter))
		dispatch(getEventsState(eventsData))
	}

	return{
		getEvents,
		eventsData
	}

}