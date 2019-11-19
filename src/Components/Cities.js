import React, { Component } from 'react';
import Button from './Button';
import Loader from 'react-loader-spinner'

import '../Styles/_cities.scss';

class Cities extends Component {
  state = {
    cities: [],
  }

  getUnique(arr,comp){
    const unique =  arr.map( e => e[comp] ).map((e,i,final) =>final.indexOf(e) === i && i) 
    .filter((e)=> arr[e]).map(e=>arr[e]);
    return unique
  }

  componentDidMount() {
    const countryCode = JSON.parse( sessionStorage.getItem('appSessionStorage') ).selectedCountryCode;
    this.getMostPollutedCities(countryCode);
  }
  
  getMostPollutedCities( countryCode ) {
    let cities = [];
    fetch(`https://api.openaq.org/v1/measurements?country=${countryCode}&date_from=2019-01-01T00:00:00&parameter=pm25&order_by=value&sort=desc&limit=200`)
      .then( res => res.json() )
      .then( json => {
        json.results.map(city => cities.push({name: city.city, value: city.value, date: city.date.utc, description: '',}) )
        const uniqueCities = this.getUnique(cities,'name').slice(0,10);
        uniqueCities.map( city => { return ( this.getCityDescription(city)) } );
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
          this.setState({
            cities: [...this.state.cities, {name: city.name, value: city.value, date: city.date, description: info,}],
          })
      })
      .catch(error => {
        throw(error);
      });
  }

  render() { 
    const { cities } = this.state;
    return (
      <div className="cities">
        <h1 className="title">{`Top 10 most polluted cities in 2019`}</h1>
        { cities.length === 10 ? ( 
            <ol className="list">
              {
              cities.sort((a, b) => b.value - a.value).map( (city,i) => {
                const date = new Date(city.date); 
                return (
                  <li className="item" key={city.name} >
                    <div className="top">
                      <div className="name"> {i+1}. {city.name} </div>
                      <div className="value"> pm2.5 value<br />{city.value} µg/m³ </div>
                      <div className="date"> date of measurement<br />{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()} </div>
                    </div>
                    <div className="bottom">
                      <div className="description"> {city.description} </div> 
                      {/* .slice(0,200)+'...' */}
                    </div>
                  </li> 
                )
                })}
            </ol>
          ) : (
            <div className="loader">
              <Loader
                type="TailSpin"
                color="#4C69A2"
                height={100}
                width={100}
                timeout={0} //3 secs
              />
            </div>
          )
        }
        <Button name={'Home'} path={'/'} />
        
      </div>
    );
  }
}
 
export default Cities;