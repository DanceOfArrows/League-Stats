import React, { useState } from "react";
import { withRouter } from "react-router";

import LSLogo from "../images/LS.png";

const Search = ({ history, screenSize }) => {
  const [summonerSearchName, setSummonerSearchName] = useState("");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const summonerName = summonerSearchName;
    if (summonerSearchName.length < 3 || summonerSearchName.length > 16) return;
    setSummonerSearchName("");
    history.push(`/summoner/${summonerName}`);
  };

  return (
    <div
      className="league-stats-search page-container"
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <div
        style={screenSize > 480 ? {} : { height: "7.5rem", width: "7.5rem" }}
      >
        <img
          src={LSLogo}
          alt="Logo"
          style={{ height: "inherit", width: "inherit" }}
        />
      </div>
      <div
        className="league-stats-search-bar"
        style={{
          borderRadius: "4px",
          boxShadow: "1px 1px 4px 0 rgba(0, 0, 0, 0.1)",
          margin: "0 0 12.5rem 2rem",
          position: "relative",
          width: "20rem",
        }}
      >
        <form onSubmit={handleSearchSubmit}>
          <input
            className="league-stats-search-input"
            type="text"
            placeholder="Summoner Name"
            onChange={(e) => setSummonerSearchName(e.target.value)}
            value={summonerSearchName}
            style={{ fontSize: "1.25rem", padding: "1rem 2rem" }}
          />
          <button
            className="league-stats-search-button"
            type="submit"
            style={{ width: "5rem" }}
          >
            <span
              className="iconify"
              data-icon="fluent:people-search-24-regular"
              data-inline="false"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default withRouter(Search);
