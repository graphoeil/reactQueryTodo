// Imports
import React from "react";
import { useQuery } from "@tanstack/react-query";
import customFetch from "./utils";
import SingleItem from './SingleItem';
// import { useFetchTasks } from "./reactQueryCustomHooks";

/* With React-Query we trigger our http calls from the component, 
it is no longer necessary to centralize everything in a store or a context ;-) */

// Component
const Items = () => {

	// With custom hooks
	// const { isLoading, data, isError, error } = useFetchTasks();

	// React-Query
	const { isLoading, data, isError, error } = useQuery({
		// Query key
		// The unique key you provide is used internally for refetching, caching,
		// and sharing your queries throughout your application
		queryKey:['tasks'],
		// Query function
		// A query function can be literally any function that returns a promise.
		// Axios always return a promise ;-)
		queryFn:() => { return customFetch.get('/'); }
		/* or 
		queryFn:async() => {
			const { data } = await customFetch.get('/');
			return data;
		} and in the return :
		data.tasklist.map((item) => { ... }) */
	});

	// Returns
	if (isLoading){
		return <p style={ { marginTop:'1rem', textAlign:'center' } }>Loading...</p>;
	}
	// if (isError){
	// 	return <p style={ { marginTop:'1rem', textAlign:'center' } }>There was an error...</p>;
	// }
	if (error){
		// Error message is sent by the server, and is in the response ;-)
		return <p style={ { marginTop:'1rem', textAlign:'center' } }>{ error.response.data }</p>;
	}
	return(
		<div className='items'>
		{
			data.data.taskList.map((item) => {
				return <SingleItem key={ item.id } { ...item } />;
			})
		}
		</div>
	);

};

// Export
export default Items;