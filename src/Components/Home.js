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
    selectedCountry: sessionStorage.getItem('appSessionStorage') ? JSON.parse( sessionStorage.getItem('appSessionStorage') ) : '',
  }

  onCountrySelected = (name) => {
    let code = this.state.items.map(item => ( item.name.toLowerCase() === name.toLowerCase() && ( item.code ) ) ).filter( v => v );
    if ( code.length ) {
      code = code[0];
    } else {
      code = '';
    }
    const selectedCountry = { code, name }
    sessionStorage.setItem('appSessionStorage', JSON.stringify( selectedCountry ) );
    this.setState({
      selectedCountry,
    });
  }

  render() { 
    const { items, selectedCountry } = this.state;
    return (
      <div className="home">
        <h1 className="title">City Pollution App</h1>
        <Search onCountrySelected={this.onCountrySelected} suggestions={items} value={selectedCountry.name} placeholder={'Country'}/>
        <Button name={'Find Cities'} path={`/cities`} />
      </div>
    );
  }
}
 
export default Home;