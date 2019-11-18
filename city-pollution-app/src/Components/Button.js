import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/_button.scss';

class Button extends Component {
  state = {  }

  saveSessionStorage(e) {
    if ( this.props.selectedCountryCode.length < 1 ) {
      console.log('fail',this.props.selectedCountryCode.length);
    }
    sessionStorage.setItem('appSessionStorage', this.props.selectedCountryCode);
    
  }

  render() { 
    if ( this.props.selectedCountryCode.length > 0  ) {
      return (
      
        <Link to={this.props.path}>
          <button className="button" onClick={(e)=>this.saveSessionStorage(e)} >{this.props.name}</button>
        </Link>
      );
    } else {
      return (
        <button className="button disabled" >{this.props.name}</button>
      );
    }
  }
}
 
export default Button;