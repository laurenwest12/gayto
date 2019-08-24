import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateMatchesThunk } from './store';

class AssignMatches extends Component {
  constructor() {
    super();
    this.state = {
      cast: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({ cast: this.props.cast });
    }
  }

  handleChange = ({ target }) => {
    const cast = this.state.cast.slice();
    cast[target.name].matchId = target.value;
    this.setState({
      cast: cast
    });
  };

  handleSubmit = evt => {
    console.log('submitted');
    evt.preventDefault();
    this.props.updateMatches(this.state.cast);
  };

  render() {
    const { cast } = this.props;
    const matches = this.state.cast;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          {cast &&
            cast.map((member, index) => (
              <div key={member.id}>
                {member.name}

                <div>
                  <label>Match</label>

                  <select
                    className="form-control"
                    onChange={this.handleChange}
                    name={index}
                    index={index}
                  >
                    {matches.length &&
                      matches.map(
                        match =>
                          match.id !== member.id && (
                            <option value={match.id} key={match.name}>
                              {match.name}
                            </option>
                          )
                      )}
                  </select>
                </div>
              </div>
            ))}
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
    updateMatches: cast => dispatch(updateMatchesThunk(cast))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssignMatches);
