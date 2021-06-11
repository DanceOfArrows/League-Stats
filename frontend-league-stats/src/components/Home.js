import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { getLeaderboard } from "../redux/leaderboard";
import Loader from "./Loader";

const Home = (props) => {
  const { leaderboard, getLeaderboard } = props;
  const topFivePlayers = leaderboard ? leaderboard.slice(0, 5) : null;

  useEffect(() => {
    if (!leaderboard) getLeaderboard();
  }, [leaderboard, getLeaderboard]);

  return (
    <>
      <div className="league-stats-home page-container">
        <div className="league-stats-home-section">
          <div className="league-stats-home-section-text">
            <NavLink to="/champion-rotation">
              <h2>
                Champion Rotation <span>&gt;</span>
              </h2>
            </NavLink>
            <div className="league-stats-home-section-description">
              Displays the current champions that are available for everyone to
              play. These champions do not need to be owned or purchased for the
              duration that they are free. Clicking on any of the champion boxes
              will take you to that champion's wiki page.
            </div>
          </div>
        </div>
        <div className="league-stats-home-section">
          <div className="league-stats-home-section-text">
            <NavLink to="/leaderboard">
              <h2>
                Leaderboard <span>&gt;</span>
              </h2>
            </NavLink>
            <div className="league-stats-home-section-description">
              A list of the top 300 players of the game, along with their league
              points (LP), wins, and win rate. Using the left or right arrow key
              will switch the page accordingly (left for previous, right for
              next). Clicking the summoner name box will take you to that
              summoner's page.
            </div>
          </div>
          <div className="league-stats-home-section-leaderboard-display">
            <h2 style={{ alignSelf: "center" }}>Top 5</h2>
            <div className="league-stats-home-section-leaderboard-topFive">
              {topFivePlayers ? (
                topFivePlayers.map((player, idx) => (
                  <div
                    key={`league-stats-home-leaderboard-${player.summonerName}`}
                  >
                    <div>{idx + 1}.&thinsp;</div>
                    <NavLink to={`/summoner/${player.summonerName}`}>
                      {player.summonerName}
                    </NavLink>
                  </div>
                ))
              ) : (
                <Loader size="3rem" />
              )}
            </div>
          </div>
        </div>
        <div
          className="league-stats-home-section"
          style={{ borderBottom: "none", paddingBottom: "0" }}
        >
          <div className="league-stats-home-section-text">
            <h2>Search</h2>
            <div className="league-stats-home-section-description">
              Used to search for specific stats of a player with the given name.
              Some of these stats include (but not limited to) league points,
              level, win rate, and ten most recent matches. Clicking on the
              player's name will copy it to clipboard.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    leaderboard: state.leaderboard.leaderboard,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLeaderboard: () => dispatch(getLeaderboard()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
