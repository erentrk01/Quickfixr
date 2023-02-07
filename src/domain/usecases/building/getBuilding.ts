import {Building } from "../../model/building";
import { BuildingRepository } from "../../repository/building.repository";


export interface GetBuildingUseCase {

    invoke: (buildingId:string) => Promise<Building>

}

export  class GetBuilding implements GetBuildingUseCase {
	private buildingRepo:BuildingRepository;
	constructor(_buildingRepo:BuildingRepository) {
		this.buildingRepo = _buildingRepo;
	}

	async invoke(buildingId:string){
		return this.buildingRepo.getBuilding(buildingId);
	}
}