import { useState } from "react";
import BuildingAPIDataSourceImpl from "../../../data/datasource/api/buildingApi.datasource";
import {  BuildingRepositoryImpl } from "../../../data/repository/building.repository.impl";
import { GetBuilding } from "../../../domain/usecases/building/getBuilding";
import { Building } from "../../../domain/model/building";
import { useAppDispatch, useAppSelector } from "../../../configureStore";
import EventAPIDataSourceImpl from "../../../data/datasource/api/eventsApi.datasource";
import { EventsRepositoryImpl } from "../../../data/repository/events.repository.impl";



export  const DashboardViewModel = () => {
	const [building, setBuilding] = useState<Building>();
	const UseCase = new GetBuilding(
		new BuildingRepositoryImpl(new BuildingAPIDataSourceImpl())
		);

	const dispatch = useAppDispatch()

	const getBuilding = async (buildingId:string) => {
			setBuilding(await UseCase.invoke(buildingId))
	}

	return{
		getBuilding,
		building
	}

}