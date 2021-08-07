import React, { Component } from 'react';
import './Task.css';

class Task extends Component {

    StyleCompleted() {
        return {
            fontSize: '20px',
            color: this.props.task.done ? 'gray': 'black',
            textDecoration: this.props.task.done ? 'line-through' : 'none'
        }
    }

    render() {
        const {task} = this.props;

        // return <p className="red">
        //     {this.props.task.title} - 
        //     {this.props.task.description} - 
        //     {this.props.task.done} - 
        //     {this.props.task.id}
        //     <input type="checkbox" />
        //     <button>
        //         x 
        //     </button>
        // </p>

        // return <p /*style={{background: 'red'}}*/>
        //     {this.props.task.title} - 
        //     {this.props.task.description} - 
        //     {this.props.task.done} - 
        //     {this.props.task.id}
        //     <input type="checkbox" />
        //     <button style={btnDelete}>
        //         x 
        //     </button>
        // </p>        

        return <p style={this.StyleCompleted()}>
            {this.props.task.title} - 
            {this.props.task.description} - 
            {this.props.task.done} - 
            {this.props.task.id}
            <input type="checkbox" onChange={this.props.checkDone.bind(this, task.id)}/>
            <button style={btnDelete}
                onClick={this.props.deleteTask.bind(this, task.id)}>
                x 
            </button>
        </p>
    }
}

const btnDelete = {
    fontSize: '18px',
    background: '#ea2027',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '50%',
    cursor: 'pointer',
}

export default Task;