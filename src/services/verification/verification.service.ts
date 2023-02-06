import axios from 'axios';

export const verifyToAPI = async(url) => {
	const { data } = await axios.get(url);
	return data;
}