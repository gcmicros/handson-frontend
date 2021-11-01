import logo from './logo.svg';
import './App.css';
const axios = require('axios')

const rss_url = 'https://api.vidible.tv/a350b9a3e7eef617e1a6432e6435c255/playlistng/videos/5c4c564d84dc1c0001266ed7';
function App() {
 const rss_resp = axios.get(rss_url); 
 const res = Promise.resolve(rss_resp)
 res.then( (value) => {
    console.log(value.data) 
 });
 console.log(rss_resp)
 //return rss_resp.value.data 
 return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          GCM Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

