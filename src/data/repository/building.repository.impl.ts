import { Building } from "../../domain/model/building";
import { BuildingRepository } from "../../domain/repository/building.repository";
import BuildingDataSource from "../datasource/building.datasource";

export class BuildingRepositoryImpl implements BuildingRepository{
	dataSource: BuildingDataSource;
	constructor(_dataSource: BuildingDataSource) {
		this.dataSource = _dataSource;
	}


	async getBuilding(buildingId): Promise<Building> {
		return this.dataSource.getBuilding(buildingId);
	}

}