import { Flex, Link, Menu, MenuButton,Text,Icon,Tooltip} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const NavItem =({navSize,title,icon})=>{
	return(
		<Flex
			mt={30}
			flexDir='column'
			alignItems={navSize == "small" ? "center" : "flex-start"}

		>
			<Menu placement="right">
			<Tooltip display={navSize =="small" ? "flex":"none"} label={title} placement='auto-start'>
				<Link
					as={NavLink}
					to={"/"+title}
					p={3}
					borderRadius={8}
					_hover={{textDecor:"none" ,background: "gray.100" }}
					w={navSize == "large" ? "100%":""}
				>
					<MenuButton w="100%">
						<Flex>
							<Icon as={icon} fontSize="xl"/>
							<Text ml={5} display={navSize =="small" ? "none" :"flex"}>{title}</Text>
						</Flex>
					</MenuButton>
				</Link>
				</Tooltip >
			
			</Menu>
		</Flex>
	)
}

export default NavItem;