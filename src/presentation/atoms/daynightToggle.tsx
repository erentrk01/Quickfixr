import { useState }from "react";
import DayNightToggle from 'react-day-and-night-toggle'
import {useColorMode} from "@chakra-ui/color-mode";
const DaynightToggleImpl = ()=>{
	const {toggleColorMode} = useColorMode();
	const [isDarkMode, setIsDarkMode] = useState( true)
	return(
		<DayNightToggle 
			 onChange={() => {setIsDarkMode(!isDarkMode);
				toggleColorMode(); 
			 }}
		checked={isDarkMode}
	  size={18}
		/>
	)

}

export default DaynightToggleImpl;