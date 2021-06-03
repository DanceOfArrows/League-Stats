import React from "react";
import { Route, Switch } from "react-router-dom";
import { DefaultToast, ToastProvider } from "react-toast-notifications";

import * as Components from "./components/ExportComponents";
import "./App.scss";

const { ChampionRotation, Home, Leaderboard, Navbar, Sidebar, Summoner } =
  Components;

const CustomToast = ({ children, ...props }) => (
  <div className="league-stats-toast">
    <DefaultToast {...props}>{children}</DefaultToast>
  </div>
);

const App = () => {
  return (
    <ToastProvider
      autoDismissTimeout={2500}
      components={{ Toast: CustomToast }}
      placement="bottom-center"
    >
      {/* Top nav */}
      <Navbar />
      <div className="league-stats-background" />
      <div className="league-stats-container">
        {/* Side nav */}
        <Sidebar />
        {/* Page content */}
        <div className="league-stats-page">
          <Switch>
            <Route
              exact
              path="/champion-rotation"
              component={ChampionRotation}
            />
            <Route exact path="/" component={Home} />
            <Route exact path="/leaderboard" component={Leaderboard} />
            <Route exact path="/summoner/:summonerName" component={Summoner} />
          </Switch>
        </div>
      </div>
    </ToastProvider>
  );
};

export default App;
