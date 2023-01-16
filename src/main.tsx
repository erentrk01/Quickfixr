
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import App from './App'
import * as ReactDOM from 'react-dom/client'
import {theme} from './services/theme/theme';
import { BrowserRouter } from "react-router-dom";





const rootElement = document.getElementById('root') as Element;
ReactDOM.createRoot(rootElement ).render(
	<BrowserRouter>
		<ChakraProvider theme={theme} >
			<App />
		</ChakraProvider>
	</BrowserRouter>
)