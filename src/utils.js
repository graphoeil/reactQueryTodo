// Imports
import axios from "axios";

// Axios custom instance
const customFetch = axios.create({
	baseURL:'http://localhost:5000/api/tasks'
});

// Export
export default customFetch;