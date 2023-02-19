import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EmailVerify from "../organism/verification/emailverify";
import NotFound from "./notFound";
//import {verifyToAPI} from "../../services/verification/verification.service";
import axios from 'axios';
const EmailVerifyPage = () => {
	const [validUrl, setValidUrl] = useState(false);
	const param = useParams();

	

 const verifyToAPI = async(url) => {
	const { data } = await axios.get(url);
	return data;
}
  
	useEffect(() => {
	  const verifyEmailUrl = async () => {
		try {
		  const url = `https://mobile-backend-one.vercel.app/${param.id}/verify/${param.token}`;
		  const data:any= verifyToAPI(url);
		  //console.log(data);
		  localStorage.setItem("verify", data.verified);
		  setValidUrl(true);
		} catch (error) {
		  console.log(error);
		  setValidUrl(false);
		}
	  };
  
	  verifyEmailUrl();
	}, [param]);

	return <>{validUrl ? <EmailVerify /> : <NotFound />}</>;
}

export default EmailVerifyPage;