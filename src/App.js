import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import AssignMatches from './AssignMatches';

import { getCastThunk } from './store';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getCast();
  }

  render() {
    return (
      <HashRouter>
        <Route exact path="/matches" component={AssignMatches} />
      </HashRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCast: () => dispatch(getCastThunk())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
