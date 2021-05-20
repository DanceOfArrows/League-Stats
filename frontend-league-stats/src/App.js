import React, { useEffect, useState } from "react";
import { NavLink, Route, Switch, withRouter } from "react-router-dom";

import * as Components from "./components/ExportComponents";
import "./App.scss";

const { ChampionRotation, Leaderboard, Summoner } = Components;

const App = ({ history }) => {
  const [shouldDisplaySearch, setShouldDisplaySearch] = useState(false);
  const [summonerSearchName, setSummonerSearchName] = useState("");

  const handleClick = (e) => {
    const targetName = e.target.className;
    if (
      typeof targetName === "string" &&
      targetName.includes("league-stats-search")
    )
      return;
    else {
      setShouldDisplaySearch(false);
      setSummonerSearchName("");
      return;
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const summonerName = summonerSearchName;
    if (summonerSearchName.length < 3 || summonerSearchName.length > 16) return;
    setShouldDisplaySearch(false);
    setSummonerSearchName("");
    history.push(`/summoner/${summonerName}`);
  };

  /* Add event listener to close the search box when clicking out */
  useEffect(() => {
    if (shouldDisplaySearch) {
      window.addEventListener("click", handleClick);
    } else {
      window.removeEventListener("click", handleClick);
    }

    return () => {
      window.removeEventListener("click", handleClick);
    };
  });

  return (
    <>
      {/* <div className="league-stats-background" /> */}
      {/* Top nav */}
      <div className="league-stats-navbar-top">
        <nav>
          <NavLink to="/" className="league-stats-navbar-site-logo">
            <img
              src={"https://13123123123123123123asertetaw4545taw5.com/doge.jpg"}
              alt="Logo"
            />
          </NavLink>
          <div className="league-stats-navbar-top-flexbox">
            <NavLink to="/" className="league-stats-navbar-site-name">
              <h1>League Stats</h1>
            </NavLink>
            <div
              className="league-stats-navbar-site-search"
              onClick={() =>
                shouldDisplaySearch
                  ? setShouldDisplaySearch(false)
                  : setShouldDisplaySearch(true)
              }
            >
              <span
                className="iconify"
                data-icon="fluent:search-12-regular"
                data-inline="false"
              />
            </div>
          </div>
        </nav>
      </div>
      <div className="league-stats-container">
        {/* Search bar */}
        {shouldDisplaySearch ? (
          <div className="league-stats-search-bar">
            <form onSubmit={handleSearchSubmit}>
              <input
                className="league-stats-search-input"
                type="text"
                placeholder="Summoner Name"
                onChange={(e) => setSummonerSearchName(e.target.value)}
                value={summonerSearchName}
              />
              <button className="league-stats-search-button" type="submit">
                Search
              </button>
            </form>
          </div>
        ) : null}
        {/* Side nav */}
        <div className="league-stats-navbar-side">
          <nav>
            <div>
              <NavLink
                className="league-stats-navbar-side-item"
                activeClassName="league-stats-navbar-side-item-active"
                exact
                to="/"
              >
                Home
              </NavLink>
            </div>
            <div>
              <NavLink
                className="league-stats-navbar-side-item"
                activeClassName="league-stats-navbar-side-item-active"
                to="/champion-rotation"
              >
                Champion Rotation
              </NavLink>
            </div>
            <div>
              <NavLink
                className="league-stats-navbar-side-item"
                activeClassName="league-stats-navbar-side-item-active"
                to="/leaderboard"
              >
                Leaderboard
              </NavLink>
            </div>
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
};

export default withRouter(App);
