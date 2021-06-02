import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";

import { getSummoner } from "../redux/summoner";
import s3baseurl from "../S3URL";
import Loader from "./Loader";

const Summoner = (props) => {
  const { summoners, getSummoner } = props;
  const { summonerName } = useParams();

  useEffect(() => {
    if (!summoners || !summoners[summonerName.toLowerCase()])
      getSummoner(summonerName);
  }, [summoners, summonerName, getSummoner]);

  let summonerInfo = null;
  if (summoners && Object.keys(summoners).length > 0) {
    summonerInfo = summoners[summonerName.toLowerCase()];
    console.log(summonerInfo);
  }

  return (
    <>
      <div className="league-stats-summoner page-container">
        {summonerInfo && summonerInfo !== null ? (
          <>
            <div className="league-stats-summoner-info-container">
              <div className="league-stats-summoner-info-basic">
                <div className="league-stats-summoner-info-image">
                  <img
                    src={`${s3baseurl}/profileicon/${summonerInfo.profileIconId}.png`}
                    alt="Profile Icon"
                  />
                  <div className="league-stats-summoner-info-level-container">
                    <div className="league-stats-summoner-info-level">
                      {summonerInfo.summonerLevel}
                    </div>
                    <div className="league-stats-summoner-info-level-hex" />
                  </div>
                </div>
                <h1 className="league-stats-summoner-info-name">
                  {summonerInfo.name}
                </h1>
              </div>
              <div className="league-stats-summoner-info-rank-container">
                {summonerInfo.ranks.length > 0
                  ? summonerInfo.ranks.map((rankObj, idx) => {
                      const {
                        leaguePoints,
                        losses,
                        queueType,
                        rank,
                        tier,
                        wins,
                      } = rankObj;
                      const tierName =
                        tier.charAt(0).toUpperCase() +
                        tier.toLowerCase().slice(1);
                      const tiersToIgnoreRank = [
                        "Challenger",
                        "Grandmaster",
                        "Master",
                      ];

                      return (
                        <div
                          key={`league-stats-summoner-info-rank-${summonerInfo.name}-${queueType}`}
                          className="league-stats-summoner-info-rank"
                          style={
                            idx !== 0
                              ? { height: 0, opacity: 0, visibility: "hidden" }
                              : {}
                          }
                        >
                          <div className="league-stats-summoner-info-rank-image">
                            <img
                              src={`${s3baseurl}/rank/${tierName}.png`}
                              alt="Rank Icon"
                            />
                          </div>
                          <div className="league-stats-summoner-info-rank-tier">
                            {tierName}{" "}
                            {tiersToIgnoreRank.includes(tierName) ? "" : rank}(
                            {leaguePoints} LP)
                          </div>
                          <div className="league-stats-summoner-info-rank-win-ratio">
                            <span style={{ color: "green" }}>W</span>: {wins} /{" "}
                            <span style={{ color: "red" }}>L</span>: {losses} (
                            {(
                              (wins / (wins + losses)) * 100 +
                              Number.EPSILON
                            ).toFixed(2)}
                            %)
                          </div>
                        </div>
                      );
                    })
                  : null}
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
