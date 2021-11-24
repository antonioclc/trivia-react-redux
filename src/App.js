import React from 'react';
import { Route, Switch } from 'react-router';
import Configurations from './pages/Configurations';
import Login from './pages/Login';
import Trivia from './pages/Trivia';

export default function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={ Login }
      />
      <Route
        path="/trivia"
        component={ Trivia }
      />
      <Route
        path="/configurations"
        component={ Configurations }
      />
    </Switch>
  );
}
