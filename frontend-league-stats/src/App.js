import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";

import * as Components from "./components/ExportComponents";
import "./App.scss";

const { ChampionRotation, Leaderboard, Summoner } = Components;

function App() {
  return (
    <>
      <div className="league-stats-background" />
      {/* Top nav */}
      <div className="league-stats-navbar-top">
        <nav>
          <NavLink to="/" className="league-stats-navbar-site-logo">
            <img
              src={"https://13123123123123123123asertetaw4545taw5.com/doge.jpg"}
              alt="Logo"
            />
          </NavLink>
          <NavLink to="/" className="league-stats-navbar-site-name">
            <h1>League Stats</h1>
          </NavLink>
        </nav>
      </div>
      <div className="league-stats-container">
        <div className="league-stats-navbar-side">
          <nav>
            <NavLink
              className="league-stats-navbar-side-item"
              activeClassName="league-stats-navbar-side-item-active"
              exact
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className="league-stats-navbar-side-item"
              activeClassName="league-stats-navbar-side-item-active"
              to="/champion-rotation"
            >
              Champion Rotation
            </NavLink>
            <NavLink
              className="league-stats-navbar-side-item"
              activeClassName="league-stats-navbar-side-item-active"
              to="/leaderboard"
            >
              Leaderboard
            </NavLink>
          </nav>
          <div className="league-stats-navbar-side-social">
            <a
              href="https://github.com/lullofthesea"
              rel="noreferrer"
              target="_blank"
            >
              <span
                className="iconify"
                data-icon="fa-brands:github-square"
                data-inline="false"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/seamus-le-4355041aa/"
              rel="noreferrer"
              target="_blank"
            >
              <span
                className="iconify"
                data-icon="brandico:linkedin-rect"
                data-inline="false"
              />
            </a>
          </div>
          <div className="league-stats-navbar-side-footer">
            League Stats isn’t endorsed by Riot Games and doesn’t reflect the
            views or opinions of Riot Games or anyone officially involved in
            producing or managing League of Legends. League of Legends and Riot
            Games are trademarks or registered trademarks of Riot Games, Inc.
            League of Legends © Riot Games, Inc.
          </div>
        </div>
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
}

export default App;
