// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';

/**
 * Renders alert messages using Bootstrap classes.
 */
export class Alert extends Component {
  alerts: { text: React.Node, type: string }[] = [];

  render() {
    return (
      <>
        {this.alerts.map((alert, i) => (
          <div key={i} className={'alert alert-' + alert.type} role="alert">
            {alert.text}
            <button
              className="close"
              onClick={() => {
                this.alerts.splice(i, 1);
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </>
    );
  }

  static success(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ text: text, type: 'success' });
    });
  }

  static info(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ text: text, type: 'info' });
    });
  }

  static warning(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ text: text, type: 'warning' });
    });
  }

  static danger(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ text: text, type: 'danger' });
    });
  }
}

export class ConvertTime extends Component<{ datetime: string }> {
  render() {
    var t = this.props.datetime.split(/[-:T]/);
    let year = t[0];
    let month = t[1];
    var month_string;

    switch (month) {
      case '01':
        month_string = 'january';
        break;
      case '02':
        month_string = 'february';
        break;
      case '03':
        month_string = 'mars';
        break;
      case '04':
        month_string = 'april';
        break;
      case '05':
        month_string = 'may';
        break;
      case '06':
        month_string = 'june';
        break;
      case '07':
        month_string = 'july';
        break;
      case '08':
        month_string = 'august';
        break;
      case '09':
        month_string = 'september';
        break;
      case '10':
        month_string = 'october';
        break;
      case '11':
        month_string = 'november';
        break;
      case '12':
        month_string = 'december';
        break;
      default:
        month_string = '';
    }

    let day = parseInt(t[2]);
    let hour = t[3];
    let minutt = t[4];

    return <p>{day + '. ' + month_string + ', ' + year + ', at ' + hour + ':' + minutt}</p>;
  }

}

export class ShowTime extends Component <{ classname: ? string, time : string, children:React.Node}>{
    
    render(){
      var date = new Date(this.props.time);
      var h = date.toString();

      return(
        <p className={this.props.classname}>{h.slice(0,21)} -  {this.props.children}</p>
      )
    }
  }
