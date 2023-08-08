// Imports
import React from "react";
import { ToastContainer } from 'react-toastify';
import Form from './Form';
import Items from './Items';

// Component
const App = () => {

	// Return
	return(
		<section className='section-center'>
			<ToastContainer position='top-center' autoClose={ 1777 } />
			<Form />
			<Items/>
		</section>
	);
};

// Export
export default App;