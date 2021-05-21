import React from "react";
import { Route, Switch } from "react-router-dom";

import * as Components from "./components/ExportComponents";
import "./App.scss";

const { ChampionRotation, Leaderboard, Navbar, Sidebar, Summoner } = Components;

const App = () => {
  return (
    <>
      {/* Top nav */}
      <Navbar />
      <div className="league-stats-container">
        {/* Side nav */}
        <Sidebar />
        {/* Page content */}
        <div className="league-stats-page">
          <Switch>
            <Route
              exact
              path="/champion-rotation"
              component={ChampionRotation}
            />
            <Route exact path="/leaderboard" component={Leaderboard} />
            <Route exact path="/summoner/:summonerName" component={Summoner} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default App;
