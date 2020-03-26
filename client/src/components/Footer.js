// @ flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component, sharedComponentData } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { Alert, FormGroupArea } from '../widgets';
import axios from 'axios';


export class Footer extends React.Component{

    render(){
        return( 
            <div className = "row">
                <div className ="jumbotron jumbotron-fluid bg-dark  mt-5 mb-0 mr-0 w-100">
                    <div className ="container">
                        <h1 className ="display-3 text-white"><b>Cåpi rayt Simon liLleenG</b></h1>
                        <p className ="lead text-white"><span className="glyphicon glyphicon-copyright-mark"></span></p>
                    </div>
                </div>
            </div>
        )
    }

}