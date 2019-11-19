import React, { Component } from 'react';

import Search from './Serch';
import Button from './Button';

import '../Styles/_home.scss';

class Home extends Component {
  state = {
    items: [
      {name: 'Poland', code: 'PL'},
      {name: 'Germany', code: 'DE'},
      {name: 'Spain', code: 'ES'},
      {name: 'France', code: 'FR'},
    ],
    selectedCountry: '',
    selectedCountryCode: '',
  }

  onCountrySelected = (selectedCountry) => {
    const selectedCountryCode = this.state.items.map(item => ( item.name === selectedCountry && ( item.code ) ) ).filter( v => v );
    sessionStorage.setItem('appSessionStorage', selectedCountryCode);
  
    this.setState({
      selectedCountry,
      selectedCountryCode,
    });
  }

  componentDidMount() {
    if ( sessionStorage.getItem('appSessionStorage') !== null ) {
      const selectedCountryCode = sessionStorage.getItem('appSessionStorage');
      const selectedCountry = this.state.items.map(item => ( item.code === selectedCountryCode && ( item.name ) ) ).filter( v => v );
      this.setState({
        selectedCountry,
        selectedCountryCode,
      });
    }
  }

  render() { 
    const { items } = this.state;
    return (
      <div className="home">
         <h1 className="title">City Pollution App</h1>
        <Search onCountrySelected={this.onCountrySelected} suggestions={items} value={this.state.selectedCountry} placeholder={'Country'}/>
        <Button name={'Find Cities'} path={`/cities`} selectedCountryCode={this.state.selectedCountryCode}/>
      </div>
    );
  }
}
 
export default Home;