import React, { Component } from 'react';

import Search from './Serch';
import Button from './Button';

import '../Styles/_home.scss';

class Home extends Component {
  state = {
    items: [
      {name: 'Poland' , code: 'PL'},
      {name: 'Germany', code: 'DE'},
      {name: 'Spain'  , code: 'ES'},
      {name: 'France' , code: 'FR'},
    ],
    selectedCountry: sessionStorage.getItem('appSessionStorage') ? JSON.parse( sessionStorage.getItem('appSessionStorage') ).selectedCountry : '',
    selectedCountryCode: sessionStorage.getItem('appSessionStorage') ? JSON.parse( sessionStorage.getItem('appSessionStorage') ).selectedCountryCode: '',
  }

  onCountrySelected = (selectedCountry) => {
    let selectedCountryCode = this.state.items.map(item => ( item.name.toLowerCase() === selectedCountry.toLowerCase() && ( item.code ) ) ).filter( v => v );
    if ( selectedCountryCode.length ) {
      selectedCountryCode = selectedCountryCode[0];
    } else {
      selectedCountryCode = '';
    }
    sessionStorage.setItem('appSessionStorage', JSON.stringify( { selectedCountryCode, selectedCountry } ) );
    this.setState({
      selectedCountry,
      selectedCountryCode,
    });
  }

  render() { 
    const { items } = this.state;
    return (
      <div className="home">
         <h1 className="title">City Pollution App</h1>
        <Search onCountrySelected={this.onCountrySelected} suggestions={items} value={this.state.selectedCountry} placeholder={'Country'}/>
        <Button name={'Find Cities'} path={`/cities`} />
      </div>
    );
  }
}
 
export default Home;