import {Box,Heading,Text,Link,VStack,Checkbox,Stack,FormControl,Input,FormLabel,Button, PinInputField, PinInput, HStack,useToast, Spinner} from '@chakra-ui/react'
import {motion} from 'framer-motion'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import ResidentRegisterForm from '../../molecules/registerBlock/residentRegisterForm'
import BuildingRegisterForm from '../../molecules/registerBlock/buildingRegisterForm'
import {registerResidentUser} from "../../../domain/usecases/authenticate/login/login.usecase";
import {registerBuilding} from  "../../../domain/usecases/authenticate/login/login.usecase";

import { useAppDispatch, useAppSelector } from '../../../store'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'




	 const RegisterView = () => {
		const VARIANT_COLOR = 'teal'
		let easing =[0.6, -0.05, 0.01, 0.99]

		const [residentUser, setResidentUser] = useState({
			name: "",
			email: "",
			password: "",
			buildingId:""
	 	 });

		const [buildingUser, setBuildingUser] = useState({
			name: "",
			email: "",
			buildingAddress:"",
			password: "",
			buildingName:""
	 	 });
		const navigate = useNavigate();
		const dispatch = useAppDispatch()
		  const handleResidentSubmit = (e) => {
			e.preventDefault();
		
			dispatch(registerResidentUser(residentUser));


			e.target.reset();
		  };
		  const handleBuildingSubmit = (e) => {
			e.preventDefault();
			dispatch(registerBuilding(buildingUser))
			e.target.reset();
		  };

		  const toast =useToast();
		  let auth:any=useAppSelector(state => state.auth)

		  useEffect(() => {
			if (auth.registerStatus === "rejected") {
				toast({
					title: `${auth.registerError}`,
					status: "error",
					isClosable: true,
					duration: 2000
				  })
				}
				if (auth.registerStatus === "success") {
					toast({
						title:  `${auth.email} adresine onay maili gönderdik. Devam edebilmek için lütfen mailinize gelen linki onaylayın.`,
						status: "success",
						isClosable: true,
						duration: 2500
					  })
					navigate("/");
					}

			
			  },[auth.registerStatus])
	

	return (
	<>
		<Box textAlign='center'>
			<VStack>
					<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:0.3,ease:easing}}>
					<Tabs variant='soft-rounded' colorScheme='green'>
						<TabList>
							<Tab>Resident Account</Tab>
							<Tab>Building Account</Tab>
						</TabList>
						<TabPanels>
   							<TabPanel>
								<Box my={8} textAlign='left'>
								<form>
								<FormControl mt={4}>
			<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:1.3,ease:easing}}>
			  <FormLabel>Name</FormLabel>
			  </motion.div>
			  <Input
				type="text" 
				placeholder='Enter your Name'
				onChange={(e) => setResidentUser({ ...residentUser, name: e.target.value })}
				 />
			  
			</FormControl>
			<FormControl>
				<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:0.6,ease:easing}}>
					<FormLabel>Email address</FormLabel>
				</motion.div>
				<Input 
					type='email' 
					placeholder='Enter your email address'
					onChange={(e) => setResidentUser({ ...residentUser, email: e.target.value })}
				 />
			</FormControl>
  
			<FormControl mt={4}>
				<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:1,ease:easing}}>
					<FormLabel>Password</FormLabel>
				</motion.div>
				<Input 
					type='password' 
					onChange={(e) => setResidentUser({ ...residentUser, password: e.target.value })} 
					placeholder='Enter your password' />
			</FormControl>
			<FormControl mt={4}>
				<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:1.3,ease:easing}}>
					<FormLabel>Building Id</FormLabel>
				</motion.div>
				<HStack>
				<Input 
					type='password' 
					onChange={(e) => setResidentUser({ ...residentUser, buildingId: e.target.value })} 
					placeholder='Enter your password' />
				</HStack>
			
			</FormControl>
  
			<Stack isInline justifyContent='space-between' mt={4}>
				<Box>
					<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:1.4,ease:easing}}>
						<Checkbox>Remember Me</Checkbox>
					</motion.div>
				</Box>
				<Box>
					<Link color={`${VARIANT_COLOR}.500`}>Forgot your password?</Link>
				</Box>
			</Stack>
			{
			(auth.registerStatus == "pending") &&
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color={`${VARIANT_COLOR}.500`}
				/>
			}
		<Button onClick={handleResidentSubmit} width='full' mt={4}>Sign In</Button>
	</form>
								</Box>
							</TabPanel>
							<TabPanel>
							<form>
							<FormControl mt={4}>
			<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:1.3,ease:easing}}>
			  <FormLabel>Name</FormLabel>
			  </motion.div>
			  <Input
				type="text" 
				placeholder='Enter your Name'
				onChange={(e) => setBuildingUser({ ...buildingUser, name: e.target.value })}
				 />
			  
			</FormControl>
			
			<FormControl>
			<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:0.6,ease:easing}}>
			  <FormLabel>Email address</FormLabel>
			  </motion.div>
			  <Input 
			  		type='email' 
			  		placeholder='Enter your email address'
					onChange={(e) => setBuildingUser({ ...buildingUser, email: e.target.value })}
					 />
			</FormControl>
	
			<FormControl mt={4}>
			<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:1,ease:easing}}>
			  <FormLabel>Password</FormLabel>
			  </motion.div>
			  <Input 
					type='password' 
					placeholder='Enter your password'
					onChange={(e) => setBuildingUser({ ...buildingUser, password: e.target.value })}
				 />
			  
			</FormControl>
			<FormControl mt={4}>
			<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:1.3,ease:easing}}>
			  <FormLabel>Address</FormLabel>
			  </motion.div>
			  <Input
				type="text" 
				placeholder='Enter your Building Address'
				onChange={(e) => setBuildingUser({ ...buildingUser, buildingAddress: e.target.value })}
				 />
			  
			</FormControl>
			<FormControl mt={4}>
			<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:1.3,ease:easing}}>
			  <FormLabel>Building Name</FormLabel>
			  </motion.div>
			  <Input
				type="text" 
				placeholder='Enter your Building Address'
				onChange={(e) => setBuildingUser({ ...buildingUser, buildingName: e.target.value })}
				 />
			  
			</FormControl>
			
	
			<Stack isInline justifyContent='space-between' mt={4}>
				<Box>
				<motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{duration:1.4,ease:easing}}>
				  <Checkbox>Remember Me</Checkbox>
				  </motion.div>
				</Box>
				<Box>
				  <Link color={`${VARIANT_COLOR}.500`}>Forgot your password?</Link>
				</Box>
			</Stack>
			{
			(auth.registerStatus == "pending") &&
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color={`${VARIANT_COLOR}.500`}
				/>
			}
  
		  <Button onClick={handleBuildingSubmit}  width='full' mt={4}>Sign In</Button>
		  </form>
							</TabPanel>
						</TabPanels>
					</Tabs>

						<Heading>Sign Up to Your Account</Heading>
					</motion.div>
			</VStack>
	
		<Text>
		  Or <Link color={`${VARIANT_COLOR}.500`}>start your 14 days trial</Link>
		</Text>
	  </Box>
	</>
	)
  }
  
  export default RegisterView;