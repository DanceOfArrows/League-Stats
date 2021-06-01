import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import { getLeaderboard } from "../redux/leaderboard";
import Loader from "./Loader";

const Leaderboard = (props) => {
  const { leaderboard, getLeaderboard } = props;
  const [page, setPage] = useState(1);
  const rangeToMap = [page * 10 - 10, page * 10 - 1];

  useEffect(() => {
    if (!leaderboard) getLeaderboard();

    const handleArrowPress = (e) => {
      const keyCode = Number.parseInt(e.keyCode, 10);
      if (keyCode !== 37 && keyCode !== 39) return;
      if (keyCode === 37) {
        if (page === 1) return;
        else return setPage(page - 1);
      }
      if (keyCode === 39) {
        if (page === 30) return;
        else return setPage(page + 1);
      }
    };

    window.addEventListener("keydown", handleArrowPress);

    return () => {
      window.removeEventListener("keydown", handleArrowPress);
    };
  }, [leaderboard, getLeaderboard, page]);

  return (
    <>
      <div className="league-stats-leaderboard page-container">
        {leaderboard ? (
          <>
            <div className="league-stats-leaderboard-box">
              <div
                className="league-stats-leaderboard-row"
                // style={{ flexGrow: 0 }}
              >
                <h2>#</h2>
                <h2>Name</h2>
                <h2>LP</h2>
                <h2>Wins (Win Rate)</h2>
              </div>{" "}
              {leaderboard.map((player, idx) => {
                if (idx < rangeToMap[0] || idx > rangeToMap[1]) return null;
                else {
                  const { leaguePoints, losses, summonerName, wins } = player;
                  return (
                    <div
                      key={`league-stats-leaderboard-player-${summonerName}`}
                      className={
                        (idx + 1) % 2 === 0
                          ? "league-stats-leaderboard-row"
                          : "league-stats-leaderboard-row odd"
                      }
                    >
                      <div>{idx + 1}</div>
                      <NavLink
                        to={`/summoner/${summonerName}`}
                        style={{
                          height: "100%",
                          justifySelf: "center",
                          width: "100%",
                        }}
                        className="league-stats-center-text"
                      >
                        {summonerName}
                      </NavLink>
                      <div>{leaguePoints}</div>
                      <div>
                        {wins} (
                        {(
                          (wins / (wins + losses)) * 100 +
                          Number.EPSILON
                        ).toFixed(2)}
                        % )
                      </div>
                    </div>
                  );
                }
              })}
              <ReactPaginate
                pageCount={30}
                pageRangeDisplayed={4}
                marginPagesDisplayed={1}
                containerClassName={"league-stats-leaderboard-pagination"}
                activeClassName={"active"}
                forcePage={page - 1}
                onPageChange={(e) => setPage(e.selected + 1)}
              />
            </div>
          </>
        ) : (
          <Loader full="true" size="5rem" />
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
