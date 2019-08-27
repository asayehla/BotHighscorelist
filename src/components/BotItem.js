import React from 'react';

const picUrl = "https://bobby-testing.s3.eu-north-1.amazonaws.com/bobbybots/img/";

const BotItem = props => {

    return (
      <article className="BotItem">
        <div>{props.idx}.</div>
        <div><img src={picUrl + props.botData.image} alt={props.botData.name} className="Botimg" /></div>
        <div><h2>{props.botData.name}</h2></div>
        <div><h2>{props.botData.score}</h2></div>
        <div><input type="checkbox" className="star" /></div>
      </article>
    );
  }

export default BotItem;