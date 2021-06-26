import React, { useEffect, useState } from "react";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Route, Switch } from "react-router-dom";
import { DefaultToast, ToastProvider } from "react-toast-notifications";

import * as Components from "./components/ExportComponents";
import "./App.scss";

const {
  ChampionRotation,
  Home,
  Leaderboard,
  Navbar,
  Search,
  Sidebar,
  Summoner,
} = Components;

const CustomToast = ({ children, ...props }) => (
  <div className="league-stats-toast">
    <DefaultToast {...props}>{children}</DefaultToast>
  </div>
);

const App = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [shouldDisplaySidebar, setShouldDisplaySidebar] = useState(null);
  const [statusBarHeight, setStatusBarHeight] = useState(getStatusBarHeight());

  useEffect(() => {
    window.addEventListener("resize", () => setScreenSize(window.innerWidth));
    if (getStatusBarHeight() !== statusBarHeight)
      setStatusBarHeight(getStatusBarHeight());

    if (screenSize !== null && screenSize > 480) setShouldDisplaySidebar(null);
    return () =>
      window.removeEventListener("resize", () =>
        setScreenSize(window.innerWidth)
      );
  }, [
    screenSize,
    setScreenSize,
    shouldDisplaySidebar,
    setShouldDisplaySidebar,
    statusBarHeight,
    setStatusBarHeight,
  ]);

  return (
    <ToastProvider
      autoDismissTimeout={2500}
      components={{ Toast: CustomToast }}
      placement="bottom-center"
    >
      {/* Top nav */}
      <Navbar
        screenSize={screenSize}
        shouldDisplaySidebar={shouldDisplaySidebar}
        setShouldDisplaySidebar={setShouldDisplaySidebar}
      />
      <div className="league-stats-background" />
      <div className="league-stats-container">
        {/* Side nav */}
        <Sidebar
          screenSize={screenSize}
          shouldDisplaySidebar={shouldDisplaySidebar}
          setShouldDisplaySidebar={setShouldDisplaySidebar}
          statusBarHeight={statusBarHeight}
        />

        {/* Page content */}
        {shouldDisplaySidebar ? null : (
          <div
            className="league-stats-page"
            style={{ marginBottom: statusBarHeight }}
          >
            <Switch>
              <Route
                exact
                path="/champion-rotation"
                component={ChampionRotation}
              />
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/leaderboard"
                render={() => <Leaderboard screenSize={screenSize} />}
              />
              <Route
                exact
                path="/summoner/:summonerName"
                component={Summoner}
              />
              <Route
                exact
                path="/search"
                render={() => <Search screenSize={screenSize} />}
              />
            </Switch>
          </div>
        )}
      </div>
    </ToastProvider>
  );
};

export default App;
