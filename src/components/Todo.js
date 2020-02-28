import React from 'react';
import { connect } from 'react-redux';
import { deleteTodo, toggleTodo, showDialog } from '../actions'; 
import EditDialog from './EditDialog';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


const Todo = ({ todo, toggleTodo, deleteTodo, showDialog, show }) => {
    const handleToggle = () => () => {
        toggleTodo(todo);
    }

    const handleDelete = () => () => {
        deleteTodo(todo.id);
    }

    const handleOpenDialog = () => () => {
        showDialog(todo.id);
    };

    const labelId = `checkbox-list-label-${todo.id}`;


    return(
        <ListItem key={todo.id} role={undefined} dense button>
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={todo.completed}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 
                      'aria-label': 'secondary checkbox',
                      'aria-labelledby': labelId, 
                    }}
                    onClick={handleToggle()}
                    style={{ color: "#4caf50" }}
                />
            </ListItemIcon>
            <ListItemText id={labelId} primary={todo.text} onClick={handleToggle()}
                style={{
                    textDecoration: todo.completed ? "line-through rgba(0,0,0,0.5)" : "none"
                }}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={handleOpenDialog()}>
                    <EditIcon />
                </IconButton>
                {show === todo.id ?
                    <EditDialog todo={todo}/> : null
                }
                <IconButton edge="end" aria-label="delete" onClick={handleDelete()}>
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}


const mapStateToProps = state => ({
   show: state.uiStates.showEditDialog
});

const mapDispatchToProps = dispatch => ({
    toggleTodo: todo => dispatch(toggleTodo(todo)),
    deleteTodo: id => dispatch(deleteTodo(id)),
    showDialog: show => dispatch(showDialog(show))
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
