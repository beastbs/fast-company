import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import ProfessionProvider from "./hooks/useProfession";
import QualityProvider from "./hooks/useQuality";

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <ProfessionProvider>
          <QualityProvider>
            <Route path="/login/:type?" component={Login} />
            <Route path="/users/:userId?/:edit?" component={Users} />
          </QualityProvider>
        </ProfessionProvider>
        <Redirect to="/" />
      </Switch>
      <ToastContainer />
    </div>
  );
};

export default App;
