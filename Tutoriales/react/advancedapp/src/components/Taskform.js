import React, { Component } from 'react';
import '../App.css';

class TaskForm extends Component {

    state = {
        title: '',
        Description: ''
    }

    onSubmit = e => {
        this.props.addTask(this.state.title, this.state.description);
        e.preventDefault();
    }

    onChange = e => {
        console.log(e.target.name, e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text"
                    name="title"
                    placeholder="Write a Task" 
                    onChange={this.onChange} 
                    value={this.state.title}/>
                <br />
                <br />
                <textarea
                    name="title"
                    placeholder="Write a Description" 
                    onChange={this.onChange} 
                    value={this.state.description}/>
                    <input type="submit"/>
            </form>
        )
    }
}

export default TaskForm;