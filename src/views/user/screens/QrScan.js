import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { qrVector } from "../../Widgets/AllImages";
import Style from "../auth/Style/Style";
import LogoText from "../../Widgets/LogoText";
import QrReader from "react-qr-reader";
import Services from "../../../services";
const BarcodeScan = () => {
  const [delay, setDelay] = useState();
  const [loader, setLoader] = useState();
  const [handleError, setError] = useState("");
  const [handleScan, setScan] = useState();
  const [loadingBar, setBar] = useState(false);

  useEffect(() => {
    handleScanner();
    setDelay(50);
  }, []);
  const handleScanner = (data) => {
    if (data) {
      setLoader(true);
      setScan(data);
      Services.admin
        .getQrResponse(data)
        .then((response) => {
          // console.log(response.data)
          if (response.data.url) {
            window.location.href = data;
          } else {
            setError("Qr code is empty!");
            setTimeout(() => {
              setError("");
            }, 2000);
          }
        })
        .catch((error) => {
          setError("An error occured");
        })
        .finally(() => {
          setLoader(false);
        });
    }
  };
  const handleErrorScan = (err) => {
    setError(err);
  };
  const previewStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };
  const LoadingBar = () => {
    setBar(true);
  };
  return (
    <div>
      <div className="mx-0 px-5" style={Style.HeightFullScreen}>
        <Row className="my-5 h-100" style={Style.RowDesign}>
          <div
            className="black-overlay position-relative d-flex 
                       align-items-center justify-content-center"
            style={Style.BoxBar}
          >
            <div>
              <LogoText classes="f-45 text-white" />
            </div>
          </div>
          <Col lg={5} xl={6} className="bg-medium-grey p-5">
            <div className="w-75 text-center mx-auto">
              <p className="mb-3 f-14">
                Place barcode inside the frame to scan.
              </p>
              {handleError ? (
                <p className="text-danger f-14 mb-3">{handleError}</p>
              ) : null}
              <div
                className="bg-light-grey overflow-hidden  
                               d-flex align-items-center justify-content-center radius-20"
                style={{ height: "230px" }}
              >
                <div className="w-100 h-100 position-relative qrscanner-main">
                  {!loader ? (
                    <>
                      <QrReader
                        delay={delay}
                        onError={handleErrorScan}
                        onScan={handleScanner}
                        style={previewStyle}
                        onLoad={LoadingBar}
                        style={{ width: "100%", height: "100%" }}
                      />
                      <>{loadingBar ? <div className="scanner"></div> : null}</>
                    </>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center h-100 w-100">
                      <Loader type="Grid" height={200} color="#212529" />
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-3 f-14">Scanning will start automatically.</p>
            </div>
          </Col>
          <Col lg={7} xl={6} className="bg-white p-5">
            <div>
              <h3
                className="text-black semibold 
                              mb-2 f-33"
              >
                Spread Gratitude <br />
                Express Appreciation...
              </h3>
              <p
                className="medium 
                                color-purple f-18 mt-2"
              >
                Scan your barcode to see the attached
                <br />
                media with your merchandise!
                <br />
                You would love to see what’s inside...
              </p>
              <div className="text-center mt-4">
                <img src={qrVector} alt="" />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default BarcodeScan;
