import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCeremonyThunk, getCastThunk, postPairsThunk } from './store';
import axios from 'axios';

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
  constructor() {
    super();
    this.state = {
      number: null,
      pairs: [],
      beams: null,
      pair1: {},
      pair2: {}
    };
  }

  componentDidMount = async () => {
    const pairs = await axios.get(
      `/api/ceremonies/${this.props.match.params.number}/pairs`
    );
    this.setState({ pairs: pairs.data });
  };

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { number } = this.props.match.params;
      const remaining = findRemaining(this.props.cast, this.state.pairs);
      const shuffled = shuffle(remaining);
      const current = shuffled[0];

      this.setState({
        number,
        pair1: current
      });
    }
  }

  handleChange = ({ target }, member) => {
    this.setState({ pair2: member });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.postPair(this.state.number, this.state);
  };

  render() {
    const { cast } = this.props;
    const remaining = findRemaining(cast, this.state.pairs);

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <label>{this.state.pair1 && this.state.pair1.name}</label>
          <label>{this.state.pair2 && this.state.pair2.name}</label>
          <ul>
            {remaining.map(
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
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ cast }) => {
  return {
    cast
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCeremony: number => dispatch(getCeremonyThunk(number)),
    getCast: () => dispatch(getCastThunk()),
    postPair: (number, pair) => dispatch(postPairsThunk(number, pair))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCeremony);
