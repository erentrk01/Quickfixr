import axios from "axios";

const BASE_URL='http://localhost:3000';



export const signupToBuildingAPI = async(url,values) => {
	const token = await axios.post(`${url}/registerBuild`, {
        email: values.email,
        password: values.password,
		buildingAddress:values.buildingAddress,
		buildingName:values.buildingName,
		name:values.name,

      });
	return token;
}

export const signupToResidentAPI = async(url,values) => {
	const token = await axios.post(`${url}/registerUser`, {
        name: values.name,
        email: values.email,
        password: values.password,
      });
	return token;
}


export const loginToAPI = async(url,values) => {
	const token = await axios.post(`${url}/signin`, {
        email: values.email,
        password: values.password,
      });
	return token;
}



