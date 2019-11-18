import React, { Component } from 'react';
import Button from './Button';

class Cities extends Component {
  state = {
    cities: [],
    country: '',
    description: '',
  }

  getUnique(arr,comp){
    const unique =  arr.map( e => e[comp] ).map((e,i,final) =>final.indexOf(e) === i && i) 
    .filter((e)=> arr[e]).map(e=>arr[e]);
    return unique
  }

  componentDidMount() {
    
    let countryCode = '';
    let countryName = '';
    const fromSessionStorage = sessionStorage.getItem('appSessionStorage');
    if ( fromSessionStorage !== null ) {
      countryCode = fromSessionStorage.slice( fromSessionStorage.indexOf('[')+1, fromSessionStorage.indexOf(']') );
      countryName = fromSessionStorage.slice( 0, fromSessionStorage.indexOf(',') );
      this.setState({
        country: countryName,
      })
    }
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
            info = '[]'
          }
          this.setState({
            cities: [...this.state.cities, {name: city.name, value: city.value, date: city.date, description: info,}],
          })
      });
  }

  render() { 
    const { cities } = this.state;
    // this.getData();
    return (
      <div>
        <h1 className="title">{`Top 10 most polluted cities in ${this.state.country} in 2019`}</h1>
        { cities.length === 10 ? ( 
            // console.log( cities.sort((a, b) => b.value - a.value) )
            <ol className="list">
              {
              cities.sort((a, b) => b.value - a.value).map( (city) => {
                const date = new Date(city.date); 
                return (
                  <li key={city.name} >
                    <div className="name"> {city.name} </div>
                    <div className="value"> pm2.5 value {city.value} µg/m³ </div>
                    <div className="date"> date of measurement {date.getDate()}/{date.getMonth()+1}/{date.getFullYear()} </div>
                    <div className="description"> {city.description.slice(0,200)+'...'} </div>
                  </li> 
                )
                })}
            </ol>
          ) : (
            `Loading...`
          )
        }
        <Button name={'Home'} path={'/'} selectedCountry={sessionStorage.getItem('appSessionStorage')}/>
        
      </div>
    );
  }
}
 
export default Cities;