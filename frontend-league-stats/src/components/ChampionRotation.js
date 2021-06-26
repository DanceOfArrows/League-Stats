import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { getChampionRotation } from "../redux/championRotation";
import s3baseurl from "../S3URL";
import Loader from "./Loader";

const ChampionRotation = (props) => {
  const { championRotation, getChampionRotation } = props;
  const [displayHelpText, setDisplayHelpText] = useState(false);

  useEffect(() => {
    if (!championRotation) getChampionRotation();
  }, [championRotation, getChampionRotation]);

  return (
    <React.Fragment>
      <div className="league-stats-champion-rotation page-container">
        {championRotation ? (
          <React.Fragment>
            <div className="league-stats-champion-rotation-box">
              {
                /* Sorts champion rotation by display name then map */
                championRotation.freeChampionNames
                  .sort((a, b) => {
                    return a.displayName.localeCompare(b.displayName);
                  })
                  .map((champion) => {
                    const { championName, displayName } = champion;

                    return (
                      <a
                        key={`league-stats-champion-rotation-${championName}`}
                        href={`https://leagueoflegends.fandom.com/wiki/${displayName}/LoL`}
                        rel="noreferrer noopener"
                        target="_blank"
                      >
                        <img
                          src={`${s3baseurl}/champion/${championName}.png`}
                          alt={`${displayName} Icon`}
                        />
                        <p>{displayName}</p>
                      </a>
                    );
                  })
              }
            </div>
            <h1>
              New Player Exclusive (
              <span
                onMouseEnter={() => setDisplayHelpText(true)}
                onMouseLeave={() => setDisplayHelpText(false)}
              >
                ?
              </span>
              )
            </h1>
            <div
              className="league-stats-champion-rotation-helper"
              style={displayHelpText ? { opacity: 1 } : { opacity: 0 }}
            >
              Players level <span>{championRotation.maxNewPlayerLevel}</span>{" "}
              and under are considered new players.
            </div>

            <div className="league-stats-champion-rotation-box">
              {
                /* Sorts champion rotation by display name then map */
                championRotation.freeChampionNamesForNewPlayers
                  .sort((a, b) => {
                    return a.displayName.localeCompare(b.displayName);
                  })
                  .map((champion) => {
                    const { championName, displayName } = champion;

                    return (
                      <a
                        key={`league-stats-champion-rotation-${championName}`}
                        href={`https://leagueoflegends.fandom.com/wiki/${displayName}/LoL`}
                        rel="noreferrer noopener"
                        target="_blank"
                      >
                        <img
                          src={`${s3baseurl}/champion/${championName}.png`}
                          alt={`${displayName} Icon`}
                        />
                        <p>{displayName}</p>
                      </a>
                    );
                  })
              }
            </div>
          </React.Fragment>
        ) : (
          <Loader full="true" size="5rem" />
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    championRotation: state.championRotation.championRotation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getChampionRotation: () => dispatch(getChampionRotation()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChampionRotation);
