import React, { useEffect } from "react";
import { connect } from "react-redux";

import { getLeaderboard } from "../redux/leaderboard";

const Leaderboard = (props) => {
  const { leaderboard, getLeaderboard } = props;

  useEffect(() => {
    if (!leaderboard) getLeaderboard();
  }, [leaderboard, getLeaderboard]);

  console.log(leaderboard);

  return (
    <>
      <div className="league-stats-test-long-div"></div>
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
