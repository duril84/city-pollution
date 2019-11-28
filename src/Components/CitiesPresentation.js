import React from 'react';
import Button from './Button';
import Loader from 'react-loader-spinner'

import List from './List';
import '../Styles/_cities.scss';

const CitiesPresentation = props => {
  const { cities, isLoaded } = props;
  return (
    <div className="cities">
      <h1 className="title">{`Top 10 most polluted cities in 2019`}</h1>
      { isLoaded ?
        <List data={cities} /> : 
        (
          <div className="loader">
            <Loader
              type="TailSpin"
              color="#4C69A2"
              height={100}
              width={100}
              timeout={0}
            />
          </div>
        )}
      <Button name={'Home'} path={'/'} />
    </div>
  )
}

export default CitiesPresentation;