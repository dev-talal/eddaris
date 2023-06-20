import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { BoxArrowLeft } from "react-bootstrap-icons";
import keys from "../constant/keys";
import { Content } from "../views/index";
import SideBar from "../views/user/components/Sidebar";
import Container from "react-bootstrap/Container";
import TopBar from "../views/Widgets/TopBar";
const Layout = () => {
  const [getValue, setClickValue] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const authToken = localStorage.getItem(keys.Preference.ACCESS_TOKEN);
  const authProfile = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (
      !localStorage.getItem(keys.Preference.ACCESS_TOKEN) &&
      !locationObject.includes(location.pathname)
    ) {
      history.push("/");
    } else if (authProfile) {
      if (
        JSON.parse(authProfile.user_type == "printer") &&
        location.pathname == "/admin/dashboard"
      ) {
        history.push("/user/dashboard");
        return;
      } else if (
        authProfile.user_type == "admin" &&
        location.pathname == "/user/dashboard"
      ) {
        history.push("/admin/dashboard");
        return;
      } else if (authProfile.user_type == "user") {
        if (location.pathname == "/user/dashboard") {
          history.push("/qrScan");
        } else if (location.pathname == "/user/dashboard") {
          history.push("/qrScan");
        }
        return;
      }
    }
    
  }, [!authToken]);
  useEffect(() => {
    document.querySelector('body').classList.remove('overflow-hidden');
  }, [location.pathname]);
  const locationObject = [
    "/register",
    "/password-reset",
    "/",
    "/sendMessage",
    "/qrScan",
    "/qr/not-found",
    "/qrResponse",
    "/qrResponse/",
    "/downloadApp",
    "/admin",
    "/404",
  ];
  const handleButtonClick = () => {
    setClickValue(!getValue);
  };
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem(keys.Preference.ACCESS_TOKEN);
    history.push("/");
  };
  return (
    <React.Fragment>
      <Container fluid className="app-container px-0">
        <div className="app-wrap">
          <div className="app-body">
            <div className="d-flex h-100vh">
              {locationObject.includes(location.pathname) ? null : (
                <div
                  className="bg-white"
                  style={{ width: getValue ? "60px" : "auto" }}
                >
                  <SideBar collapse={getValue} />
                </div>
              )}
              <div className="flex-1">
                {locationObject.includes(
                  location.pathname
                ) ? null : location.pathname !== "/404" && authToken ? (
                  <TopBar onButtonClick={handleButtonClick} />
                ) : null}
                {authProfile && authProfile.user_type == "user" ? (
                  <div className="mx-0 px-5 text-end py-3 bg-white">
                    <p className="mb-0 f-14 d-inline-block me-3">
                      {authProfile.name}
                    </p>
                    <span className="d-inline-block">
                      <button className="btn btn-danger f-14" onClick={logout}>
                        <BoxArrowLeft size={20} className="me-1" /> Logout
                      </button>
                    </span>
                  </div>
                ) : null}
                <Content />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Layout;
