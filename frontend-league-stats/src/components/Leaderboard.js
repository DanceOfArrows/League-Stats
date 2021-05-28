import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";

import { getLeaderboard } from "../redux/leaderboard";
import Loader from "./Loader";

const Leaderboard = (props) => {
  const { leaderboard, getLeaderboard } = props;
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!leaderboard) getLeaderboard();
  }, [leaderboard, getLeaderboard]);

  console.log(leaderboard);

  return (
    <>
      <div className="league-stats-leaderboard page-container">
        {leaderboard ? (
          <>
            <div className="league-stats-leaderboard-box">
              <h2 style={{ gridColumn: "1 / 2" }}>#</h2>
              <h2 style={{ gridColumn: "2 / 3" }}>Name</h2>
              <h2 style={{ gridColumn: "3 / 4" }}>LP</h2>
              <h2 style={{ gridColumn: "4 / 5" }}>Wins (Win rate)</h2>
              <div className="league-stats-leaderboard-pagination">
                {" "}
                <ReactPaginate
                  pageCount={30}
                  pageRangeDisplayed={4}
                  marginPagesDisplayed={1}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </div>
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
