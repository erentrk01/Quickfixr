import { useState } from "react";
import EventAPIDataSourceImpl from "../../../../data/datasource/api/eventsApi.datasource";
import { EventsRepositoryImpl } from "../../../../data/repository/events.repository.impl";
import { Event } from "../../../../domain/model/event";
import { GetEvents } from "../../../../domain/usecases/event/getEvents";
import { useAppDispatch } from "../../../../store";


export  const EventListViewModel = () => {
	const dispatch = useAppDispatch();
	
	const [events, setEvents] = useState<Event[]>([]);
	const UseCase = new GetEvents(
		new EventsRepositoryImpl(new EventAPIDataSourceImpl())
		);



	
	const getEvents = async (buildingId:string) => {
			setEvents(await UseCase.invoke(buildingId))

	}

	return{
		getEvents,
		events
	}

}