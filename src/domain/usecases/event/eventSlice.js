import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {postEvent} from "../../../service/eventService/event.service";



const initialState = {
	events:[],
	activeEvents:[],
	finishedEvents:[],
	showFinishedEvents:true,
	showEvents:true,
	showActiveEvents:false,
	isLoading: false,
	responseMessage: "",
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

/*export const addEventToDB = createAsyncThunk("events/addEventToDB", async (post) => {
    const response = await postEvent(url,post);
    return response;
});
*/



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
		deleteEvent: (state, action) => {
			state.events.filter((event) => event._id !== action.payload);
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
            state.isLoading = false;
			return {
				...state,
				isLoading: "false",
				events:events,
				responseMessage:"Event posted successfully",
			}
        });
        builder.addCase(addPostToDB.rejected, (state, action) => {
            state.error = action.error;
            state.isLoading = false;
			return {
				...state,
				isLoading: "false",
				responseMessage:action.payload
			}
        });
	
		/* deleteEventFromDB */

	}
  });

  
  export const { loadUser, logoutUser } = authSlice.actions;
  
  export default eventSlice