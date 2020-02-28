import axios from 'axios';
import { GET_TODOS } from '../constants/actionTypes';
import { ADD_TODO } from '../constants/actionTypes';
import { EDIT_TODO } from '../constants/actionTypes';
import { DELETE_TODO } from '../constants/actionTypes';
import { TOGGLE_TODO } from './../constants/actionTypes';
import { SHOW_EDIT_DIALOG } from '../constants/actionTypes';
import { FILTER_COMPLETED } from '../constants/actionTypes';
import { FILTER_INCOMPLETED } from '../constants/actionTypes';


const serverAddress = "http://localhost:8080";

export const getTodos = () => {
    return (dispatch) => {
        return axios.get(serverAddress + "/todos")
            .then(res => {
                dispatch({type: GET_TODOS, payload: res.data})
            }).catch(errorHandler);
    };
};

export const addTodo = (text) => {
    return (dispatch) => {
        return axios.post(serverAddress + "/todos", { text })
            .then(res => {
                dispatch({ type: ADD_TODO, payload: res.data })
            }).catch(errorHandler);
    };
};

export const editTodo = (todo) => {
    return (dispatch) => {
        return axios.post(serverAddress + `/todos/${todo.id}`, { text: todo.text })
            .then(res => {
                dispatch({ type: EDIT_TODO, payload: res.data })
            }).catch(errorHandler);
    };
};

export const deleteTodo = (id) => {
    return (dispatch) => {
        return axios.delete(serverAddress + `/todos/${id}`)
            .then(res => {
                dispatch({ type: DELETE_TODO, payload: id })
            }).catch(errorHandler);
    };
};

export const toggleTodo = (todo) => {
    return (dispatch) => {
        const url = todo.completed ? `/todos/${todo.id}/incomplete` : `/todos/${todo.id}/complete`;
    
        return axios.post(serverAddress + url)
            .then(res => {
                dispatch({ type: TOGGLE_TODO, payload: res.data })
            }).catch(errorHandler);
    };
};

export const showDialog = (show) => ({ 
    type: SHOW_EDIT_DIALOG, 
    payload: show
});

export const filterTodos = (filter) => {
    switch(filter) {
        case "all":
            return getTodos();
        case "completed":
            return (dispatch) => {
                return axios.get(serverAddress + "/todos")
                    .then(res => {
                        dispatch({type: FILTER_COMPLETED, payload: res.data})
                    }).catch(errorHandler);
            };
        case "incompleted": 
            return (dispatch) => {
                return axios.get(serverAddress + "/todos")
                    .then(res => {
                        dispatch({type: FILTER_INCOMPLETED, payload: res.data})
                    }).catch(errorHandler);
            };
        default: getTodos();
    }
};

const errorHandler = (error) => {
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log('Error', error.message);
    }
    console.log(error.config);
};
