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

  export const addEventToDB  = createAsyncThunk(
	"events/addEventToDB",
	async (event, { rejectWithValue }) => {
	  try {
		const response = await postEvent(url,event);
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

		finishEvent: (state, action) => {
			state.events.forEach((event) => {
				if (event._id === action.payload) {
					event.condition = "done";
				}
			});
		},

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
				events:events,
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

  
  export const { finishEvent } = eventSlice.actions;
  
  export default eventSlice