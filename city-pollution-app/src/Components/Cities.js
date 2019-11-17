import React, { Component } from 'react';
import Button from './Button';

class Cities extends Component {
  state = {
    cities: [],
    country: '',
  }

  getUnique(arr,comp){
    const unique =  arr.map( e => e[comp] ).map((e,i,final) =>final.indexOf(e) === i && i) 
    // eliminate the dead keys & return unique objects
    .filter((e)=> arr[e]).map(e=>arr[e]);
    return unique
  }

  componentDidMount() {
    let cities = [];
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
    
    fetch(`https://api.openaq.org/v1/measurements?country=${countryCode}&date_from=2019-01-01T00:00:00&parameter=pm25&order_by=value&sort=desc&limit=200`)
      .then(res => res.json())
      .then(json => {
        console.log(json.results);
        json.results.map(city => cities.push({name: city.city, value: city.value, date: city.date.utc}) )
        console.log(cities);
        const uniqueCities = this.getUnique(cities,'name').slice(0,10)
        this.setState({
          cities: uniqueCities,
        })
      })
    
      // fetch(`https://api.openaq.org/v1/latest?country=${countryCode}&date_from=2019-01-01T00:00:00&parameter=pm25&order_by=measurements[0].value&sort=desc&limit=200`)
      // .then(res => res.json())
      // .then(json => {
      //   console.log(json.results);
      //   json.results.map(city => cities.push({name: city.city, value: city.measurements[0].value, date: city.measurements[0].lastUpdated}) )
      //   console.log(cities);
      //   const uniqueCities = this.getUnique(cities,'name').slice(0,10)
      //   this.setState({
      //     cities: uniqueCities,
      //   })
      // })


      // fetch("https://api.openaq.org/v1/latest?parameter=pm25&order_by=measurements[0].value&sort=desc&limit=35&date_from=2019-1-1&country=PL")
      //   .then(res => res.json())
      //   .then(json => {
      //     console.log(json.results);
      //     json.results.map(city => cities.push(city.city) )
          
      //     this.setState({
      //       cities,
      //     })
      //   })

      // cities.reduce((unique, item) => unique.includes(item) ? unique : [...unique, item], [])
      cities.map(city => console.log(city))
  }

  render() { 
    const { cities } = this.state;

    return (
      <div>
        <h1 className="title">{`Top 10 most polluted cities in ${this.state.country} in 2019`}</h1>
        <ol className="list">
          {cities.map( (city) => {
            const date = new Date(city.date); 
            return (
              <li key={city.name}>
                {city.name}
                 pm2.5 value {city.value} µg/m³
                 date of measurement {date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}
              </li> 
            )
            })}
        </ol>
        <Button name={'Home'} path={'/'} selectedCountry={sessionStorage.getItem('appSessionStorage')}/>
      </div>
    );
  }
}
 
export default Cities;