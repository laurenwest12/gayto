import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AllTruthBooths extends Component {
  constructor() {
    super();
    this.state = {
      truthBooths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  }

  images = {
    1: 'https://mtv.mtvnimages.com/uri/mgid:file:http:shared:mtv.com/news/wp-content/uploads/2017/01/TB-1486576169.gif?quality=.8&height=281&width=500',
    2: 'https://media2.giphy.com/media/HmuTUdDkiij5K/source.gif',
    3: 'https://i.gifer.com/embedded/download/944K.gif',
    4: 'https://media0.giphy.com/media/zHYvmtXqeg0aQ/source.gif',
    5: 'https://media2.giphy.com/media/Br4qzhVKu4Hn2/source.gif',
    6: 'http://i.imgur.com/lXFgHa4.gif',
    7: 'http://mtv.com/news/wp-content/uploads/rc/2014/03/TruthBooth6.gif',
    8: 'https://imagesmtv-a.akamaihd.net/uri/mgid:file:http:shared:mtv.com/news/wp-content/uploads/2016/12/nomatch-1484166947.gif?quality=.8&height=281&width=500',
    9: 'https://media0.giphy.com/media/64pRf6wTPGTK/source.gif',
    10: 'https://media1.giphy.com/media/LmYgPfLvNz8mQ/200w.webp?cid=790b7611b633541ba40108bd8d036989dcb4f21d51be4a31&rid=200w.webp'
  };
  render() {
    const { truthBooths } = this.state;
    return (
      <div className="container">
        <div className="allMatchUpsList">
          {truthBooths.map(num => (
            <Link to={`/truthbooths/${num}`}>
              <div key={num} className="singleMatchUp">
                <img className="matchUpImage" src={this.images[num]} />
                <br />
                Truth Booth {num}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
