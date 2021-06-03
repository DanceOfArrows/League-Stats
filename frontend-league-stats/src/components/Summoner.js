import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { getSummoner } from "../redux/summoner";
import s3baseurl from "../S3URL";
import Loader from "./Loader";

const Summoner = (props) => {
  const { addToast, removeAllToasts } = useToasts();
  const { summoners, getSummoner } = props;
  const { summonerName } = useParams();
  const nameRef = useRef(null);

  useEffect(() => {
    if (!summoners || !summoners[summonerName.toLowerCase()])
      getSummoner(summonerName);
  }, [summoners, summonerName, getSummoner]);

  let summonerInfo = null;
  if (summoners && Object.keys(summoners).length > 0) {
    summonerInfo = summoners[summonerName.toLowerCase()];
    console.log(summonerInfo);
  }

  const handleScroll = (type) => {
    if (type === "reset") {
      nameRef.current.scrollLeft = 0;
    } else {
      nameRef.current.scrollLeft = nameRef.current.scrollLeftMax;
    }
  };

  /* https://stackoverflow.com/questions/56704138/i-want-to-create-a-copy-to-clipboard-using-react-js */
  const copyToClipboard = () => {
    removeAllToasts();
    const el = document.createElement("textarea");
    el.value = summonerInfo.name;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);

    addToast("Copied to clipboard!", {
      appearance: "info",
      autoDismiss: true,
    });
  };

  return (
    <>
      <div className="league-stats-summoner page-container">
        {summonerInfo && summonerInfo !== null ? (
          <>
            <div
              className="league-stats-summoner-info-container"
              style={
                summonerInfo.ranks.length > 1
                  ? { height: "45rem" }
                  : { height: "27.5rem" }
              }
            >
              <div className="league-stats-summoner-info-basic-container">
                <div className="league-stats-summoner-info-player">
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
                  <h1
                    className="league-stats-summoner-info-name"
                    onClick={copyToClipboard}
                    onMouseEnter={handleScroll}
                    onMouseLeave={() => handleScroll("reset")}
                    ref={nameRef}
                  >
                    {summonerInfo.name}
                  </h1>
                </div>
                <div></div>
              </div>

              <div className="league-stats-summoner-info-ranks">
                {summonerInfo.ranks.length > 0
                  ? summonerInfo.ranks
                      .sort((a, b) => {
                        if (a.queueType.includes("FLEX")) return 1;
                        else return -1;
                      })
                      .map((rankObj) => {
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
                        const queueTypeDisplay = queueType.includes("FLEX")
                          ? "Flex"
                          : "Solo / Duo";

                        return (
                          <div
                            className="league-stats-summoner-info-rank-container"
                            key={`league-stats-summoner-info-rank-${summonerInfo.name}-${queueType}`}
                          >
                            <div
                              key={`league-stats-summoner-info-rank-${summonerInfo.name}-${queueType}`}
                              className="league-stats-summoner-info-rank"
                            >
                              <h2 className="league-stats-summoner-info-rank-type">
                                {queueTypeDisplay}
                              </h2>
                              <div className="league-stats-summoner-info-rank-image">
                                <img
                                  src={`${s3baseurl}/rank/${tierName}.png`}
                                  alt="Rank Icon"
                                />
                              </div>
                              <div className="league-stats-summoner-info-rank-tier">
                                {tierName}{" "}
                                {tiersToIgnoreRank.includes(tierName)
                                  ? ""
                                  : `${rank} `}
                                ({leaguePoints} LP)
                              </div>
                              <div className="league-stats-summoner-info-rank-win-ratio">
                                <span style={{ color: "green" }}>W</span>:{" "}
                                {wins} / <span style={{ color: "red" }}>L</span>
                                : {losses} (
                                {(
                                  (wins / (wins + losses)) * 100 +
                                  Number.EPSILON
                                ).toFixed(2)}
                                %)
                              </div>
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
