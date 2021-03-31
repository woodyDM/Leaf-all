import logo from '../logo.svg';
import './App.css';
import {Button} from "antd";
import axios from "axios";
import {useState} from "react"

function App() {

  const [value,setValue] = useState("no value");

  const call = ()=>{
    axios.get("/api/example")
        .then(r=>setValue(r.data))
        .catch(console.log)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          The value is {value}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
          <Button onClick={()=>call()}>Call Server</Button>
      </header>
    </div>
  );
}

export default App;
