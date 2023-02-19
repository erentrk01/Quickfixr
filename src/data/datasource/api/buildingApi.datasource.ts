import axios from "axios";
import { Building } from "../../../domain/model/building";
import BuildingDataSource from "../building.datasource";


const BASE_URL = "https://mobile-backend-one.vercel.app";



export default class BuildingAPIDataSourceImpl implements BuildingDataSource {
    async getBuilding(buildingId): Promise<Building> {
        let response:string = await axios.get(`${BASE_URL}/building/${buildingId}`);
		let res =JSON.stringify(response);
		let jsonData = JSON.parse(res);
		let item = jsonData.data.building;
		let building: Building = {
			buildingId: item.buildingId,
			name: item.buildingName,
			address: item.buildingAddress,
		}

			return building;
		}
    }
