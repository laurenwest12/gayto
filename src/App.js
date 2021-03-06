import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './Nav';
import AssignMatches from './AssignMatches';
import AllCeremonies from './AllCeremonies';
import SingleCeremony from './SingleCeremony';
import AllTruthBooths from './AllTruthBooths';
import SingleTruthBooth from './SingleTruthBooth';

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
        <Route
          render={({ location, history }) => (
            <Nav history={history} location={location} />
          )}
        />
        <Route exact path="/matches" component={AssignMatches} />
        <Route exact path="/ceremonies" component={AllCeremonies} />
        <Route exact path="/ceremonies/:number" component={SingleCeremony} />
        <Route exact path="/truthbooths" component={AllTruthBooths} />
        <Route exact path="/truthbooths/:number" component={SingleTruthBooth} />
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
