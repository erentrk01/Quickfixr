import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {postEvent,deleteEvent} from "./service/event.service"



const initialState = {
	events:[],
	activeEvents:[],
	finishedEvents:[],
	showFinishedEvents:true,
	showEvents:true,
	showActiveEvents:false,
	isLoading: false,
	responseMessage: "",
	responseStatus: "",
  };


  const url ="http://localhost:3000"

/*  export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
	try {
	   //const response = await axios.get(`${url}/api/tasks`);
	  return response.data;
	} catch (error) {
	  return error.response.data.message;
	}
  });*/

  export const addPostToDB  = createAsyncThunk(
	"events/addEventToDB",
	async (event, { rejectWithValue }) => {
	  try {
		console.log("ıt s hitted")
		const response = postEvent(url,event);
		return response.data;
	  } catch (error) {
		return rejectWithValue(error.response.data.message);
	  }
	}
  );

  export const deleteEventFromDb = createAsyncThunk(
	"events/deleteEventFromDB",
	async (eventId, { rejectWithValue }) => {
	  try {
		const deleteRequest = deleteEvent(url,eventId);
		return eventId;
	  } catch (error) {
		return rejectWithValue(error.response.data.message);
	  }
	}
  );




  export const eventSlice = createSlice({
	name: "events",
	initialState,
	reducers:{
		getEventsState(state, action) {
			return {
				...state,
				events:action.payload,
				responseStatus: "success",
			}
		}


	},
	extraReducers: (builder) => {
		 /* addPostToDB */
		 //pending
		 builder.addCase(addPostToDB.pending, (state, action) => {
           
			return {
				...state,
				isLoading: "true",
			  };
        });
		//Fulfilled
        builder.addCase(addPostToDB.fulfilled, (state, action) => {
            state.events.unshift(action.payload);
			return {
				...state,
				isLoading: false,
				events:[...state.events, action.payload],
				responseMessage:"Event posted successfully",
			}
        });
        builder.addCase(addPostToDB.rejected, (state, action) => {

			return {
				...state,
				isLoading: false,
				responseMessage:action.payload
			}
        });
	
		/* deleteEventFromDB */
		//pending
		 builder.addCase(deleteEventFromDb.pending, (state, action) => {
			
			return {
					...state,
					responseStatus: "pending",
					};
				});
		//Fulfilled
		builder.addCase(deleteEventFromDb.fulfilled, (state, action) => {
			return {
				...state,
				events: state.events.filter((event) => event._id !== action.payload),
				responseMessage: "Event deleted successfully",
				responseStatus: "success",
			}
			});		
		//Rejected
		builder.addCase(deleteEventFromDb.rejected, (state, action) => {
			return {
				...state,
				isLoading: false,
				responseMessage:action.payload,
				responseStatus: "rejected",
				}
			});

		}


  });

  
  export const { getEventsState,finishEvent } = eventSlice.actions;
  
  export default eventSlice