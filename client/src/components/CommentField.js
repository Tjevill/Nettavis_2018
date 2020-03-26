

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, ConvertTime, ShowTime } from '../widgets';
import createHashHistory from 'history/createHashHistory';
import axios from 'axios';
const history = createHashHistory();



export class CommentField extends React.Component<{ id: number }>{

    constructor(){
        super()
        this.state = {
            comments: []
        }
    }

    componentDidMount(){
        axios.get("/getComments/"+this.props.id).then(res=>{
            this.setState({comments: res.data});
        });
    }

    render(){

        const com = this.state.comments.map((r,i)=>{
            return(
                <div className = "border border-dark rounded pr-2 pl-2 mt-4 mb-4 bg-light w-25" key={i}>
                    <ShowTime classname = "mt-2 card-subtitle text-muted" time = {r.date}/>
                    <p className = "font-weight-bold"><i className = "fa fa-user"/> {r.username}</p>
                    <i className = "fa fa-comment"/>
                    <p>{r.comment} </p>
                </div>
            )
        })

        return(

            <div>
                <form className = "border-bottom border-top mt-5 mb-5">
                    <div className = "form-group">
                        <h3>Leave a comment below</h3>
                        <label htmlFor = "username">Your name</label>
                        <input
                            type = "text"
                            className = "form-control"
                            id = "username"
                            placeholder = "Enter username here"
                            onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>(this.username = event.target.value)}
                        >
                        </input>
                    </div>

                    <div className = "form-group">
                        <label htmlFor = "comment">Comment</label>
                        <textarea
                            className = "form-control"
                            placeholder = "Write comment here"
                            id = "comment"
                            rows = "2"
                            onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>(this.comment = event.target.value)}
                        >
                        </textarea>
                    </div>
                    <button
                        className = "btn btn-primary mb-2 w-100"
                        onClick = { () => {
                            this.save();
                            document.getElementById("username").value = "";
                            document.getElementById("comment").value = "";
                            } }
                    >Submit
                    </button>
                </form>

                <div>
                    {com}
                </div>
            </div>
        )
    }

    save(){

        let data = {"id":this.props.id, "username":this.username, "comment":this.comment};
        
        axios.post("/createComment",data).then(()=>{
            axios.get("/getComments/"+this.props.id).then(res=>{
                this.setState({comments: res.data});
            });
        })      
        

    }
}