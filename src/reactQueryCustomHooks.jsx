// Imports
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import customFetch from "./utils";

// Fetch tasks
export const useFetchTasks = () => {
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
	// Return
	return { isLoading, isError, error, data };
};

// Create task
export const useCreateTask = () => {
	const queryClient = useQueryClient();
	const { isLoading:createTaskLoading, mutate:createTask } = useMutation({
		mutationFn:(taskTitle) => {
			return customFetch.post('/', {
				title:taskTitle
			});
		},
		onSuccess:() => {
			// Re-fetch task for us without useEffect to watch store array ...
			queryClient.invalidateQueries({ queryKey:['tasks'] });
			toast.success('Task added !');
			// setNewItemName(''); !!! We don't have access to the state here !!!
		},
		onError:(error) => {
			toast.error(error.response.data);
		}
	});
	return { createTask, createTaskLoading };
};

// Edit task
export const useEditTask = () => {
	const queryClient = useQueryClient();
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
	// Return
	return { editTask };
};

// Delete task
export const useDeleteTask = () => {
	const queryClient = useQueryClient();
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
	return { deleteTask, deleteTaskLoading };
};