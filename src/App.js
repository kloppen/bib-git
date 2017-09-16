import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class FilterInputBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    }
  }

  onChange(event) {
    this.setState({text: event.target.value});
    this.props.textChanged(this.state);
  }

  render() {
    return <div>
      <input type="text" onChange={this.onChange.bind(this)} value={this.state.text} />
    </div>
  }
}


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      library: [],
      displayLibrary: []
    }

  }

  getLibrary() {
    fetch("MyLibrary.json")
      .then( (response) => {
        return response.json()
      })
      .then( (json) => {
        this.setState({
          library: json
        })
      })
      .then( () => {
        this.filterDisplay()
      });
  }

  filterDisplay() {
    const displayLib = this.state.library.filter(function(item) {
      return item.title.includes("Test")
    });

    this.setState({
      displayLibrary: displayLib
    });
  }

  componentDidMount(){
    this.getLibrary()
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>bib-git</h2>
          <p><FilterInputBox textChanged={this.filterDisplay()} /></p>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <table>
          <tbody>{this.state.displayLibrary.map(function(item, id) {

            return (
              <tr key = {id}>
                <td>{item.type}</td>
                <td>{item.title}</td>
              </tr>
            )
          } ) }</tbody>
        </table>
      </div>
    );
  }
}

export default App;
