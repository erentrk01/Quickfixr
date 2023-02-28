import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import  store  from "../../../configureStore";

export const addPoll = createAsyncThunk(
	"poll/addPoll",
	async ({question,options,durationDays,durationHours}, { rejectWithValue }) => {
		const reduxStore = store.getState();
		const auth = reduxStore.auth;
		try {
			const response = await axios.post(
				`https://mobile-backend-jz8h.vercel.app/poll/${auth.buildingId}/create`,
				{question, userId:auth._id,options,days:durationDays,hours:durationHours}
			);
			return response.data.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	});

export const deletePoll = createAsyncThunk(
	"poll/deletePoll",
	async ({ pollId}, { rejectWithValue }) => {
		const reduxStore = store.getState();
		const auth = reduxStore.auth;
		try {
			const response = await axios.delete(
				`https://mobile-backend-jz8h.vercel.app/poll/${pollId}/delete/${auth._id}`
			);
			return response.data.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	});

export const votePoll = createAsyncThunk(
		"poll/votePoll",
		async ({ pollId, optionId}, { rejectWithValue }) => {
			const reduxStore = store.getState();
			const auth = reduxStore.auth;
			try {
				const response = await axios.post(
					`https://mobile-backend-jz8h.vercel.app/poll/${pollId}/vote/${optionId}`, {userId:auth._id}
				);
				return response.data.data;
			} catch (err) {
				return rejectWithValue(err.response.data);
			}
		});

		export const addOption = createAsyncThunk(
			'poll/addOption',
			async ({ pollId, option }, { rejectWithValue }) => {
				const reduxStore = store.getState();
			const auth = reduxStore.auth;
			  try {
				const response = await axios.post(`https://mobile-backend-jz8h.vercel.app/poll/${pollId}/createOption`, {option,userId:auth._id,buildingId:auth.buildingId});
				return response.data.data;
			  } catch (error) {
				return rejectWithValue(error.response.data);
			  }
			}
		  );
		  
		  export const deleteOption = createAsyncThunk(
			'poll/deleteOption',
			async ({ pollId, optionId }, { rejectWithValue }) => {
				const reduxStore = store.getState();
				const auth = reduxStore.auth;
			  try {
				const response = await axios.delete(`https://mobile-backend-jz8h.vercel.app/poll/${pollId}/option/${optionId}/delete`, {
				  userId: auth._id,
				});
		  
				return response.data;
			  } catch (error) {
				return rejectWithValue(error.response.data);
			  }
			}
		  );


export const updateOption = createAsyncThunk(
	"poll/updateOption",
	async ({ optionId, updatedOption }, { rejectWithValue }) => {
	  try {
		const response = await updateOption(optionId, updatedOption);
		return response.data;
	  } catch (err) {
		return rejectWithValue(err.response.data);
	  }
	}
  );
  


export const pollSlice = createSlice({
	  name: "poll",
	  initialState: {
		polls: [],
		status: "",
		deletePollStatus: "",
		createPollStatus: "",
		voteStatus: "",
		addOptionStatus: "",
		deletePollStatus :"",
		deleteOptionStatus: "",
		error: "",
		addOptionError: "",
	  },
	  reducers: {
		resetCreatePollStatus: (state) => {
		  state.createPollStatus = "";
	  }, 
	  resetVoteStatus: (state) => {
		state.voteStatus = "";
		state.error = "";
	  },
	  resetAddOptionStatus: (state) => {
		state.addOptionStatus = "";
		state.error = "";
	  },
	  resetDeletePollStatus: (state) => {
		state.deletePollStatus = "";
		state.error = "";
	  }
	},
	  extraReducers: (builder) => {
		builder
		  .addCase(addPoll.pending, (state) => {
			state.createPollStatus = 'loading';
		  })
		  .addCase(addPoll.fulfilled, (state, action) => {
			state.polls.push(action.payload);
			state.createPollStatus = 'succeeded';
		  })
		  .addCase(addPoll.rejected, (state, action) => {
			state.createPollStatus = 'failed';
		  })
		  .addCase(votePoll.pending, (state) => {
			state.voteStatus = 'loading';
		  }
		  )
		  .addCase(votePoll.fulfilled, (state, action) => {
			state.voteStatus = 'succeeded';
		  })
		  .addCase(votePoll.rejected, (state, action) => {
			state.voteStatus = 'failed';
			state.error = action.payload;
		  })
		  .addCase(deletePoll.pending, (state) => {
			state.deletePollStatus = 'loading';
		  })
		  .addCase(deletePoll.fulfilled, (state, action) => {
			state.deletePollStatus = 'succeeded';
		  })
		  .addCase(deletePoll.rejected, (state, action) => {
			state.deletePollStatus = 'failed';
			state.error = action.payload;
		  })
		  .addCase(addOption.pending, (state) => {
			state.addOptionStatus = 'loading';
		  })
		  .addCase(addOption.fulfilled, (state, action) => {
			state.addOptionStatus = 'succeeded';
		  })
		  .addCase(addOption.rejected, (state, action) => {
			console.log("action.payload", action.payload)
			state.addOptionStatus = 'failed';
			state.error = action.payload;
		  })
		  .addCase(deleteOption.pending, (state) => {
			state.deleteOptionStatus = 'loading';
		  })
		  .addCase(deleteOption.fulfilled, (state, action) => {
			state.deleteOptionPollStatus = 'succeeded';
		  })
		  .addCase(deleteOption.rejected, (state, action) => {
			state.deleteOptionStatus = 'failed';
			state.error = action.payload;
		  });


	
	  },
	  

});

export const { 
resetCreatePollStatus,resetVoteStatus,resetAddOptionStatus,resetDeletePollStatus} = pollSlice.actions;

export default pollSlice.reducer;

