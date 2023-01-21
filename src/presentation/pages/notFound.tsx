import { useColorModeValue } from '@chakra-ui/react';
import { Player}  from '@lottiefiles/react-lottie-player';
import notfoundDark from "../../assets/notfoundDark.json"
import notfoundLight from "../../assets/notfoundLight.json"

const NotFound = () => {
	const data = useColorModeValue(notfoundLight,notfoundDark)
		return (

			<Player
			src={data}
			className="player"
			loop
			autoplay
			style={{ height: '60%', width: '60%' }}


		/>
  );
};

export default NotFound;