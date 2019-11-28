import React from 'react';
import ListItem from './ListItem';

const List = props => {
  const { data } = props;

  return (
    <ol className="list">
      {
        data.sort((a, b) => b.value - a.value).map( (d,index) => {
          return (
            <li className="item" key={index} >
              <ListItem index={index} data={d}/>
            </li> 
          )
        })
      }
    </ol>
  );
}
 
export default List;