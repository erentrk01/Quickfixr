import { Hide } from "@chakra-ui/react"
import { Logo } from "../../atoms/logo"
import  LinksRow  from "./linksRow"

export const FullBar = () => {
	return (
		<>
			<Logo/>
			<Hide below='md'>
			<LinksRow/>
			</Hide>
		</>
	)
}