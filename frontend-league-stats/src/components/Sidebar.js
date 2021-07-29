import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({
  screenSize,
  shouldDisplaySidebar,
  setShouldDisplaySidebar,
  statusBarHeight,
}) => {
  const storedDarkMode = localStorage.getItem("DARK_MODE");
  if (!storedDarkMode) localStorage.setItem("DARK_MODE", false);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("DARK_MODE"))
  );
  let dynamicHeight = "calc(100% - 4rem - " + statusBarHeight + "px)";
  console.log(dynamicHeight);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.documentElement.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("DARK_MODE", darkMode);
  }, [darkMode]);

  console.log(statusBarHeight);

  return (
    <div
      className="league-stats-sidebar"
      style={
        (screenSize !== null && screenSize > 480) || shouldDisplaySidebar
          ? { height: dynamicHeight, overflow: "hidden" }
          : { visibility: "hidden", opacity: 0 }
      }
    >
      <nav className="league-stats-sidebar-nav">
        <NavLink
          className="league-stats-sidebar-item"
          activeClassName="league-stats-sidebar-item-active"
          exact
          to="/"
          onClick={() => setShouldDisplaySidebar(false)}
        >
          Home
        </NavLink>
        <NavLink
          className="league-stats-sidebar-item"
          activeClassName="league-stats-sidebar-item-active"
          to="/champion-rotation"
          onClick={() => setShouldDisplaySidebar(false)}
        >
          Champion Rotation
        </NavLink>
        <NavLink
          className="league-stats-sidebar-item"
          activeClassName="league-stats-sidebar-item-active"
          to="/leaderboard"
          onClick={() => setShouldDisplaySidebar(false)}
        >
          Leaderboard
        </NavLink>
        <NavLink
          className="league-stats-sidebar-item"
          activeClassName="league-stats-sidebar-item-active"
          to="/search"
          onClick={() => setShouldDisplaySidebar(false)}
        >
          Search
        </NavLink>
        <div className="league-stats-light-switch-container">
          <span
            className="iconify"
            data-icon="bi:sun"
            data-inline="false"
          ></span>
          <label className="league-stats-light-switch">
            <input
              type="checkbox"
              defaultChecked={darkMode}
              onChange={() =>
                darkMode ? setDarkMode(false) : setDarkMode(true)
              }
            />
            <span className="league-stats-light-slider round"></span>
          </label>
          <span
            className="iconify"
            data-icon="akar-icons:moon"
            data-inline="false"
          ></span>
        </div>
      </nav>
      <div className="league-stats-sidebar-social-container">
        <div />
        <div className="league-stats-sidebar-social">
          <a
            href="https://github.com/lullofthesea"
            rel="noreferrer"
            target="_blank"
            className="league-stats-sidebar-social-github"
          >
            <span
              className="iconify"
              data-icon="fa-brands:github-square"
              data-inline="false"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/seamus-le-4355041aa/"
            rel="noreferrer"
            target="_blank"
            className="league-stats-sidebar-social-linkedIn"
          >
            <span
              className="iconify"
              data-icon="brandico:linkedin-rect"
              data-inline="false"
            />
          </a>
        </div>
      </div>
      <div>
        <div className="league-stats-sidebar-footer">
          League Stats isn’t endorsed by Riot Games and doesn’t reflect the
          views or opinions of Riot Games or anyone officially involved in
          producing or managing League of Legends. League of Legends and Riot
          Games are trademarks or registered trademarks of Riot Games, Inc.
          League of Legends © Riot Games, Inc.
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
