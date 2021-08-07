import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import spannify from 'app/lib/spannify';
import animate from 'app/lib/animate';

class WordAnimation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animationShown: false
    }
  }

  componentWillMount() {
    let baseStyle = { opacity: 0 }

    if (this.props.children) {
      this.text = spannify(this.props.children, 'word', baseStyle);
    }
  }

  componentWillReceiveProps(nextProps) {
    let baseStyle = { opacity: 0 }
    if (!this.text && nextProps.children) {
      this.text = spannify(nextProps.children, 'word', baseStyle);
    }
  }

  componentDidMount() {
    if (this.text && this.props.trigger == undefined) {
      this.startAnimation();
    }
    if (this.text && this.props.trigger) {
      this.startAnimation();
    }
  }

  componentDidUpdate() {
    if (!this.state.animationShown && this.text && this.props.trigger == undefined) {
      this.startAnimation();
    }
    if (!this.state.animationShown && this.text && this.props.trigger) {
      this.startAnimation();
    }
  }

  startAnimation() {
    const props = this.props;
    const words = ReactDOM.findDOMNode(this).children;
    if (!this.state.animationShown && words.length) {
      for(let i = 0; i < words.length; i++) {
        let word = words[i];
        let delay = props.delay + props.duration / words.length * i;
        word.style.transform = 'translateY(30px)';
        word.style.opacity = 0;
        animate({
          easing: 'ease',
          el: word,
          translateY: 0,
          opacity: 1,
          duration: props.duration * 1000,
          delay: delay * 1000
        });
      }
      this.setState({
        animationShown: true
      });
    }
  }

  render() {
    return <span className="word-animator">{this.text}</span>;
  }

};

export default WordAnimation;
