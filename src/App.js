import React, {Component} from 'react'
import logo from './logo.svg';
import './App.css';

const axios = require('axios')

const api_gtwy_entity = 'https://qmzxuuckpl.execute-api.us-west-2.amazonaws.com/default/handson-api-gateway?TableName=gcm-handson&search&entity='
const api_gtwy = 'https://qmzxuuckpl.execute-api.us-west-2.amazonaws.com/default/handson-api-gateway?TableName=gcm-handson'

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = { items: []
        }
        this.onSearch = this.onSearch.bind(this)
    }

    makeButtonHTML(data) {
        var str = data.ConvertS3Url.substring(21)
        var link = "https://gcm-handson-test.s3.us-west-2.amazonaws.com" + str
        return (
            `<div>
                <p> ` + data.Name + `</p>
                <video
                    controls preload="auto" width="640" height="480">
                    <source src=` + link + ` /> 
                </video>
            </div>`
        );
    }
    makeButton(data) {
        var str = data.ConvertS3Url.substring(21)
        var link = "https://gcm-handson-test.s3.us-west-2.amazonaws.com" + str
        return (
            <div>
                <p> {data.Name} </p>
                <video
                    controls preload="auto" width="640" height="480">
                    <source src={link} /> 
                </video>
            </div>
        );
    }

    SearchBar = () => { return (
        <div >
            <div>
            <label htmlFor="header-search">
                <span className="visually-hidden">Search videos with entity</span>
            </label>
            </div>
            <input
                type="text"
                id="header-search-input"
                //placeholder="search videos"
                name="s" 
            />
            <button onClick={this.onSearch} >Search</button>
        </div>
    )};
    

    render() {
     //return rss_resp.value.data 
     return (
        <div className="App">
          <header className="App-header">
            <h1>
              Hands On RSS feed reader 
            </h1>
            <div>
                {this.SearchBar()}
            </div>
            <div id='the-videos'>
              {this.state.items.map(   this.makeButton, this)} 
            </div>
          </header>
        </div>
      );
    }

    onSearch() {
        var _this = this;
        var search = document.getElementById('header-search-input')
        if (search == null || !search.value) {
            return;
        }
    
        console.log(search.value)
        const rss_resp = axios.get(api_gtwy_entity + search.value); 
        const res = Promise.resolve(rss_resp)
        res.then( (value) => {
            if (value.data == []) {
                return
            }
           console.log(value.data)
           //_this.setState({items: value.data});
            var videos = document.getElementById('the-videos')
            if (videos ==  null) {
                return;
            }
            videos.innerHTML =  "<p>Results for " + search.value + "</p>" + value.data.map(this.makeButtonHTML, this) 
        });
    }

    componentDidMount() {
        var _this = this;

         const rss_resp = axios.get(api_gtwy); 
         const res = Promise.resolve(rss_resp)
         res.then( (value) => {
            console.log(value.data)
            _this.setState({items: value.data});
         });
    }


}
