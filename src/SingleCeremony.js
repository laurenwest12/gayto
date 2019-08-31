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
        <form onSubmit={this.handleSubmit}>
          <label>{this.state.pair1 && this.state.pair1.name}</label>
          <label>{this.state.pair2 && this.state.pair2.name}</label>
          <ul>
            {this.state.pair1 &&
              remaining.map(
                member =>
                  member.id !== this.state.pair1.id && (
                    <li
                      key={member.key}
                      onClick={e => this.handleChange(e, member)}
                      member={member}
                      value={member.id}
                    >
                      {member.name}
                    </li>
                  )
              )}
          </ul>
          <button type="submit" className="btn btn-primary">
            Lock In
          </button>
        </form>
      );
    }

    if (this.props.pairs.length === 8 && this.state.viewBeams) {
      return (
        <div className="beamsMatchUp">
          {this.props.ceremony.beams}
          <button type="button" onClick={this.viewPairs}>
            View Pairs
          </button>
          <button type="button" onClick={this.viewBeams}>
            View Beams
          </button>
        </div>
      );
    }

    if (this.props.pairs.length === 8 && !this.state.viewBeams) {
      return (
        <div className="finishedMatchUp">
          {this.props.pairs.map(pair => (
            <div className="pair" key={pair.id}>
              <div className="pair1">{pair.pair1.name}</div>
              <div className="pair2">{pair.pair2.name}</div>
            </div>
          ))}

          <button type="button" onClick={this.viewPairs}>
            View Pairs
          </button>
          <button type="button" onClick={this.viewBeams}>
            View Beams
          </button>
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
