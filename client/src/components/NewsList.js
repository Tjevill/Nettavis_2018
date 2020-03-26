// @ flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, FormGroupArea } from '../widgets';
import createHashHistory from 'history/createHashHistory';
import axios from 'axios';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student





export class NewsList extends React.Component{
    
    state = {
        news: []
    }

    componentDidMount(){
        axios.get('http://localhost:3000/getNews').then(res=>{
            console.log(res);
            this.setState({news: res.data});
        });
    }

    render(){
        return (
            <ul>
                {this.state.news.map(news =><li key={news.id}>{news.overskrift}</li>)}
            </ul>
        )
    }
}