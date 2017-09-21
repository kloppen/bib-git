import React from 'react';
import '../App.css'
import RefList from "./RefList"
import AddRef from "./AddRef"


/*class App extends Component {
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
          <h2>bib-git</h2>
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
}*/

const App = () => (
  <div className="App">
    <div className="App-header">
      <h2>bib-git</h2>
      <div className="Search">
        Search: <input type="text" title = "Search" size="40" />
      </div>
      <div className="Header-buttons">
        <button type="button">Load References</button>
        <AddRef/>
      </div>
    </div>
    <RefList/>
  </div>
);

export default App;
