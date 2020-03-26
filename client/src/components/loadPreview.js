// @ flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, FormGroupArea } from '../widgets';
import createHashHistory from 'history/createHashHistory';
import axios from 'axios';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

import {NewsCard} from "./newsCard.js";

export class loadPreview extends React.Component<{  match: { params: {category: string } } }> {

    constructor(){
        super()
        this.state = {
            localNews: []
        }
    }

    componentDidMount(){
        axios.get("http://localhost:3000/getCategory/"+this.props.match.params.category).then(res=>{
            this.setState({localNews: res.data});
        });
    }

    componentWillReceiveProps(newProps){

        if(newProps.match.params.category != this.props.match.params.category){

           axios.get("http://localhost:3000/getCategory/"+ newProps.match.params.category).then(res=>{
                this.setState({localNews: res.data});
            }); 
        }else{
            return;
        }
    }


    render(){
        
        const local = this.state.localNews.map((r,i)=>{
            return(
                <NewsCard
                    key={r.id}
                    src={r.bilde}
                    headline={r.overskrift}
                    date={r.tidspunkt}
                    content={r.innhold.substring(0,20)+"..."}
                    id={r.id}
                />
            )
        })
        return(
            <div className = "row">
                {local}
            </div>
        )
    }    
}


