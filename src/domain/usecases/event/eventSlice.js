import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {postEvent,deleteEvent, likeEventService, unlikeEventService,commentEventService,getCommentsService} from "./service/event.service"
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
	likeStatus:"",
	unlikeStatus:"",
	eventCreationStatus: "",
	deleteStatus: null,
	deleteError: "",
	commentStatus: "",
	getCommentsStatus: "",
	eventComments: [],
	
  };

const url ="http://localhost:3000"

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
	  try {
		const deleteRequest = deleteEvent(url,eventId);
		return eventId;
	  } catch (error) {
		return rejectWithValue(error.response.data.message);
	  }
	}
  );

  export const likeEvent = createAsyncThunk(
	"events/likeEvent",
	async (eventId, { rejectWithValue }) => {
		try{
			const likeRequest = likeEventService(url,eventId);
			return eventId;
		}
		catch(error) {
			return rejectWithValue(error.response.data.message);
		}
	})

	export const unlikeEvent = createAsyncThunk(
		"events/unlikeEvent",
		async (eventId, { rejectWithValue }) => {
			try{
				const unlikeRequest = unlikeEventService(url,eventId);
				return eventId;
			}
			catch(error) {
				return rejectWithValue(error.response.data.message);
			}
		})

	export const commentEvent = createAsyncThunk(
		"events/commentEvent",
		async (comment, { rejectWithValue }) => {
			return commentEventService(url, comment)
		.then(response => response.data)
		.catch(error => {
		  return rejectWithValue(error.response.data.message);
		});
		})

	export const getComments = createAsyncThunk(
		"events/getComments",
		async (eventId, { rejectWithValue }) => {
			try{
				const commentRequest = getCommentsService(url,eventId);
				return eventId;
			}
			catch(error) {
				return rejectWithValue(error.response.data.message);
			}
		})

export const eventSlice = createSlice({
	name: "events",
	initialState,
	reducers:{
		getEventsState(state = initialState, action) {
			

			return{
				...state,
				events:action.payload,
				responseStatus:"success",
			}
			
		},
		setPendingEvents(state, action) {
			return{
				...state,
				pendingEvents:  _.filter(state.events, item => item.condition === 'pending'),
				responseStatus:"success",
			}
		},
		setFinishedEvents(state, action) {
			return{
				...state,
				finishedEvents:  _.filter(state.events, item => item.condition.includes('done')),
				responseStatus:"success",
			}
		},
		setActiveEvents(state , action) {
			
			return {
				...state,
				activeEvents:  _.filter(state.events, item => item.condition === 'in progress'),
				responseStatus:"success",
			}
		},
		resetResponseStatus(state, action) {
			return{
				...state,
				responseStatus:""
			}
		},
		resetFetchedEvents(state, action) {
			return{
				...state,
				events:[]
			}
		},
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
		},
		resetLikeState(state, action) {
			return {
				...state,
				likeStatus: "",
				unlikeStatus: ""
			}
		},
		resetUnlikeState(state, action) {
			return {
				...state,
				unlikeStatus: "",
				likeStatus: "",

			}
		},
		resetCommentState(state, action) {
			return {
				...state,
				commentStatus: "",
			}
		},
		resetCommentState(state, action) {
			return {
				...state,
				commentStatus: "",
				eventComments: []
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
			builder.addCase(likeEvent.pending, (state, action) => {
				return {
					...state,
					likeStatus:"pending"
				}
			});
			builder.addCase(likeEvent.fulfilled, (state, action) => {
				return {
					...state,
					likeStatus:"success"
				}
			});
			builder.addCase(likeEvent.rejected, (state, action) => {
				return {
					...state,
					likeStatus:"failed"
				}
			});
			// UNLIKE
			builder.addCase(unlikeEvent.pending, (state, action) => {
				return {
					...state,
					unlikeStatus:"pending"
				}
			});
			builder.addCase(unlikeEvent.fulfilled, (state, action) => {
				return {
					...state,
					unlikeStatus:"success"
				}
			});
			builder.addCase(unlikeEvent.rejected, (state, action) => {
				return {
					...state,
					unlikeStatus:"failed"
				}
			});
			builder.addCase(commentEvent.pending, (state, action) => {
				return {
					...state,
					commentStatus:"pending"
				}
			});
			builder.addCase(commentEvent.fulfilled, (state, action) => {
				return {
					...state,
					commentStatus:"success",
					eventComments:[state.eventComments,action.payload]
				
				
				}
			});
			builder.addCase(commentEvent.rejected, (state, action) => {
				return {
					...state,
				
				}
			});
			builder.addCase(getComments.pending, (state, action) => {
				return {
					...state,
					getCommentsStatus:"pending"
				}
			});
			builder.addCase(getComments.fulfilled, (state, action) => {
				return {
					...state,
					getCommentsStatus:"success",
				
					
				}
			});
			builder.addCase(getComments.rejected, (state, action) => {
				return {
					...state,
					getCommentsStatus:"failed",
					
				}
			});
		}
	});

export const { 
	getEventsState,finishEvent,resetEventCreationState,resetFetchedEvents,resetResponseStatus,setActiveEvents,setPendingEvents,setFinishedEvents,resetLikeState,resetDeleteState,resetUnlikeState,resetCommentState} = eventSlice.actions;
export default eventSlice.reducer;