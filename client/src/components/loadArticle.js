// @ flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, ConvertTime , ShowTime} from '../widgets';
import createHashHistory from 'history/createHashHistory';
import axios from 'axios';
import {CommentField} from './CommentField.js';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

//import { articleService } from "../services.js";
export class loadArticle extends React.Component < { match: {params: {id: number } } } >{
    
    test = this.props.match.params.id;
    constructor(props){
        super(props);
        this.state = {
            article: {}
        }
    }

    componentWillReceiveProps(newProps){
        console.log(newProps);
        if(newProps.match.params.id != this.props.match.params.id){
            axios.get("http://localhost:3000/getOneNews/"+newProps.match.params.id).then(res=>{
            this.setState({article: res.data[0]});
            console.log(this.state.news);
        });
            console.log("asfasad");
        }else{
            return;
        }
    }

    updateComment(){

    }

    componentDidMount(){
        axios.get("http://localhost:3000/getOneNews/"+this.props.match.params.id).then(res=>{
            this.setState({article: res.data[0]});
        });
    }
    
    render(){
        return(
            <div>
                <div className = "mb-5">
                    <img src={this.state.article.bilde} className = "img-thumbnail img-fluid mb-3"/>
                    <h1 className = "mb-2">{this.state.article.overskrift}</h1>
                    <ShowTime time = {this.state.article.tidspunkt} />
                    <p>{this.state.article.innhold}</p>

                    
                        
                </div>
                
                <div>
                    <CommentField id = {this.props.match.params.id}/>
                </div>
            </div>
        
            
        )
    }
}