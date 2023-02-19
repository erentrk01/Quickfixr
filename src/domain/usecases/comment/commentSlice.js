import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




// Async Thunk for adding a comment
export const addComment = createAsyncThunk(
  'event/addComment',
  async ({ eventId, content }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://localhost:3000/events/${eventId}/comments`, { content });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }

);

export const deleteComment = createAsyncThunk(
	  'event/deleteComment',
	  async ({ eventId, commentId }, { rejectWithValue }) => {
	try {
	  const response = await axios.delete(`http://localhost:3000/events/${eventId}/comments/${commentId}`);
	  return response.data;
	}
	catch (err) {
	return rejectWithValue(err.response.data);
	}
	  });

// Async Thunk for getting comments for an event
export const getEventComments = createAsyncThunk(
  'event/getEventComments',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/events/${eventId}/comments`);
	  console.log('comments:', response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);






// Event slice with comments and status
export const commentSlice = createSlice({
  name: 'event',
  initialState: {
    comments: [],
    status: '',
	deleteCommentStatus: '',
  },
  reducers: {
	resetDeleteCommentStatus: (state) => {
	state.deleteCommentStatus = '';
	},

  },
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getEventComments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getEventComments.fulfilled, (state, action) => {
        state.comments = action.payload.comments;
        state.status = 'succeeded';
      })
      .addCase(getEventComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload
      })
	  .addCase(deleteComment.pending, (state) => {
		state.deleteCommentStatus = 'loading';

	  })
	  .addCase(deleteComment.fulfilled, (state, action) => {
		state.comments = state.comments.filter(comment => comment.id !== action.payload.id);
		state.deleteCommentStatus = 'success';
		state.error = action.payload
	  })
	  .addCase(deleteComment.rejected, (state, action) => {
		state.deleteCommentStatus = 'failed';
		state.error = action.payload
	  });

  },
});

export const { resetDeleteCommentStatus,setComments } = commentSlice.actions;

export default commentSlice.reducer;
