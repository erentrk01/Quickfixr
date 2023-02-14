import { useState } from "react";
import BuildingAPIDataSourceImpl from "../../../data/datasource/api/buildingApi.datasource";
import {  BuildingRepositoryImpl } from "../../../data/repository/building.repository.impl";
import { GetBuilding } from "../../../domain/usecases/building/getBuilding";
import { Building } from "../../../domain/model/building";
import { useAppDispatch, useAppSelector } from "../../../configureStore";
import EventAPIDataSourceImpl from "../../../data/datasource/api/eventsApi.datasource";
import { EventsRepositoryImpl } from "../../../data/repository/events.repository.impl";
import { Event } from "../../../domain/model/event";
import { GetEvents } from "../../../domain/usecases/event/getEvents";
import {getEventsState,setActiveEvents,setPendingEvents,setFinishedEvents} from "../../../domain/usecases/event/eventSlice"


export  const DashboardViewModel = () => {
	const [building, setBuilding] = useState<Building>();
	const UseCase = new GetBuilding(
		new BuildingRepositoryImpl(new BuildingAPIDataSourceImpl())
		);

		const dispatch = useAppDispatch()
	let eventState:any=useAppSelector(state => state.event)
	
	const [events, setEvents] = useState<Event[]>([]);

	const UseCaseEvent = new GetEvents(
		new EventsRepositoryImpl(new EventAPIDataSourceImpl())
		);



	
	const getEvents = async (buildingId:string) => {
		setEvents(await UseCaseEvent.invoke(buildingId))

		

	}

	const getBuilding = async (buildingId:string) => {
			setBuilding(await UseCase.invoke(buildingId))
	}

	return{
		getBuilding,
		getEvents,
		building,
		events
	}

}