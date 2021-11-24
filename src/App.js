import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={ Login }
      />
    </Switch>
  );
}
