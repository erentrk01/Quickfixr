import { Building}  from   "../../domain/model/building" ;

export default interface BuildingDataSource {
    getBuilding(buildingId:string): Promise<Building>;
}