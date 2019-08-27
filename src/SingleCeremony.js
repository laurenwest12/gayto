import React, { Component } from 'react';
import { connect } from 'react-redux';

const shuffle = array => {
  return array.sort(() => Math.random() - 0.5);
};

class SingleCeremony extends Component {
  constructor() {
    super();
    this.state = {
      number: null,
      pairs: [],
      beams: null
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { number } = this.props.match.params;
      this.setState({
        number: number
      });
    }
  }

  handleSubmit = evt => {
    evt.preventDefault();
  };

  render() {
    const { cast } = this.props;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
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
    // updateMatches: cast => dispatch(updateMatchesThunk(cast))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleCeremony);
