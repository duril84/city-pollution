import React, {useState}  from 'react';

const ListItem = props => {
  const [toggle, setToggle] = useState(false);

  const toggleDescription = e => {
    setToggle(!toggle);
  }

  const index = props.index;
  const { name, value, description, date } = props.data;
  const d = new Date(date); 
  
  return (
    <>
      <div className="top" onClick={e=>toggleDescription(e)}>
        <div className="name"> {index+1}. {name} </div>
        <div className='measurement'>
          <div className="value"> pm2.5 value<br />{value} µg/m³ </div>
          <div className="date"> date of measurement<br />{d.getDate()}/{d.getMonth()+1}/{d.getFullYear()} </div>
        </div>
      </div>
      <div className={ toggle ? 'bottom' : 'hide'}>
        <div className="description"> {description} </div> 
      </div>
      
    </>
  );
}
 
export default ListItem;