import { GET_TODOS } from './../constants/actionTypes';
import { ADD_TODO } from './../constants/actionTypes';
import { EDIT_TODO } from './../constants/actionTypes';
import { DELETE_TODO } from './../constants/actionTypes';
import { TOGGLE_TODO } from './../constants/actionTypes';
import { SHOW_EDIT_DIALOG } from './../constants/actionTypes';
import { FILTER_COMPLETED } from './../constants/actionTypes';
import { FILTER_INCOMPLETED } from './../constants/actionTypes';


const initialState = {
    todos: [],
    uiStates: {
        showEditDialog: -1,
        filter: "all"
    }
}


const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TODOS:
            return Object.assign({}, state, {
                todos: action.payload, 
                uiStates: {
                    showEditDialog: state.uiStates.filter.showEditDialog,
                    filter: "all"
                },
            });
        case ADD_TODO:
            return Object.assign({}, state, {
                todos: state.todos.concat([action.payload]),
                uiStates: state.uiStates
            });
        case DELETE_TODO:
            return Object.assign({}, state, {
                todos: state.todos.filter((todo) => todo.id !== action.payload),
                uiStates: state.uiStates
            });
        case EDIT_TODO:
        case TOGGLE_TODO:
            return Object.assign({}, state, {
                todos: state.todos.map((todo) => {
                    if(todo.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return todo;
                    }            
                }),
                uiStates: state.uiStates
            });
        case SHOW_EDIT_DIALOG:
            return Object.assign({}, state, {
                uiStates: {
                    showEditDialog: action.payload,
                    filter: state.uiStates.filter
                },
                todos: state.todos
            });
        case FILTER_COMPLETED:
            return Object.assign({}, state, {
                uiStates: {
                    showEditDialog: state.uiStates.filter.showEditDialog,
                    filter: "completed"
                },
                todos: action.payload.filter(todo => todo.completed)
            });
        case FILTER_INCOMPLETED:
            return Object.assign({}, state, {
                uiStates: {
                    showEditDialog: state.uiStates.filter.showEditDialog,
                    filter: "incompleted"
                },
                todos: action.payload.filter(todo => !todo.completed)
            });
        default:
            return state;
    }
}

export default rootReducer;

