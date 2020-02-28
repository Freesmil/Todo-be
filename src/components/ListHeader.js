import React, { useState } from 'react';
import { connect } from 'react-redux';
import { toggleTodo, filterTodos } from './../actions';

import FilterListIcon from '@material-ui/icons/FilterList';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';


const ListHeader = ({ todos, toggleTodo, filter, filterTodos }) => {
    const [selected, setSelected] = useState(false);
    const [showMenu, setShowMenu] = useState(null);

    const handleSelect = () => {
        setSelected(!selected);
        todos.filter(todo => todo.completed === (selected))
            .forEach(todo => toggleTodo(todo));
    }

    const handleOpenMenu = (event) => {
        setShowMenu(event.currentTarget);
    };

    const handleCloseMenu = (filterOption) => {
        setShowMenu(null);
        if(filterOption && (filter !== filterOption)) {
            filterTodos(filterOption);
        }
    };


    return (
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <Tooltip title="Check/uncheck all" arrow>
                    <IconButton
                        value="checkAll"
                        onClick={handleSelect}
                        style={{color: selected ? "#4caf50" : "", float: "left"}}
                    >
                        <CheckIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Grid item xs={6}>
                <div style={{float: "right"}}>
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    <Tooltip title="Filter" arrow>
                        <IconButton 
                            aria-label="filter" 
                            style={{color: filter !== "all" ? "#2196f3" : "" }}
                            aria-controls="simple-menu" 
                            aria-haspopup="true"
                            onClick={handleOpenMenu}
                        >
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        id="simple-menu"
                        anchorEl={showMenu}
                        keepMounted
                        open={Boolean(showMenu)}
                        onClose={handleCloseMenu.bind(this, null)}
                    >
                        <MenuItem onClick={handleCloseMenu.bind(this, 'all')}>All</MenuItem>
                        <MenuItem onClick={handleCloseMenu.bind(this, 'completed')}>Completed</MenuItem>
                        <MenuItem onClick={handleCloseMenu.bind(this, 'incompleted')}>Incompleted</MenuItem>
                    </Menu>
                </div>
            </Grid>
        </Grid>
    )
}


const mapStateToProps = state => ({
    todos: state.todos,
    filter: state.uiStates.filter 
});

const mapDispatchToProps = dispatch => ({
    toggleTodo: todo => dispatch(toggleTodo(todo)),
    filterTodos: filter => dispatch(filterTodos(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListHeader)
