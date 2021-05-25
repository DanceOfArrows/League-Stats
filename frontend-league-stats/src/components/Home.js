import React, { useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { getLeaderboard } from "../redux/leaderboard";

const Home = (props) => {
  const { leaderboard, getLeaderboard } = props;
  const topFivePlayers = leaderboard ? leaderboard.slice(0, 5) : null;

  console.log(topFivePlayers);

  useEffect(() => {
    if (!leaderboard) getLeaderboard();
  }, [leaderboard, getLeaderboard]);

  return (
    <>
      <div className="league-stats-home-container">
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
              duration that they are free.
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
              points (LP), wins, and win rate.
            </div>
          </div>
          <div className="league-stats-home-section-leaderboard-display">
            <h2 style={{ alignSelf: "center" }}>Top 5</h2>
            {topFivePlayers
              ? topFivePlayers.map((player, idx) => (
                  <div
                    key={`league-stats-home-leaderboard-${player.summonerName}`}
                  >
                    <div>{idx + 1}.&thinsp;</div>
                    <NavLink to={`/summoner/${player.summonerName}`}>
                      {player.summonerName}
                    </NavLink>
                  </div>
                ))
              : null}
          </div>
        </div>
        <div className="league-stats-home-section">
          <div className="league-stats-home-section-text">
            <h2>Search</h2>
            <div className="league-stats-home-section-description">
              Used to search for specific stats of a player with the given name.
              Some of these stats include league points, level, win rate, and
              ten most recent matches.
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
