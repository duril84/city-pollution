import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/_button.scss';

class Button extends Component {
  state = {  }

  saveSessionStorage() {
    sessionStorage.setItem('appSessionStorage', this.props.selectedCountry);
  }

  render() { 
    return (
      <Link to={this.props.path}>
        <button className="button" onClick={()=>this.saveSessionStorage()} >{this.props.name}</button>
      </Link>
    );
  }
}
 
export default Button;