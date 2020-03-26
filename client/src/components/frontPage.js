// @ flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, FormGroupArea } from '../widgets';
import createHashHistory from 'history/createHashHistory';
import axios from 'axios';
//import { articleService } from '../services.js';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student


import { NewsCard } from './newsCard.js';


export class frontPage extends Component {
    
    constructor(){
        super()
        this.state = {
            frontNews: []
        }
    }
    

    
    componentDidMount(){
        
        axios.get("http://localhost:3000/getPriorityOne").then(res=>{
            this.setState({frontNews: res.data});
        });
    }
    
    render(){
           
        const front = this.state.frontNews.map((r,i)=>{
            
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
                {front}
            </div>
        )
    }          
}