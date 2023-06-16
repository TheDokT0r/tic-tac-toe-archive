import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Switch, Link } from "react-router-dom";
import { withRouter } from 'react-router';
import Records from './Records';
import MainPage from './MainPage';
import Lol from './Lol';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage></MainPage>
        </Route>

        <Route exact path="/records">
          <Records></Records>
        </Route>

        <Route exact paht="/rick">
          <Lol></Lol>
        </Route>
      </Switch>
    </Router>

  );
}

export default App;
