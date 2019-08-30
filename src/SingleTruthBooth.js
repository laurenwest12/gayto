import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postTruthBoothThunk } from './store';

class SingleTruthBooth extends Component {
  constructor() {
    super();
    this.state = {
      number: null,
      pair1: null,
      pair2: null
    };
  }

  componentDidMount = () => {
    const { number } = this.props.match.params;
    this.setState({
      number
    });
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
    evt.preventDefault();
    const { number, pair1, pair2 } = this.state;
    let match;
    this.state.pair1.matchId === this.state.pair2.id
      ? (match = true)
      : (match = false);
    this.props.postTruthBooth(number, pair1, pair2, match);
  };

  render() {
    const { cast } = this.props;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <label>{this.state.pair1 && this.state.pair1.name}</label>
          <label>{this.state.pair2 && this.state.pair2.name}</label>
          <ul>
            {cast.length &&
              cast.map(member => (
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
            Lock In
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
    postTruthBooth: (number, pair1, pair2, match) =>
      dispatch(postTruthBoothThunk(number, pair1, pair2, match))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleTruthBooth);
