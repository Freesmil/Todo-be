import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import TodoList from './TodoList';
import ListHeader from './ListHeader';
import ListFooter from './ListFooter';
import { getTodos } from './../actions';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './../App.css';

const useStyles = makeStyles(theme => ({
    root: {
        margin: "auto",
        width: "60%",
        textAlign: "center",
        backgroundColor: theme.palette.background.paper,
    }
}));


const App = ({ getTodos }) => {
    const classes = useStyles();
    getTodos();
    

    return (
      <div className="todoApp">
          <h1>Todo-be</h1>
          <Paper elevation={3} className={classes.root}>
              <Header />
              <ListHeader />
              <TodoList />
              <ListFooter />
          </Paper>
      </div>
    )
}


const mapDispatchToProps = dispatch => ({
    getTodos: () => dispatch(getTodos())
});

export default connect(null, mapDispatchToProps)(App);
