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
  }

  onCountrySelected = (selectedCountry) => {
    this.setState({
      selectedCountry
    });
  }

  componentDidMount() {
    if ( sessionStorage.getItem('appSessionStorage') !== null ) {
      this.setState({
        selectedCountry: sessionStorage.getItem('appSessionStorage'),
      });
    }
  }

  render() { 
    const { items } = this.state;
    return (
      <div className="home">
         <h1 className="title">City Pollution App</h1>
        <Search onCountrySelected={this.onCountrySelected} suggestions={items} placeholder={this.state.selectedCountry}/>
        <Button name={'Find Cities'} path={`/cities`} selectedCountry={this.state.selectedCountry}/>
      </div>
    );
  }
}
 
export default Home;