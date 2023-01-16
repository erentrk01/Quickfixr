
import {Box,Flex } from '@chakra-ui/react'
import { SvgMolecule } from '../../molecules/loginBlock/svg'

import { LoginForm } from '../../molecules/loginBlock/loginForm'
import { LoginHeader } from '../../molecules/loginBlock/loginHeader'

export const LoginView = () => {
  return (
	<Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
	<Box 
	  borderWidth={1}
	  px={4}
	  width='full'
	  maxWidth='500px'
	  borderRadius={4}
	  textAlign='center'
	  boxShadow='lg'
	>
	  <SvgMolecule/>
	  <Box p={4}>
		<LoginHeader/>
		<LoginForm />
	  </Box>
	</Box>
  </Flex>
	)
}



