import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";

import { getSummoner } from "../redux/summoner";

let summonerNameState;

const Summoner = (props) => {
  const { summoner, getSummoner } = props;
  const { summonerName } = useParams();

  useEffect(() => {
    if (Object.keys(summoner).length === 0 && summonerName)
      getSummoner(summonerName);
    summonerNameState = summonerName;
  }, [summoner, summonerName, getSummoner]);

  console.log(summoner);

  return <></>;
};

const mapStateToProps = (state) => {
  const stateToReturn = { ...state };
  if (state.summoner[summonerNameState])
    stateToReturn.summoner = state.summoner[summonerNameState];

  return stateToReturn;
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSummoner: (summonerName) => dispatch(getSummoner(summonerName)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Summoner)
);
