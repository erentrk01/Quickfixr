import { PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader ,FormControl,FormLabel,Select, PopoverArrow,Box} from "@chakra-ui/react";


interface ChildProps {
	handleConditionFilterChange:(e: React.ChangeEvent<HTMLSelectElement>) => void,
	handleFunctionalAreaFilterChange:(e: React.ChangeEvent<HTMLSelectElement>) => void
  }

const FilterBar: React.FC<ChildProps> = ({ handleConditionFilterChange, handleFunctionalAreaFilterChange}) => {
	
	return (
		<PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
        	<PopoverHeader pt={4} fontWeight='bold' border='0'>
         		 Manage Your Channels
        	</PopoverHeader>
        	<PopoverArrow />
        	<PopoverCloseButton />
        	<PopoverBody>
				<FormControl mt={3}>
					<FormLabel>Condition</FormLabel>
						<Select 
							onChange={(e) => handleConditionFilterChange(e)}
							variant='filled' 
							placeholder="all">
								
								<option value="pending">pending</option>
								<option value="in progress">in progress</option>
								<option value="done">done</option>
								
						</Select>
				</FormControl>
				<FormControl mt={3}>
					<FormLabel>Functional Area</FormLabel>
						<Select 
							onChange={(e) =>handleFunctionalAreaFilterChange(e)}
							variant='filled' 
							placeholder='tüm bina'>
								<option value='bahçe'>bahçe</option>
								<option value='otopark'>otopark</option>
						</Select>
				</FormControl>
		</PopoverBody>
      </PopoverContent>
	)
}


export default FilterBar;