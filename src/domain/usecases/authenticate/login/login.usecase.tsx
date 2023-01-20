import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	data: {
		username:"",
		email:"",
	},
	isLoading: false,
	isAuthenticated: false,
	error:''
	
}
interface User{
	email:string,
	password:string
}

const login =	async(values:User,{ rejectWithValue })=>{
	try{
		const response = await axios.post("https://mobile-backend-2tdf.vercel.app/loginUser",values)
		return response.data
	}catch(err){
		return rejectWithValue(err.response.data)
	}

}

export const loginUser = createAsyncThunk("auth/loginUser",login)




const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers:{  loadUser(state, action: PayloadAction<{user:User}>) {
		
		  return {
			...state,
			email: action.payload.user.email,

		  };
		
	  }},
	extraReducers:(builder)=>{
		builder.addCase(loginUser.pending,(state,action)=>{
			state.isLoading = true
			state.error=""
			console.log("pending")
		});
		builder.addCase(loginUser.fulfilled,(state,{payload})=>{
			state.data = payload
			state.isLoading = false
			state.isAuthenticated = true
			state.error=""
			console.log("fulfilled")
		});
		builder.addCase(loginUser.rejected,(state,{payload})=>{
			state.isLoading = false
			state.error = "error occured"
			console.log("rejected")

		});
	}})
export default loginSlice;
//export const { loginPending, loginSuccess, loginFail } = loginSlice.actions;