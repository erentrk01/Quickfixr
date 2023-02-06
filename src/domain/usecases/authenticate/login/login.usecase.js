import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import{loginToAPI} from "../service/auth.service";
import { signupToBuildingAPI } from "../service/auth.service";
import { signupToResidentAPI } from "../service/auth.service";
import jwtDecode from "jwt-decode";


const initialState = {
	token: localStorage.getItem("token"),
	name: "",
	email: "",
	buildingId: "",
	password: "",
	_id: "",
	registerStatus: "",
	registerError: "",
	loginStatus: "",
	loginError: "",
	userLoaded: false,
	verified: false,
  };

  const url ="http://localhost:3000"

  export const registerResidentUser = createAsyncThunk(
	"auth/registerUser",
	async (values, { rejectWithValue }) => {
	  try {
		  const token= await signupToResidentAPI(url,values);

  
		return token.data;
	  } catch (err) {
		console.log(err.response.data);
		return rejectWithValue(err.response.data);
	  }
	}
  );

  export const registerBuilding = createAsyncThunk(
	"auth/registerBuilding",
	async (values, { rejectWithValue }) => {
	  try {
		  const token= await signupToBuildingAPI(url,values);

  
		return token.data;
	  } catch (err) {
		console.log(err.response.data);
		return rejectWithValue(err.response.data);
	  }
	}
  );


  export const loginUser = createAsyncThunk(
	"auth/loginUser",
	async (values, { rejectWithValue }) => {
	  try {
		  const token = await loginToAPI(url,values);
	   /* const token = await axios.post(`${url}/signin`, {
		  email: values.email,
		  password: values.password,
		});
  */
		localStorage.setItem("token", token.data);
		return token.data;
	  } catch (error) {
		console.log(error.response);
		return rejectWithValue(error.response.data);
	  }
	}
  );

  const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
	  loadUser(state, action) {
		const token = state.token;
		if (token) {
		  const user = jwtDecode(token);
		  return {
			...state,
			token,
			username: user.username,
			email: user.email,
			_id: user._id,
			buildingCode: user.buildingId,
			userLoaded: true,
			verified: user.verifyStatus,
		  };
		} else return { ...state, userLoaded: true };
	  },
	  logoutUser(state, action) {
		localStorage.removeItem("token");
  
		return {
		  ...state,
		  token: "",
		  name: "",
		  email: "",
		  _id: "",
		  buildingCode: "",
		  registerStatus: "",
		  registerError: "",
		  loginStatus: "",
		  loginError: "",
		  userLoaded: false,
		  verified: false,
		};
	  },
	},
	extraReducers: (builder) => {
	  builder.addCase(registerResidentUser.pending, (state, action) => {
		return { ...state, registerStatus: "pending" };
	  });
	  builder.addCase(registerResidentUser.fulfilled, (state, action) => {
		if (action.payload) {
		  const user = jwtDecode(action.payload);
		  return {
			...state,
			token: action.payload,
			name: user.name,
			buildingId: user.buildingId,
			email: user.email,
			_id: user._id,
			registerStatus: "success",
			verified: user.verifyStatus,
		  };
		} else return state;
	  });
	  builder.addCase(registerResidentUser.rejected, (state, action) => {
		return {
		  ...state,
		  registerStatus: "rejected",
		  registerError: action.payload,
		};
	  });
	  //
		builder.addCase(registerBuilding.pending, (state, action) => {
		return { ...state, registerStatus: "pending" };
	  });
	  builder.addCase(registerBuilding.fulfilled, (state, action) => {
		if (action.payload) {
		  const user = jwtDecode(action.payload);
		  return {
			...state,
			token: action.payload,
			name: user.name,
			buildingId: user.buildingId,
			email: user.email,
			_id: user._id,
			registerStatus: "success",
			verified: user.verifyStatus,
		  };
		} else return state;
	  });
	  builder.addCase(registerBuilding.rejected, (state, action) => {
		return {
		  ...state,
		  registerStatus: "rejected",
		  registerError: action.payload,
		};
	  });
	  //
	  builder.addCase(loginUser.pending, (state, action) => {
		return { ...state, loginStatus: "pending" };
	  });
	  builder.addCase(loginUser.fulfilled, (state, action) => {
		if (action.payload) {
		  const user= jwtDecode(action.payload);
		  return {
			...state,
			token: action.payload,
			name: user.name,
			email: user.email,
			buildingId: user.buildingId,
			_id: user._id,
			loginStatus: "success",
			verified: user.verifyStatus,
		  };
		} else return state;
	  });
	  builder.addCase(loginUser.rejected, (state, action) => {
		return {
		  ...state,
		  loginStatus: "rejected",
		  loginError: action.payload,
		};
	  });
	},
  });
  
  export const { loadUser, logoutUser } = authSlice.actions;
  
  export default authSlice