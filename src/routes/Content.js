import React, { Suspense } from "react";
import Loader from "react-loader-spinner";
import { Redirect } from "react-router-dom";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import routes from "./Routes";
const loading = (
  <div
    className="py-5 text-center d-flex align-items-center justify-content-center"
    style={{ height: "100vh" }}
  >
    <Loader type="TailSpin" color="#00BFFF" height={100} width={100} />
  </div>
);
const Content = () => {
  return (
    <React.Fragment>
      <Suspense fallback={loading}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => <route.component {...props} />}
                />
              )
            );
          })}
          <Route path="*" render={() => <Redirect to="/404" />} />
        </Switch>
      </Suspense>
    </React.Fragment>
  );
};

export default React.memo(Content);
