// @ flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, ShowTime } from '../widgets';
import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student
import axios from 'axios';
import { ConvertTime} from "../widgets.js";

let url = "/getNews";

export class removeArticle extends Component{
    
    constructor(){
        super()
        this.state={
            resources:[]
        }
    }

    componentDidMount(){
        axios.get("http://localhost:3000/getNews").then(res =>{
          this.setState({resources: res.data});
        })
    }

    render(){
    const resArr = this.state.resources.map((r,i)=>{
      return (
        <tr key={i}>
          <td>{r.overskrift}</td>
          <td><ShowTime time={r.tidspunkt}/></td>
          <td>{r.kategori}</td>
          <td><a href={"#/editArticle/"+r.id}><button  className = "btn btn-primary ">Edit</button></a></td>
          <td><button onClick={() => this.delete(r.id)} id={r.id} className = "btn btn-danger">Delete</button></td>
        </tr>
      )
    })
    return(
      <div>
        <table className = "table mt-2">
          <thead>
            <tr>
              <th scope = "col">Headline</th>
              <th scope = "col">Published</th>
              <th scope = "col">Category</th>
            </tr>
          </thead>
          <tbody>
            {resArr} 
          </tbody>
        </table>
      </div>
    )
  }

    delete(id:number){
        
        var txt;
        var r = confirm("Are you sure you want to delete this article?");
        if(r == true){
          let url = "/deleteNews/"+id;
        axios.delete(url)
        history.push('/home');
        Alert.success("Successfully deleted article");
        }else{
          Alert.danger("Article was not deleted")
          history.push('/home');
        }
    }
}