// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { NewsFeed } from "./newsFeed.js";


export class Navbar extends Component {

  render() {

    return (

        <div className = "fixed-top">

            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">Tidenes Tider</a>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#navbarSupportedContent" 
                        aria-controls="navbarSupportedContent" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#/category/LocalNews">Local</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href = "#/category/Gossip">Gossip</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#/category/Sport">Sport</a>
                        </li>
                        <li className="nav-item">
                            <a className = "nav-link text-white" href="#/category/Culture">Culture</a>
                        </li>
                        <li className="nav-item ">
                            <a 
                                className="nav-link text-white" 
                                href="#/addArticle">
                                Add Article
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white" href="#/removeArticle">Remove / Edit Article</a>
                        </li>
                    </ul>
                </div>
            </nav>
            <NewsFeed/>    
        </div>
    );
  }
}

export default Navbar;