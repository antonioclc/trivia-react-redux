import React from 'react';
import { Route, Switch } from 'react-router';
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
    </Switch>
  );
}
