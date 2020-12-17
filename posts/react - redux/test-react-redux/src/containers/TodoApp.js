import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions/TodoActions';


class TodoApp extends Component {
    render() {
        // Lấy các state và action từ props
        // props lại được lấy từ Redux
        const { todos, actions } = this.props;

        return (
            <div>
                <Header addTodo={actions.addTodo} />

                <MainSection todos={todos} actions={actions} />
            </div>
        );
    }
}

/**
 * Lấy các state của Redux vào props.
 * @param {*} state 
 */
function mapStateToProps(state) {
    return {
        todos: state.todosReducers
    };
}

/**
 * Lấy các action của Redux vào props.
 * @param {*} dispatch 
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TodoActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
