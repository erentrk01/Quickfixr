import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {postEvent,deleteEvent} from "./service/event.service"
import _ from "lodash"




const initialState = {
	events:[],
	activeEvents:[],
	finishedEvents:[],
	pendingEvents:[],
	showFinishedEvents:true,
	showEvents:true,
	showActiveEvents:false,
	responseMessage: "",
	responseStatus:"",
	eventCreationStatus: "",
	deleteStatus: "",
	deleteError: ""
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
		return postEvent(url, event)
		.then(response => response.data)
		.catch(error => {
		  return rejectWithValue(error.response.data.message);
		});
	}
  );

  export const deleteEventFromDb = createAsyncThunk(
	"events/deleteEventFromDb",
	async (eventId, { rejectWithValue }) => {
		return deleteEvent(url, eventId)
		.then(response => response.data)
		.catch(error => {
		  return rejectWithValue(error.response.data.message);
		});
	}
  );




  export const eventSlice = createSlice({
	name: "events",
	initialState,
	reducers:{
		getEventsState(state = initialState, action) {
			

			return{
				...state,
				events:state.events.concat(action.payload),
				responseStatus:"success",
			}
			
		},
		setPendingEvents(state, action) {
			return{
				...state,
				pendingEvents:  _.filter(state.events, item => item.condition.includes('pending')),
				responseStatus:"success",
			}
		},
		setFinishedEvents(state, action) {
			return{
				...state,
				finishedEvents:  _.filter(state.events, item => item.condition.includes('done')),
				responseStatus:"success",
			}
		}
		,
		setActiveEvents(state , action) {
			
			return {
				...state,
				activeEvents:  _.filter(state.events, item => item.condition === 'in progress'),
				responseStatus:"success",
			}
		}
		,
		resetResponseStatus(state, action) {
			return{
				...state,
				responseStatus:""
			}
		}
		,

		resetFetchedEvents(state, action) {
			return{
				...state,
				events:[]
			}
		}

		,
		resetEventCreationState(state, action) {
			console.log("resetEventCreationState triggered")
			return {
				...state,
				eventCreationStatus: "",
			}
		},
		resetDeleteState(state, action) {
			return {
				...state,
				deleteStatus: "",
				deleteError: "",
			}
		}


	},
	extraReducers: (builder) => {
		 /* addPostToDB */
		 //pending
		 builder.addCase(addPostToDB.pending, (state, action) => {
           
			return {
				...state,
				eventCreationStatus:"pending",
			  };
        });
		//Fulfilled
        builder.addCase(addPostToDB.fulfilled, (state, action) => {
			return {
				...state,
				isLoading: false,
				events:[...state.events, action.payload],
				responseMessage:"Event posted successfully",
				eventCreationStatus:"success",
			}
        });
        builder.addCase(addPostToDB.rejected, (state, action) => {

			return {
				...state,
				responseMessage:action.payload,
				eventCreationStatus:"failed"
			}
        });
	
		/* deleteEventFromDB */
		//pending
		 builder.addCase(deleteEventFromDb.pending, (state, action) => {
			
			return {
					...state,
					deleteStatus: "pending",
					};
				});
		//Fulfilled
		builder.addCase(deleteEventFromDb.fulfilled, (state, action) => {
			return {
				...state,
				events: state.events.filter((event) => event._id !== action.payload),
				responseMessage: "Event deleted successfully",
				deleteStatus: "success",
				responseStatus: "success",
			}
			});		
		//Rejected
		builder.addCase(deleteEventFromDb.rejected, (state, action) => {
			return {
				...state,
				responseMessage:action.payload,
				deleteStatus: "rejected",
				deleteError: action.payload,
				}
			});

		}


  });

  
  export const { getEventsState,finishEvent,resetEventCreationState,resetFetchedEvents,resetResponseStatus,setActiveEvents,setPendingEvents,setFinishedEvents,resetDeleteState} = eventSlice.actions;
  
  export default eventSlice.reducer;