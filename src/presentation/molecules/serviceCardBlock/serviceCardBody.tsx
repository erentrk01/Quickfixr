import { CardBody, Text } from "@chakra-ui/react";

const ServiceCardBody=({content})=>{
	return (
		<CardBody>
			<Text>{content}</Text>
		</CardBody>
	)
}

export default ServiceCardBody;