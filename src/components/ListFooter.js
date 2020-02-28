import React from 'react';
import { connect } from 'react-redux';
import { deleteTodo } from './../actions'; 

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const ListFooter = ({ deleteTodo, todos }) => {
    const handleDelete = () => {
        todos.filter(todo => todo.completed)
            .forEach(todo => deleteTodo(todo.id));
    }


    return (
        <Grid container spacing={1}>
            <Grid item xs={6} style={{paddingTop: 12}}>
                {todos.filter(todo => !todo.completed).length} items left
            </Grid>
            <Grid item xs={6}>
                <Button onClick={handleDelete}>Delete completed tasks</Button>
            </Grid>
        </Grid>
    )
}


const mapStateToProps = state => ({
    todos: state.todos
});


const mapDispatchToProps = dispatch => ({
    deleteTodo: id => dispatch(deleteTodo(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListFooter);