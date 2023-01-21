import { useState }from "react";
import DayNightToggle from 'react-day-and-night-toggle'
import {useColorMode} from "@chakra-ui/color-mode";

const DaynightToggleImpl = ({size})=>{
	const {toggleColorMode} = useColorMode();
	const [isDarkMode, setIsDarkMode] = useState( true)
	return(
		<DayNightToggle 
			 onChange={() => {setIsDarkMode(!isDarkMode);
				toggleColorMode(); 
			 }}
		checked={isDarkMode}
		size={size}
		/>
	)

}

export default DaynightToggleImpl;