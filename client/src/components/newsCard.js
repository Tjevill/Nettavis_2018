// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { ConvertTime, ShowTime} from "../widgets.js";

export class NewsCard extends Component < {
        src: React.Node,
        headline: React.Node,
        date: React.Node,
        content: React.Node,
        id: React.Node  } > {

    render(){
        return(
            <div 
                className="col-md-4 mb-2 mt-4 "
            >
                <div className= "card"  >

                    <img className="card-img-top " src={this.props.src} alt="Image could not be found"></img>
                        <div className="card-body ">
                            <h5 className="card-title">{this.props.headline}</h5>
                            <h6 className = "card-subtitle text-muted">Published: <ConvertTime datetime = {this.props.date}/></h6>
                            <p className="card-text">{this.props.content}</p>
                            <a href= {"#/readArticle/"+this.props.id} className="btn ">Read more...</a>
                        </div>
                </div>
            </div>
        )
    }
}

