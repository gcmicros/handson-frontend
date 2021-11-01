import logo from './logo.svg';
import './App.css';

const aws = require('aws-sdk')
const axios = require('axios')

aws.config.update({
    region: 'us-west-2'
});

const rss_url = 'https://api.vidible.tv/a350b9a3e7eef617e1a6432e6435c255/playlistng/videos/5c4c564d84dc1c0001266ed7';
const dynamo = new aws.DynamoDB.DocumentClient();
const dynamo_table_name = 'gcm-handson';

function App() {
 //const rss_resp = axios.get(rss_url); 
 //const res = Promise.resolve(rss_resp)
 const dyna_promise = dynamo.scan({TableName: dynamo_table_name}).promise()
 const res = Promise.resolve(dyna_promise)
 res.then( (value) => {
    console.log(value.data) 
 });
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

