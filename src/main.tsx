
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import App from './App'
import * as ReactDOM from 'react-dom/client'
import {theme} from './services/theme/theme';
import { BrowserRouter } from "react-router-dom";

import { Provider } from 'react-redux';
;
import { PersistGate } from "redux-persist/integration/react";
import {  persistor } from './store';
import store from "./configureStore"


const rootElement = document.getElementById('root') as Element;
ReactDOM.createRoot(rootElement ).render(
	<BrowserRouter>
		<ChakraProvider theme={theme} >
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<App />
				</PersistGate>
			</Provider>
		</ChakraProvider>
	</BrowserRouter>
)