// @ flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, FormGroupArea } from '../widgets';
import createHashHistory from 'history/createHashHistory';
import axios from 'axios';

const history = createHashHistory(); 

export class EditNews extends React.Component <{  match: { params: {id: number } } }>{
    constructor(props){
        super(props);
        this.state = {
            news:{}
        }
    }


    //Handlers
    handleHeadline = event => {
        let k = this.state.news;
        k.overskrift = event.target.value;
        this.setState({ news: k });
    };

    handleContent = event =>{
        let k = this.state.news;
        k.innhold = event.target.value;
        this.setState({ news: k });
    }

    handleUrl = event =>{
        let k = this.state.news;
        k.bilde = event.target.value;
        this.setState({ news: k });
    }

    handleCategory = event =>{
        let k = this.state.news;
        k.kategori = event.target.value;
        this.setState({ news: k });
    }

    handleImportancy = event =>{
        let k = this.state.news;
        k.viktighet = event.target.value;
        this.setState({ news: k });
    }

    handleSubmit = event => {
        event.preventDefault();

        let newsList = {
            "overskrift": this.state.news.overskrift,
            "innhold": this.state.news.innhold,
            "bilde": this.state.news.bilde,
            "kategori": this.state.news.kategori,
            "viktighet": this.state.news.viktighet,
            "id": this.state.news.id
        };
        //console.log(newsList);
        axios.post('http://localhost:3000/updateOne', newsList );
    };

    componentDidMount(){
        axios.get('http://localhost:3000/getOneNews/'+this.props.match.params.id).then(res=>{
        
            this.setState({news: res.data[0]});
        });
        
    }    

    render(){
        return(
            <form 
                onSubmit = {this.handleSubmit} 
            >
                <div className = "form-group">
                    <label htmlFor = "headline">  Headline: </label>
                    <input 
                        className = "form-control"
                        type="text"
                        id = "headline"
                        defaultValue = {this.state.news.overskrift}
                        onChange = {this.handleHeadline}
                    />
                </div>

                <div className = "form-group">
                    <label htmlFor = "content"> Content: </label>
                    <textarea
                        className = "form-control"
                        type = "text"
                        rows = "3"
                        id = "content"
                        value = {this.state.news.innhold}
                        onChange = {this.handleContent}
                    />
                </div>

                <div className = "form-group">
                    <label htmlFor = "url">Picture URL</label>
                    <input
                        type = "text"
                        className = "form-control"
                        id = "url"
                        defaultValue = {this.state.news.bilde}
                        onChange = {this.handleUrl}
                    />
                </div>

                <div className = "form-group">
                    <label htmlFor = "category">Category</label>
                    <select 
                        className = "form-control"  
                        id = "category"
                        onChange = {this.handleCategory}
                    >
          
                        <option value= {this.state.news.kategori}>{this.state.news.kategori}</option>
                        <option value = "LocalNews">Local News</option>
                        <option value = "Sport">Sports</option>
                        <option value = "Gossip">Gossip</option>
                    </select>
                </div>

                <div className = "form-group">
                    <label htmlFor = "importancy">Importancy</label>
                    <select 
                        className = "form-control" 
                        id = "importancy"
                        onChange = {this.handleImportancy}
                    >
                        <option value = {this.state.news.viktighet} >{this.state.news.viktighet}</option>
                        <option value = "1">1</option>
                        <option value = "2">2</option>
                    </select>
                </div>

                <button 
                    className = "btn btn-success"
                    onClick = { () => history.push("/home")} 
                    type = "submit">
                    Submit Change
                </button>
                
                <button 
                    className = "btn btn-danger ml-2"
                    onClick = { () => history.push("/removeArticle")}
                >
                    Cancel
                </button>
            </form>
        )
    }
}