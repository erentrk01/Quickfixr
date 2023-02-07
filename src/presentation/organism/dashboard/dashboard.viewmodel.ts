import { useState } from "react";
import BuildingAPIDataSourceImpl from "../../../data/datasource/api/buildingApi.datasource";
import {  BuildingRepositoryImpl } from "../../../data/repository/building.repository.impl";
import { GetBuilding } from "../../../domain/usecases/building/getBuilding";
import { Building } from "../../../domain/model/building";


export  const DashboardViewModel = () => {
	const [building, setBuilding] = useState<Building>();
	const UseCase = new GetBuilding(
		new BuildingRepositoryImpl(new BuildingAPIDataSourceImpl())
		);

	const getBuilding = async (buildingId:string) => {
			setBuilding(await UseCase.invoke(buildingId))
	}

	return{
		getBuilding,
		building
	}

}