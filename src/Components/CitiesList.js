import React from 'react';

const CitiesList = props => {
  const { cities } = props;
  return (
    <ol className="list">
      {
      cities.sort((a, b) => b.value - a.value).map( (city,i) => {
        const { name, value, description, date } = city;
        const d = new Date(date); 
        return (
          <li className="item" key={name} >
            <div className="top">
              <div className="name"> {i+1}. {name} </div>
              <div className='measurement'>
                <div className="value"> pm2.5 value<br />{value} µg/m³ </div>
                <div className="date"> date of measurement<br />{d.getDate()}/{d.getMonth()+1}/{d.getFullYear()} </div>
              </div>
            </div>
            <div className="bottom">
              <div className="description"> {description} </div> 
            </div>
          </li> 
        )
        })}
    </ol>
  );
}
 
export default CitiesList;