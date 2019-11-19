import React, { Component } from 'react';
import '../Styles/_search.scss';

class Search extends Component {
  state = {
    items: this.props.suggestions,
  }

  onCountrySelected = (e) => {
    if (typeof this.props.onCountrySelected === "function") {
      this.props.onCountrySelected(e.target.value);
    }
  }

  render() { 
    const { items } = this.state;
    return (
      <div className='search'>
        <label>Search cities in </label>
        <input list='suggestions' onChange={e=>this.onCountrySelected(e)} value={this.props.value} placeholder={this.props.placeholder}/>
        <datalist id='suggestions'>
          { items.map( item => <option key={item.code} value={`${item.name}`} /> ) }
        </datalist>
      </div>
    );
  }
}
 
export default Search;