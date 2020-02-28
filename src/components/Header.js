import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../actions';

import TextField from '@material-ui/core/TextField';


const Header = ({ addTodo }) => {
    const [text, setText] = useState("");

    const onChange = (event) => setText(event.target.value);

    const onSubmit = (event) => {
        event.preventDefault();
        if (text !== "") {
            addTodo(text);
            setText("");
        }
    }


    return (
        <div className="header">
            <form onSubmit={onSubmit}>
                <TextField label="Write your task" variant="outlined"
                    value={text}
                    onChange={onChange}
                    style={{width: "100%"}}
                />
                <button type="submit" style={{display:"none"}}>Submit</button>
            </form>
        </div>
    )
}


const mapStateToProps = state => ({
    filter: state.uiStates.filter 
});

const mapDispatchToProps = dispatch => ({
    addTodo: text => dispatch(addTodo(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

