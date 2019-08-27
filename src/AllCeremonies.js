import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AllCeremonies extends Component {
  constructor() {
    super();
    this.state = {
      matchUps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  }

  render() {
    const { matchUps } = this.state;
    return (
      <div className="container">
        <ul className="allMatchUpsList">
          {matchUps.map(num => (
            <Link to={`/ceremonies/${num}`}>
              <li key={num}>Match Up {num}</li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}
