import React, { Component } from 'react'

export default class Element extends Component {
    render() {
        return (
            <div>
                {this.props.title} - 
                {this.props.subtitle} -
                {this.props.id} -
                {this.props.done}
            </div>
        )
    }
}
