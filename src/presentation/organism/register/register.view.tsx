import {Box,Heading,Text,Link,VStack,Checkbox,Stack,FormControl,Input,FormLabel,Button} from '@chakra-ui/react'
import {motion} from 'framer-motion'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import ResidentRegisterForm from '../../molecules/registerBlock/residentRegisterForm'
import BuildingRegisterForm from '../../molecules/registerBlock/buildingRegisterForm'


	 const RegisterView = () => {
	const VARIANT_COLOR = 'teal'
	let easing =[0.6, -0.05, 0.01, 0.99]

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
									<ResidentRegisterForm/>
								</Box>
							</TabPanel>
							<TabPanel>
								<BuildingRegisterForm/>
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