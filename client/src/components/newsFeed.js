// @ flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, FormGroupArea, ConvertTime, ShowTime } from '../widgets';
import axios from 'axios';


export class NewsFeed extends React.Component{
    
    constructor(){
        super()
        this.state = {
            headlines: []
        }
    }

    componentDidMount(){
        axios.get("http://localhost:3000/getHeadlines").then(res=>{
            this.setState({headlines: res.data});
        });
    }

    render(){

        const hl = this.state.headlines.map((r,i)=>{

            return(
                <a 
                    className = "mr-4 ml-4 btn btn-dark"
                    key = {i}
                    href = {"#/readArticle/"+r.id}>
                    <ShowTime time={r.tidspunkt} children={r.overskrift}/>
                </a>
            )
        })
        return(
            <div className = "bg-dark">
                <marquee
                    behavior = "scroll"
                    direction = "left"
                >
                    {hl}
                </marquee>
            </div>
        )
    }
}
