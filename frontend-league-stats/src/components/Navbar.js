import React, { useEffect, useState } from "react";
import { NavLink, withRouter } from "react-router-dom";

const Navbar = ({ history }) => {
  const [shouldDisplaySearch, setShouldDisplaySearch] = useState(false);
  const [summonerSearchName, setSummonerSearchName] = useState("");

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

  const handleClick = (e) => {
    const targetName = e.target.className;
    if (typeof targetName === "string" && targetName.includes("search")) return;
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

  return (
    <div className="league-stats-navbar-top">
      <nav>
        <NavLink
          to="/"
          className="league-stats-navbar-site-logo"
          style={{ display: "flex" }}
        >
          <img
            src={process.env.PUBLIC_URL + "/LS.png"}
            alt="Logo"
            style={{ height: "64px", margin: "0 auto", width: "64px" }}
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
            style={
              shouldDisplaySearch ? { right: "11.5rem" } : { right: "1rem" }
            }
          >
            <span
              className="iconify"
              data-icon="fluent:search-12-regular"
              data-inline="false"
            />
          </div>
          {/* Search bar */}
          <div
            className="league-stats-search-bar"
            style={
              shouldDisplaySearch
                ? { opacity: 1, visibility: "visible", width: "10rem" }
                : { opacity: 0, visibility: "hidden", width: "0" }
            }
          >
            <form onSubmit={handleSearchSubmit}>
              <input
                className="league-stats-search-input"
                type="text"
                placeholder="Summoner Name"
                onChange={(e) => setSummonerSearchName(e.target.value)}
                value={summonerSearchName}
              />
              <button className="league-stats-search-button" type="submit">
                <span
                  className="iconify"
                  data-icon="fluent:people-search-24-regular"
                  data-inline="false"
                />
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Navbar);
