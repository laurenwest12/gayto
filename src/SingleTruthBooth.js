import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTruthBoothThunk, postTruthBoothThunk } from './store';

class SingleTruthBooth extends Component {
  constructor() {
    super();
    this.state = {
      number: null,
      pair1: null,
      pair2: null,
      match: null
    };
  }

  componentDidMount = () => {
    const { number } = this.props.match.params;
    this.props.getTruthBooth(number);
  };

  componentDidUpdate = prevProps => {
    const { number } = this.props.match.params;
    const { truthBooth } = this.props;

    if (prevProps !== this.props) {
      this.setState({
        number,
        match: truthBooth.match,
        pair1: truthBooth.pair1,
        pair2: truthBooth.pair2
      });
    }
  };

  handleChange = ({ target }, member) => {
    if (this.state.pair1 === null) {
      this.setState({
        pair1: member
      });
    } else {
      this.setState({
        pair2: member
      });
    }
  };

  handleSubmit = evt => {
    //RANDOM NUMBER
    // function randomIntFromInterval(min, max) {
    //   return Math.floor(Math.random() * (max - min + 1) + min);
    // }
    // const num = randomIntFromInterval(5, 10) * 1000;

    evt.preventDefault();
    const { number, pair1, pair2 } = this.state;
    const { postTruthBooth } = this.props;

    let match;

    this.state.pair1.matchId === this.state.pair2.id
      ? (match = true)
      : (match = false);

    setTimeout(function() {
      postTruthBooth(number, pair1, pair2, match);
    }, 7000);
  };

  render() {
    const { cast, truthBooth } = this.props;

    if (this.state.match === null) {
      return (
        <div className="container">
          <div className="matchUpContainer">
            <form onSubmit={this.handleSubmit}>
              <div className="matchUpPair">
                <div className="singlePair">
                  {this.state.pair1 && (
                    <img className="pairImage" src={this.state.pair1.imgUrl} />
                  )}
                  <hr />
                  <label>{this.state.pair1 && this.state.pair1.name}</label>
                </div>

                <div className="singlePair">
                  {this.state.pair2 && (
                    <img className="pairImage" src={this.state.pair2.imgUrl} />
                  )}
                  <hr />
                  <label>{this.state.pair2 && this.state.pair2.name}</label>
                </div>
              </div>

              {this.state.pair2 && (
                <div className="button-container">
                  <button type="submit" className="lockedInButton">
                    lock in
                  </button>
                </div>
              )}

              <label />
              <label />
              <div className="remainingContainer">
                {cast.length &&
                  cast.map(member => (
                    <div
                      key={member.key}
                      onClick={e => this.handleChange(e, member)}
                      member={member}
                      value={member.id}
                      className="remainingMember"
                    >
                      <img src={member.imgUrl} className="remainingImage" />
                      <hr />
                      {member.name}
                    </div>
                  ))}
              </div>
            </form>
          </div>
        </div>
      );
    }

    if (this.state.match !== null) {
      if (truthBooth.match === true) {
        const { pair1, pair2 } = this.state;
        return (
          <div className="matchResultContainer">
            <div className="matchResultImageContainer">
              <img src={pair1.imgUrl} className="matchResultImage" />
              <img src={pair2.imgUrl} className="matchResultImage" />
            </div>
            <div className="matchResult">PERFECT MATCH!</div>
          </div>
        );
      }
      if (truthBooth.match === false) {
        const { pair1, pair2 } = this.state;
        return (
          <div className="matchResultContainer">
            <div className="matchResultImageContainer">
              <img src={pair1.imgUrl} className="matchResultImage" />
              <img src={pair2.imgUrl} className="matchResultImage" />
            </div>
            <div className="noMatchResult">NO MATCH!</div>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    cast: state.cast,
    truthBooth: state.truthBooth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postTruthBooth: (number, pair1, pair2, match) =>
      dispatch(postTruthBoothThunk(number, pair1, pair2, match)),
    getTruthBooth: number => dispatch(getTruthBoothThunk(number))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleTruthBooth);
