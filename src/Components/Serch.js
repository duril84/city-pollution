import React, { Component } from 'react';
import '../Styles/_search.scss';

class Search extends Component {
  state = {
    items: this.props.suggestions,
    value: '',
  }

  componentDidMount() {
    this.setState({
      value: this.props.value,
    })
  }

  onCountrySelected = (e) => {
    if (typeof this.props.onCountrySelected === "function") {
      this.props.onCountrySelected(e.target.value);
    }
    this.setState({
      value: e.target.value,
    })
  }

  render() { 
    const { items, value } = this.state;
    const { placeholder } = this.props;
    return (
      <div className='search'>
        <label>Search cities in </label>
        <input list='suggestions' onChange={e=>this.onCountrySelected(e)} value={value} placeholder={placeholder}/>
        <datalist id='suggestions'>
          { items.map( item => <option key={item.code} value={item.name} /> ) }
        </datalist>
      </div>
    );
  }
}
 
export default Search;