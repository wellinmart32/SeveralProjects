import React from 'react';

// Esta funcion representa un componente.
// function HelloWorld(props) {
//   console.log(props);
//   return (
//   <div id="hello">
//     <h3>{props.subtitle}</h3>
//     {props.mytext}
//   </div>
//   );
// }

// Concepto de estado en las funciones.
class HelloWorld extends React.Component {

  state = {
    show: true
  }

  toggleShow = () => {
    this.setState({show: !this.state.show})
  }

  render() {
    if (this.state.show) {
      return (
        <div id="hello">
          <h3>{this.props.subtitle}</h3>
          {this.props.mytext}
          <button onClick={this.toggleShow}>Toggle Show</button>
        </div>
      );
    } else {
      return <h1>
        There aren't elements
        <button onClick={this.toggleShow}>
            Toggle Show
        </button>
      </h1>
    }
  }
}

// Esta funcion representa un componente.
function App() {
  return (
    <div>This is my component: 
      <HelloWorld mytext="Hello Fazt" subtitle="loremp ispum"/>
      <HelloWorld mytext="Hi world!" subtitle="component two"/>
      <HelloWorld mytext="Hello" subtitle="component three"/>
    </div>
  );
}

export default App;
