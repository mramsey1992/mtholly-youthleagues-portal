// Imports
import axios from "axios";

// Test route for authentication middleware in express
export function addSport(data) {
    return dispatch => {
        return axios.post("/api/sportPost", data);
    }
}