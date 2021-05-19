import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";

import { getSummoner } from "../redux/summoner";

const Summoner = (props) => {
  const { summoners, getSummoner } = props;
  const { summonerName } = useParams();

  useEffect(() => {
    if (!summoners || !summoners[summonerName.toLowerCase()])
      getSummoner(summonerName);
  }, [summoners, summonerName, getSummoner]);

  if (summoners) {
    console.log(summoners[summonerName.toLowerCase()]);
  }

  return <div>Hi</div>;
};

const mapStateToProps = (state) => {
  return {
    summoners: state.summoner.summoners,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSummoner: (summonerName) => dispatch(getSummoner(summonerName)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Summoner)
);
