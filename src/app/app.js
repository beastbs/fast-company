import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoute from "./components/common/protectedRoute";

import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";

import ProfessionProvider from "./hooks/useProfession";
import QualityProvider from "./hooks/useQuality";
import AuthProvider from "./hooks/useAuth";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <NavBar />

        <QualityProvider>
          <ProfessionProvider>
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/login/:type?" component={Login} />
              <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
              {/* <ProtectedRoute>
                <Route to="/users/:userId?/:edit?" component={Users} />
              </ProtectedRoute> */}
              <Redirect to="/" />
            </Switch>
          </ProfessionProvider>
        </QualityProvider>
      </AuthProvider>

      <ToastContainer />
    </div>
  );
};

export default App;
