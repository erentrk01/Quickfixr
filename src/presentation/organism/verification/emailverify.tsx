import { Box, Button, Heading } from '@chakra-ui/react';
import { Player}  from '@lottiefiles/react-lottie-player';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import succesStick from "../../../assets/successtick.json"
const EmailVerify = () => {
	const navigate = useNavigate();
	const verifyRef = useRef(null);


	return(<>

		<Player
		src={succesStick}
		className="player"
		loop
		autoplay
		style={{ height: '400px', width: '80%' }}

		/>
		<Box ref={verifyRef}>
			<Heading fontSize={{ sm: '22px', md: '24px', lg: '36px' }} >Email adresi başarıyla doğrulandı. </Heading>
			<Button onClick={() => {navigate("/login");}}>
				Sign in
			</Button>
		</Box>

</>)


	
}


export default EmailVerify;