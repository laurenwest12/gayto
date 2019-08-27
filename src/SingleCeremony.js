import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCeremonyThunk } from './store';

const shuffle = array => {
  const copy = array.slice();
  return copy.sort(() => Math.random() - 0.5);
};

class SingleCeremony extends Component {
  constructor() {
    super();
    this.state = {
      number: null,
      pairs: [],
      beams: null,
      cast: [],
      currentPair: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { number } = this.props.match.params;
      const { cast } = this.props;
      const shuffled = shuffle(this.props.cast);
      const current = shuffled[0];

      this.setState({
        number,
        cast,
        currentPair: [current]
      });
    }
  }

  handleChange = ({ target }, member) => {
    this.setState({ currentPair: [this.state.currentPair[0], member] });
  };

  handleSubmit = evt => {
    evt.preventDefault();
  };

  render() {
    const { cast } = this.props;
    console.log(this.state.currentPair);
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <label>
            {this.state.currentPair.length && this.state.currentPair[0].name}
          </label>
          <label>
            {this.state.currentPair[1] && this.state.currentPair[1].name}
          </label>
          <ul>
            {cast.map(member => (
              <li
                key={member.key}
                onClick={e => this.handleChange(e, member)}
                member={member}
                value={member.id}
              >
                {member.name}
              </li>
            ))}
          </ul>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cast: state.cast
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCeremony: number => dispatch(getCeremonyThunk(number))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCeremony);
