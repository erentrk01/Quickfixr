import  DaynightToggleImpl from "../../atoms/daynightToggle"
import { Heading, HStack,Show,Hide} from "@chakra-ui/react";
import MobileDrawer from "../drawerBlock/mobilDrawer";

export const ThemeToggleLogo = () => {
	return (
		<HStack  spacing="20px" >
		

		<Show below='sm'>
			<Heading >Quickfixr</Heading>
		</Show>
		<Hide above='md'>
		
			<MobileDrawer/>
		</Hide> 
		<DaynightToggleImpl/>
	</HStack>
	)
}