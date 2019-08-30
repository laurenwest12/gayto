import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AllTruthBooths extends Component {
  constructor() {
    super();
    this.state = {
      truthBooths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  }

  render() {
    const { truthBooths } = this.state;
    return (
      <div className="container">
        <ul className="allTruthBoothsList">
          {truthBooths.map(num => (
            <Link to={`/truthbooths/${num}`}>
              <li key={num}>Truth Booth {num}</li>
            </Link>
          ))}
        </ul>
      </div>
    );
  }
}
