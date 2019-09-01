import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getCeremonyThunk,
  getCastThunk,
  postPairsThunk,
  postBeamsThunk,
  getPairsThunk
} from './store';

const shuffle = array => {
  const copy = array.slice();
  return copy.sort(() => Math.random() - 0.5);
};

const findRemaining = (arr1, arr2) => {
  const paired = arr2.reduce((acc, val) => {
    acc.push(val.pair1.id);
    acc.push(val.pair2.id);
    return acc;
  }, []);

  return arr1.filter(item => paired.indexOf(item.id) === -1);
};

class SingleCeremony extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: null,
      pairsLocked: 0,
      pairs: [],
      beams: null,
      pair1: {},
      pair2: {},
      viewBeams: false
    };
  }

  componentDidMount = () => {
    const { number } = this.props.match.params;
    this.props.getPairs(number);
    this.props.getCeremony(number);
    this.setState({
      number
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { number } = this.props.match.params;
      const remaining = findRemaining(this.props.cast, this.props.pairs);
      const shuffled = shuffle(remaining);
      const current = shuffled[0];
      this.setState({
        number,
        pair1: current
      });
      if (this.props.pairs.length === 8) {
        const beams = this.props.pairs.filter(
          pair => pair.pair1.matchId === pair.pair2.id
        );
        this.setState({
          beams: beams.length
        });
        this.props.postBeams(number, this.state);
      }
    }
  }

  handleChange = ({ target }, member) => {
    this.setState({ pair2: member });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.postPair(this.state.number, this.state);
    window.location.reload();
  };

  viewPairs = () => {
    this.setState({
      viewBeams: false
    });
  };

  viewBeams = () => {
    this.setState({
      viewBeams: true
    });
  };

  render() {
    const { cast, pairs } = this.props;
    const remaining = findRemaining(cast, pairs);

    if (this.props.pairs.length !== 8) {
      return (
        <div className="container">
          <div className="matchUpContainer">
            <form onSubmit={this.handleSubmit}>
              <div className="matchUpPair">
                <div className="singlePair">
                  <img
                    className="pairImage"
                    src={this.state.pair1 && this.state.pair1.imgUrl}
                  />
                  <hr />
                  <label>{this.state.pair1 && this.state.pair1.name}</label>
                </div>
                <div className="singlePair">
                  {this.state.pair2.id && (
                    <img className="pairImage" src={this.state.pair2.imgUrl} />
                  )}
                  <hr />
                  <label>{this.state.pair2 && this.state.pair2.name}</label>
                </div>
              </div>

              <div className="button-container">
                <button type="submit" className="lockedInButton">
                  lock in
                </button>
              </div>

              <div className="remainingContainer">
                {this.state.pair1 &&
                  remaining.map(
                    member =>
                      member.id !== this.state.pair1.id && (
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
                      )
                  )}
              </div>
            </form>
          </div>
        </div>
      );
    }

    if (this.props.pairs.length === 8 && this.state.viewBeams) {
      return (
        <div className="container">
          <div className="beamsMatchUp">
            {this.props.ceremony.beams}
            <div className="matchup-buttons">
              <button
                type="button"
                onClick={this.viewPairs}
                className="lockedInButton"
              >
                View Pairs
              </button>
            </div>

            <div className="matchup-buttons">
              <button
                type="button"
                onClick={this.viewBeams}
                className="lockedInButton"
              >
                View Beams
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (this.props.pairs.length === 8 && !this.state.viewBeams) {
      return (
        <div className="container">
          <div className="finishedMatchUp">
            {this.props.pairs.map(pair => (
              <div className="remainingPair" key={pair.id}>
                <div className="remainingMember">
                  <img src={pair.pair1.imgUrl} className="remainingImage" />
                  <hr />
                  {pair.pair1.name}
                </div>

                <div className="remainingMember">
                  <img src={pair.pair2.imgUrl} className="remainingImage" />
                  <hr />
                  {pair.pair2.name}
                </div>
              </div>
            ))}

            <div className="matchup-buttons">
              <button
                type="button"
                onClick={this.viewPairs}
                className="lockedInButton"
              >
                View Pairs
              </button>
            </div>

            <div className="matchup-buttons">
              <button
                type="button"
                onClick={this.viewBeams}
                className="lockedInButton"
              >
                View Beams
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    cast: state.cast,
    remaning: findRemaining(state.cast, state.pairs),
    pairs: state.pairs,
    beams: state.beams,
    ceremony: state.ceremony
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCeremony: number => dispatch(getCeremonyThunk(number)),
    getCast: () => dispatch(getCastThunk()),
    getPairs: number => dispatch(getPairsThunk(number)),
    postPair: (number, pair) => dispatch(postPairsThunk(number, pair)),
    postBeams: (number, beams) => dispatch(postBeamsThunk(number, beams))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCeremony);
