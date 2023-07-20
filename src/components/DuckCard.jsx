import React from 'react';
import './styles/DuckCard.css';
import { ducks } from '../resources/images';

function DuckCard (props) {
  let { duck }  = props;
  console.log(duck)
  return (
    <div className="duck-card">
      <div className="duck-card__image">
        <img className="duck-card__png" src={ducks[duck.id]} alt="" />
      </div>
      <div className="duck-card__desc">
        <p className="duck-card__name">
          {duck.name}
        </p>
        <p className="duck-card__text">
          {duck.description}
        </p>
      </div>
    </div>
  )
}

export default DuckCard;
