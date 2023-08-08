// Imports
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';

// React-Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

// ReactDOM
ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={ queryClient }>
		<App/>
	</QueryClientProvider>
);