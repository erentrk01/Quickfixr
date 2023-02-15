import { Input, InputRightElement,InputLeftElement, Popover, PopoverTrigger,Tooltip,InputGroup, IconButton } from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons"
import { FcFilledFilter } from "react-icons/fc";
import FilterBar from "../filterBar/filterBar.view";
import { useState } from "react";
interface SearchBarType{
	onQueryChange: (newQuery: string) => void,
	handleConditionFilterChange:(e: React.ChangeEvent<HTMLSelectElement>) => void,
	handleFunctionalAreaFilterChange:(e: React.ChangeEvent<HTMLSelectElement>) => void
	 
}
const SearchBar:React.FC<SearchBarType> = ({onQueryChange,handleConditionFilterChange,handleFunctionalAreaFilterChange}) => 
	{	const [query, setQuery] = useState<string>("");
		const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const newQuery = event.target.value;
			onQueryChange(newQuery);
			setQuery(newQuery);
		};
	return (
		<InputGroup>
			<InputLeftElement pointerEvents="none">
				<SearchIcon color="gray.300" />
			</InputLeftElement>
			<Tooltip
				borderRadius={10}
				placement='right' 
				fontSize='md'
				label="filter">
				<InputRightElement>
					<Popover
						placement='bottom'
						closeOnBlur={false}>
							<PopoverTrigger>
								<IconButton
									 borderRadius={11} size="sm" aria-label='Search database' icon={<FcFilledFilter/>}/>
							</PopoverTrigger>
						<FilterBar 
							handleConditionFilterChange={handleConditionFilterChange}
							handleFunctionalAreaFilterChange={handleFunctionalAreaFilterChange}
							/>
					</Popover>
				</InputRightElement>
			</Tooltip>
		<Input
			type="text"
			value={query}
			onChange={handleQueryChange}
			placeholder="Search events..."
			_placeholder={{ color: "gray.400" }}
			variant="outline"
			borderColor="gray.300"
			focusBorderColor="blue.500"
			borderRadius="full"
			size="md"
		/>
		</InputGroup>
	)
}

export default SearchBar;