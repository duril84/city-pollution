import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/_button.scss';

class Button extends Component {
  state = {  }
  render() { 
    if (  sessionStorage.getItem('appSessionStorage') === null  || !JSON.parse( sessionStorage.getItem('appSessionStorage') ).selectedCountryCode ) {
      return (
        <button className="button disabled" >{this.props.name}</button>
      );
    } else {
      return (
        <Link to={this.props.path}>
          <button className="button" >{this.props.name}</button>
        </Link>
      );
    }
  }
}
 
export default Button;