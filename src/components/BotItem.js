import React from 'react';


const BotItem = props => {
  const categories = props.botData.categories;
  const picUrl = "https://bobby-testing.s3.eu-north-1.amazonaws.com/bobbybots/img/";

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
      <div className="starcontainer"><input type="checkbox" className="star" /></div>
    </article>
  );
}

export default BotItem;