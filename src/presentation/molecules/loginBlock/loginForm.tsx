
import { Box,Link,FormControl,FormLabel,Input, Stack,Checkbox,Button,Spinner, useToast } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { loginUser } from '../../../domain/usecases/authenticate/login/login.usecase';
import { useAppDispatch, useAppSelector } from '../../../store';


export const LoginForm = () => {

	const [user, setUser] = useState({
		email: "",
		password: "",
	  });
	const navigate = useNavigate();

	const dispatch = useAppDispatch()
	let auth:any=useAppSelector(state => state.auth)
	const toast = useToast()


	const handleSubmit = (e) => {
		e.preventDefault();
	
		dispatch(loginUser(user));

	};

	useEffect(() => {
		if(auth._id){
			navigate("/Dashboard");
			toast({
				title: "Successfully Logged In",
				description: "",
				status: "success",
				duration: 3000,
				isClosable: false,
			  })
		}
	}, [auth._id, navigate]);

	useEffect(() => {
		if (auth.loginStatus === "rejected") {
			toast({
                title: `${auth.loginError}`,
                status: "error",
                isClosable: true,
				duration: 2000
              })
            }
		  },[auth.loginStatus])
	
	
	let easing =[0.6, -0.05, 0.01, 0.99]
	const VARIANT_COLOR = 'teal'
	return (
	  <Box my={8} textAlign='left'>
		<form
			
		>
			
		  <FormControl>
		  <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:0.6,ease:easing}}>
			<FormLabel>Email address</FormLabel>
			</motion.div>
			<Input type='email' placeholder='Enter your email address'
			   onChange={(e) => setUser({ ...user, email: e.target.value })}
			 />
		  </FormControl>
  
		  <FormControl mt={4}>
		  <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:1,ease:easing}}>
			<FormLabel>Password</FormLabel>
			</motion.div>
			<Input type='password' placeholder='Enter your password'
			    onChange={(e) => setUser({ ...user, password: e.target.value })}
			 />
			
		  </FormControl>
  
		<Stack isInline justifyContent='space-between' mt={4}>
			  <Box>
			  <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:1.2,ease:easing}}>
				<Checkbox>Remember Me</Checkbox>
				</motion.div>
			  </Box>
			  <Box>
				<Link color={`${VARIANT_COLOR}.500`}>Forgot your password?</Link>
			  </Box>
		
		</Stack>
		{
			(auth.loginStatus == "pending") &&
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color={`${VARIANT_COLOR}.500`}
				/>
		}

		<Button onClick={handleSubmit} width='full' mt={4}>Sign In</Button>
		</form>
	  </Box>
	)
  }