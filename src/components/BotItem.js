import React from 'react';
import {useLocalState} from './hooks';

const BotItem = props => {
  const categories = props.botData.categories;
  const picUrl = "https://bobby-testing.s3.eu-north-1.amazonaws.com/bobbybots/img/";

  
  function toggleFavorite(e) {
    //console.log(e.target);
}

  return (
    <article className="botItem">
      <div className="numbercontainer">{props.idx}.</div>
      <div><img src={picUrl + props.botData.image} alt={props.botData.name} className="botimg" /></div>
      <div><h2>{props.botData.name}</h2>
        <p className="desktopcateg">
          {categories.join(' , ')}
        </p>
      </div>
      <div><h2>{props.botData.score}</h2></div>
      <div className="starcontainer">
        <input type="checkbox" className="star" 
        onChange={toggleFavorite(props.id)} 
        //active={isFavorite} 
         /></div>
    </article>
  );
}

export default BotItem;