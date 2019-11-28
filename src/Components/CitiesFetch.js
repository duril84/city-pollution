import React, { Component } from 'react';

import CitiesPresentation from './CitiesPresentation';

import { connect } from 'react-redux';
import { citiesFetched, citiesClear } from '../redux/actions'


class CitiesFetch extends Component {
  getUnique(arr,comp){
    const unique =  arr.map( e => e[comp] ).map((e,i,final) =>final.indexOf(e) === i && i) 
    .filter((e)=> arr[e]).map(e=>arr[e]);
    return unique
  }

  componentDidMount() {
    const countryCode = JSON.parse( sessionStorage.getItem('appSessionStorage') ).code;
    this.props.citiesClear();
    this.getMostPollutedCities(countryCode);
  }
  
  getMostPollutedCities( countryCode ) {
    fetch(`https://api.openaq.org/v1/measurements?country=${countryCode}&date_from=2019-01-01T00:00:00&parameter=pm25&order_by=value&sort=desc&limit=200`)
      .then( res => res.json() )
      .then( json => {
        const cities = json.results.map(city => ({ name: city.city, value: city.value, date: city.date.utc, description: ''}) );
        const uniqueCities = this.getUnique(cities,'name').slice(0,10);
        uniqueCities.map( city => this.getCityDescription(city) );
      })
      .catch(error => {
        throw(error);
      })
  }

  getCityDescription( city ) {
    const apiEndpoint = `https://en.wikipedia.org/w/api.php`;
    const params = `action=query&prop=extracts&exintro&explaintext&format=json&redirects&titles=`+city.name;
    fetch(apiEndpoint + `?` + params + `&origin=*`, {mode: 'cors'})
      .then( res => res.json() )
      .then( res => {
          const pageNum = Object.keys(res.query.pages);
          let info = res.query.pages[pageNum[0]].extract;
          if ( typeof info !== 'string' ) {
            info = 'Sorry, no data was found for this city'
          }
          this.props.citiesFetched( [...this.props.cities, {name: city.name, value: city.value, date: city.date, description: info,}] )
      })
      .catch(error => {
        throw(error);
      });
  }

  render() { 
    const { cities } = this.props;
    const isLoaded = cities.length === 10 ? true : false;
    return (
      <CitiesPresentation  cities={cities} isLoaded={isLoaded} /> 
    );
  }
}

const mapStateToProps = (state) => {
  return { cities: state.cities }
 }
const mapDispatchToProps = { citiesFetched, citiesClear };

export default connect(mapStateToProps, mapDispatchToProps)(CitiesFetch);