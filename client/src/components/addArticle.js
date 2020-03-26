// @ flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, FormGroupArea } from '../widgets';
import createHashHistory from 'history/createHashHistory';
import axios from 'axios';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export class addArticle extends Component{
    
    Headline:string = "";
    Content:string  = "";
    Picture:string  = "";
    Category:string = "";
    Importancy:string  = "";

  
  render() {
    return (
    
    <form >
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Headline: </label>
            <input type="text" 
                className="form-control" 
                id="exampleFormControlInput1" 
                placeholder="Type here"
                required
                onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>(this.Headline = event.target.value)}>
            </input>
      </div>

      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">Content</label>
        <textarea 
            className="form-control" 
            placeholder = "Type here"
            id="exampleFormControlTextarea1"
            required 
            rows="3"
            onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>(this.Content = event.target.value)}>
        </textarea>
      </div>
      
      <div className="form-group">
        <label htmlFor="exampleFormControlInput2">URL for Picture: </label>
        <input 
          type="text"  
          className="form-control" 
          id="exampleFormControlInput2" 
          placeholder="URL"
          onChange={(event: SyntheticInputEvent<HTMLInputElement>)=>(this.Picture = event.target.value)}>
        </input>
      </div>
      
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Category</label>
        <select 
          className="form-control"  
          id="exampleFormControlSelect1"
          required>
          
          <option value= "" selected disabled hidden>Press here</option>
          <option value = "LocalNews">Local News</option>
          <option value = "Sport">Sports</option>
          <option value = "Gossip">Gossip</option>
          <option value = "Culture">Culture</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="exampleFormControlSelect2">Importancy</label>
        <select className="form-control" id="exampleFormControlSelect2">
          <option value="" selected disabled hidden>Press here</option>
          <option value = "1">1</option>
          <option value = "2">2</option>
        </select>
      </div>
      <button 
        className="btn btn-primary" 
        onClick={() => this.save()}>
                  Submit
      </button>
      <button 
        className="btn btn-danger ml-2"
        onClick={() => history.push("#")}>
                  Cancel
      </button>
                  
    </form>
    );
  }
  //Dette skjer når man trykker på "Lag nyhet"
  save(){
    
    this.Category = document.getElementById("exampleFormControlSelect1").value;
    this.Importancy = parseInt(document.getElementById("exampleFormControlSelect2").value);


    //JSON-object som skal sendes med fetchen.
    let data = {"overskrift":this.Headline,"innhold":this.Content,"bilde":this.Picture,"kategori":this.Category,"viktighet":this.Importancy};
    
    let url = "http://localhost:3000/createNews";
    axios.post(url , data);
    
    Alert.success("Article is now in the "+this.Category+" category");
      history.push('/home');
  }
}



