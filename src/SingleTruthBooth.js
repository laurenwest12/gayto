import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTruthBoothThunk, postTruthBoothThunk } from './store';
import axios from 'axios';

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

  componentDidMount = async () => {
    const { number } = this.props.match.params;
    const truthBooth = await axios.get(`/api/truthbooths/${number}`);

    this.setState({
      number,
      match: truthBooth.data.match,
      pair1: truthBooth.data.pair1,
      pair2: truthBooth.data.pair2
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
    function randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    const num = randomIntFromInterval(5, 10) * 1000;

    evt.preventDefault();
    const { number, pair1, pair2 } = this.state;

    let match;

    this.state.pair1.matchId === this.state.pair2.id
      ? (match = true)
      : (match = false);
    this.props.postTruthBooth(number, pair1, pair2, match);

    setTimeout(function() {
      window.location.reload();
    }, num);
  };

  render() {
    const { cast } = this.props;

    if (this.state.match === null) {
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

    if (this.state.match !== null) {
      if (this.state.match === true) {
        return (
          <div>
            {this.state.pair1.name}
            {this.state.pair2.name}
            Perfect Match
          </div>
        );
      }
      if (this.state.match === false) {
        return (
          <div>
            {this.state.pair1.name}
            {this.state.pair2.name}
            No Match
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
