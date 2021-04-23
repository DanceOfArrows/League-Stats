import React from 'react';
import { Route, Switch } from 'react-router-dom';

import * as Components from './components/ExportComponents';
import './App.scss';

const {
  ChampionRotation,
  Leaderboard,
  Navbar
} = Components;

function App() {
  return (
    <>
      <div className='league-stats-background' />
      <div className='league-stats-container'>
        <Navbar />
        <div className='league-stats-page'>
          <Switch>
            <Route exact path='/champion-rotation' component={ChampionRotation} />
            <Route exact path='/leaderboard' component={Leaderboard} />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
