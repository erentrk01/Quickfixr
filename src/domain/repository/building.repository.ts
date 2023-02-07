import { Building } from "../model/building";


export interface BuildingRepository {
    getBuilding(buildingId:string): Promise<Building>;
}