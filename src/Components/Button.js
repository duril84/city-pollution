import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/_button.scss';

const Button = props => {
  const { path, name } = props;
  if (  sessionStorage.getItem('appSessionStorage') === null  || !JSON.parse( sessionStorage.getItem('appSessionStorage') ).selectedCountryCode ) {
    return (
      <div className="button disabled" >
        {name}
      </div>
    );
  } else {
    return (
      <Link to={path} className="button">
        {name}
      </Link>
    );
  }
}
 
export default Button;