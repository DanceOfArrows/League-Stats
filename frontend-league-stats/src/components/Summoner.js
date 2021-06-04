import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import TimeAgo from "react-timeago";

import { getSummoner } from "../redux/summoner";
import s3baseurl from "../S3URL";
import Loader from "./Loader";

const Summoner = (props) => {
  const { addToast, removeAllToasts } = useToasts();
  const { summoners, getSummoner } = props;
  const { summonerName } = useParams();
  const nameRef = useRef(null);
  let summonerInfo =
    summoners && Object.keys(summoners).length > 0
      ? summoners[summonerName.toLowerCase()]
      : null;

  useEffect(() => {
    if (!summoners || !summoners[summonerName.toLowerCase()])
      getSummoner(summonerName);
  }, [summoners, summonerName, getSummoner]);

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
                              <span style={{ color: "green" }}>W</span>: {wins}{" "}
                              / <span style={{ color: "red" }}>L</span>:{" "}
                              {losses} (
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
            <div className="league-stats-summoner-matches">
              {summonerInfo.matches.map((match) => {
                const {
                  description,
                  didWin,
                  gameDuration,
                  map,
                  matchParticipantInfo,
                  timestamp,
                } = match;

                const currentParticipant = matchParticipantInfo.find(
                  (ele) => ele.summonerName === summonerInfo.name
                );
                const {
                  bannedChamp,
                  champion,
                  spell1,
                  spell2,
                  stats,
                  summonerName,
                } = currentParticipant;
                const {
                  kills,
                  deaths,
                  assists,
                  neutralMinionsKilled,
                  totalMinionsKilled,
                  item0,
                  item1,
                  item2,
                  item3,
                  item4,
                  item5,
                  item6,
                } = stats;
                const itemArr = [
                  item0,
                  item1,
                  item2,
                  item3,
                  item4,
                  item5,
                  item6,
                ];
                console.log(currentParticipant);

                const matchType = {
                  "5v5 ARAM": "ARAM",
                  "5v5 Blind Pick": "Normal (Blind)",
                  "5v5 Draft Pick": "Normal (Draft)",
                  "5v5 Ranked Solo": "Ranked (Solo)",
                  "5v5 Ranked Flex": "Ranked (Flex)",
                };

                const durationHHMMSS = (time) => {
                  const sec_num = parseInt(time, 10);
                  const hours =
                    Math.floor(sec_num / 3600) < 10
                      ? `0${Math.floor(sec_num / 3600)}`
                      : Math.floor(sec_num / 3600);
                  const minutes =
                    Math.floor((sec_num - hours * 3600) / 60) < 10
                      ? `0${Math.floor((sec_num - hours * 3600) / 60)}`
                      : Math.floor((sec_num - hours * 3600) / 60);
                  const seconds =
                    sec_num - hours * 3600 - minutes * 60 < 10
                      ? `0${sec_num - hours * 3600 - minutes * 60}`
                      : sec_num - hours * 3600 - minutes * 60;
                  return hours < 1
                    ? minutes + ":" + seconds
                    : hours + ":" + minutes + ":" + seconds;
                };

                return (
                  <div
                    key={`league-stats-match-${summonerInfo.name}-${timestamp}`}
                    className="league-stats-summoner-match"
                  >
                    <div className="league-stats-summoner-match-data">
                      <div>
                        {matchType[description]
                          ? matchType[description]
                          : description}{" "}
                      </div>
                      <div>{map}</div>
                      <TimeAgo date={timestamp} />
                      <div>
                        {didWin ? "Win" : "Loss"} {durationHHMMSS(gameDuration)}
                      </div>
                    </div>
                    <div className="league-stats-summoner-match-summoner">
                      <div className="league-stats-summoner-match-champion">
                        <img
                          src={`${s3baseurl}/champion/${champion.championName}.png`}
                          alt={`league-stats-${summonerName}-match-${timestamp}-champion-${champion.championName}`}
                        />
                      </div>
                      <div className="league-stats-summoner-match-spells">
                        <img
                          src={`${s3baseurl}/summonerspell/${spell1}.png`}
                          alt={`league-stats-${summonerName}-match-${timestamp}-displaySum-${spell1}`}
                        />
                        <img
                          src={`${s3baseurl}/summonerspell/${spell2}.png`}
                          alt={`league-stats-${summonerName}-match-${timestamp}-displaySum-${spell2}`}
                        />
                      </div>
                    </div>
                    <div className="league-stats-summoner-match-stats">
                      <div>
                        {kills} / {deaths} / {assists}
                      </div>
                      <div>
                        {((kills + assists) / deaths + Number.EPSILON).toFixed(
                          2
                        )}{" "}
                        KDA
                      </div>
                      <div>
                        {totalMinionsKilled} CS (
                        {(
                          (neutralMinionsKilled + totalMinionsKilled) /
                            (gameDuration / 60) +
                          Number.EPSILON
                        ).toFixed(1)}
                        )
                      </div>
                    </div>
                    <div className="league-stats-summoner-match-items">
                      {itemArr.map((item, idx) => {
                        if (item === 0)
                          return (
                            <div
                              key={`league-stats-${summonerName}-match-${timestamp}-item-${idx}`}
                              className="league-stats-summoner-match-no-item"
                            />
                          );
                        else
                          return (
                            <div
                              key={`league-stats-${summonerName}-match-${timestamp}-item-${
                                item + idx
                              }`}
                              className="league-stats-summoner-match-item"
                            >
                              <img
                                src={`${s3baseurl}/item/${item}.png`}
                                alt={`league-stats-${summonerName}-match-${timestamp}-item-${item}`}
                              />
                            </div>
                          );
                      })}
                    </div>
                    <div className="league-stats-summoner-match-participants">
                      {matchParticipantInfo.map((participant) => {
                        const { champion, summonerName } = participant;

                        return (
                          <div
                            key={`league-stats-${summonerName}-match-${timestamp}-summoner-${summonerName}`}
                            className="league-stats-summoner-match-participant"
                          >
                            <div>
                              <img
                                src={`${s3baseurl}/champion/${champion.championName}.png`}
                              />
                            </div>
                            <div>{summonerName}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
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
