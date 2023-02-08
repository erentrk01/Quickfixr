/*import EventAPIDataSourceImpl from "../../../data/datasource/api/eventsApi.datasource";
import { EventsRepositoryImpl } from "../../../data/repository/events.repository.impl";
import { GetEvents } from "./getEvents";


const getEvents = async (buildingId:string) => {
	setEvents(await UseCase.invoke(buildingId))
}

export const fetchEvents = createAsyncThunk(
	"events/fetchEvents",
	async (values, { rejectWithValue }) => {
	  try {
		const UseCase = new GetEvents(
			new EventsRepositoryImpl(new EventAPIDataSourceImpl())
			);
	
	

  
		return token.data;
	  } catch (err) {
		console.log(err.response.data);
		return rejectWithValue(err.response.data);
	  }
	}
  );*/