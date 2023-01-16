import {Box,Heading,Text,Link,} from '@chakra-ui/react'


export const LoginHeader = () => {
	const VARIANT_COLOR = 'teal'

	return (
	  <Box textAlign='center'>
		<Heading>Sign In to Your Account</Heading>
		<Text>
		  Or <Link color={`${VARIANT_COLOR}.500`}>start your 14 days trial</Link>
		</Text>
	  </Box>
	)
  }