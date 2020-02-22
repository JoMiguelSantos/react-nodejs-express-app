import React, { Suspense } from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import "./App.css";

import Searches from "./containers/Searches";

const App = props => {
  const Bookmarks = React.lazy(() => {
    return import("./containers/Bookmarks");
  });

  const Repos = React.lazy(() => {
    return import("./containers/Repos");
  });

  const routes = (
    <Switch>
      <Route path="/" exact component={Searches} />
      <Route path="/repos" component={Repos} />
      <Route path="/bookmarks" component={Bookmarks} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
    </div>
  );
};

export default withRouter(App);
