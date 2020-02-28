import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editTodo, showDialog } from '../actions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const EditDialog = ({ showDialog, editTodo, show, todo }) => {
    const [text, setText] = useState(todo.text);

    const handleCloseDialog = () => () => {
        showDialog(-1);
    }

    const handleEdit = () => () => {
        todo.text = text;
        editTodo(todo);
        showDialog(-1);
    }

    const onChange = (event) => setText(event.target.value);

    const labelId = `dialog-label-${todo.id}`;


    return (
        <Dialog 
            open={show === todo.id ? true : false} 
            onClose={handleCloseDialog} 
            aria-labelledby={labelId}
        >
            <DialogTitle id={labelId}>Edit</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id={todo.id}
                    label="Task name"
                    type="text"
                    value={text}
                    onChange={onChange}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog()} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleEdit()} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    )
}


const mapStateToProps = state => ({ 
    show: state.uiStates.showEditDialog 
});

const mapDispatchToProps = dispatch => ({
    editTodo: todo => dispatch(editTodo(todo)),
    showDialog: show => dispatch(showDialog(show))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDialog);
