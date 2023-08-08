// Imports
import React, { useState } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import customFetch from "./utils";
// import { useCreateTask } from "./reactQueryCustomHooks";

// Component
const Form = () => {

	// State
  	const [newItemName, setNewItemName] = useState('');

	// Query client instance to access all queryKey
	const queryClient = useQueryClient();

	// React-Query
	const { isLoading, mutate:createTask } = useMutation({
		mutationFn:(taskTitle) => {
			return customFetch.post('/', {
				title:taskTitle
			});
		},
		onSuccess:() => {
			// Re-fetch task for us without useEffect to watch store array ...
			queryClient.invalidateQueries({ queryKey:['tasks'] });
			toast.success('Task added !');
			setNewItemName('');
		},
		onError:(error) => {
			toast.error(error.response.data);
		}
	});
	// With custom hooks with access to the state ;-)
	// const { createTaskLoading, createTask } = useEditTask();
	// In the submit to clear the input
	// createTask(newItemName, {
	// 	onSuccess:() => {
	// 		setNewItemName('');
	// 	}
	// });

	// Submit form
	const handleSubmit = (e) => {
		e.preventDefault();
		if (!newItemName){
			toast.error('Please give a title !');
			return;
		}
		createTask(newItemName);
	};

	// Return
	return(
		<form onSubmit={ handleSubmit }>
			<h4>Task bud</h4>
			<div className='form-control'>
				<input type='text' className='form-input' value={ newItemName } 
					onChange={(e) => { setNewItemName(e.target.value); } }/>
				<button type='submit' disabled={ isLoading } className='btn'>
					Add task
				</button>
			</div>
		</form>
	);
};

// Export
export default Form;