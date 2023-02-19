import  store from "../../../../configureStore";
import {setAccessToken,reset} from "../login/login.usecase";
import axios from "axios";



interface AuthState {
  refreshToken: any
}

const BASE_URL='https://mobile-backend-bice.vercel.app';
const instance = axios.create({
    baseURL: BASE_URL,
});

instance.interceptors.request.use((config:any)=>{
	 const accessToken = localStorage.getItem('accessToken');
	if(accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
	return config;
},err => { return Promise.reject(err)

});


instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalConfig = error.config;
		const storeState:any = store.getState();
        if (error.response?.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;
            originalConfig.headers = JSON.parse(JSON.stringify(originalConfig.headers));
            try {
                const response = await axios.post(`${URL}/token`, {
                    refreshToken: storeState.auth.refreshToken
                });
              store.dispatch(setAccessToken(response.data.accessToken));
                return instance(originalConfig);
            } catch (e) {
                store.dispatch(reset());
                return Promise.reject(e);
            }
        }
        return Promise.reject(error);
    },
);

export default instance;