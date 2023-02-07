import { Hide,Box } from "@chakra-ui/react"
import { Logo } from "../../atoms/logo"
import  LinksRow  from "./linksRow"
import {motion} from "framer-motion"

export const FullBar = () => {
	return (
		<>
			<Box mt={2}>
				<Logo />
			</Box>
			<Hide below='md'>
			<LinksRow/>
			</Hide>
		</>
	)
}