import React from 'react';
import { connect } from 'react-redux';
import Todo from './Todo';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';


const TodoList = ({ todos }) => {

    return (
        <List>
            <Divider />
            {todos.map((todo, index) => (
                <div key={index}>
                    <Todo  todo={todo} />
                    <Divider/>
                </div>
            ))}
        </List>
    )
}


const mapStateToProps = state => ({ 
    todos: state.todos 
});

export default connect(mapStateToProps)(TodoList);