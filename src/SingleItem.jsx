// Imports
import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import customFetch from "./utils";
// import { useEditTask, useDeleteTask } from "./reactQueryCustomHooks";

// Component
const SingleItem = ({ id, isDone, title }) => {

	// Query client
	const queryClient = useQueryClient();

	// React-Query | Edit task
	const { isLoading:editTaskLoading, mutate:editTask } = useMutation({
		mutationFn:() => {
			return customFetch.patch(`/${ id }`, { isDone:!isDone });
		},
		onSuccess:() => {
			queryClient.invalidateQueries({ queryKey:['tasks'] });
			toast.success('Task updated !');
		},
		onError:() => {
			toast.error(error.response.data);
		}
	});
	// With custom hooks
	// const { editTask } = useEditTask();

	// React-Query | Delete task
	const { isLoading:deleteTaskLoading, mutate:deleteTask } = useMutation({
		mutationFn:(taskId) => {
			return customFetch.delete(`/${ taskId }`);
		},
		onSuccess:() => {
			queryClient.invalidateQueries({ queryKey:['tasks'] });
			toast.success('Task removed !');
		},
		onError:() => {
			toast.error(error.response.data);
		}
	});
	// With custom hooks
	// const { deleteTask, deleteTaskLoading } = useDeleteTask();

	// Return
	return(
		<div className='single-item'>
			<input type='checkbox' checked={ isDone } onChange={ () => { editTask(); } }/>
			<p style={{ textTransform:'capitalize', textDecoration:isDone && 'line-through' }}>
				{ title }
			</p>
			<button disabled={ deleteTaskLoading } className='btn remove-btn' type='button' onClick={ () => { deleteTask(id); } }>
				Delete
			</button>
		</div>
	);
};

// Export
export default SingleItem;