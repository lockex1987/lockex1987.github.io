import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import autoBind from 'react-autobind';


export default class TodoTextInput extends Component {

    static propTypes = {
        onSave: PropTypes.func.isRequired,
        text: PropTypes.string,
        placeholder: PropTypes.string,
        editing: PropTypes.bool,
        newTodo: PropTypes.bool
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            text: this.props.text || ''
        };
        autoBind(this);
    }

    handleSubmit(e) {
        const text = e.target.value.trim();
        if (e.which === 13) {
            this.props.onSave(text);
            if (this.props.newTodo) {
                this.setState({ text: '' });
            }
        }
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleBlur(e) {
        if (!this.props.newTodo) {
            this.props.onSave(e.target.value);
        }
    }

    render() {
        const checkClass = classnames({
            edit: this.props.editing,
            'new-todo': this.props.newTodo
        });
        return (
            <input
                className={checkClass}
                type='text'
                placeholder={this.props.placeholder}
                autoFocus={true}
                value={this.state.text}
                onBlur={this.handleBlur}
                onChange={this.handleChange}
                onKeyDown={this.handleSubmit} />
        );
    }
}
