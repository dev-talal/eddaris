import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Prem, property_managment, qrCode } from "../../../Widgets/AllImages";
const TestingTemplate = ({ downloadArray }) => {
  return (
    <div className={`mx-auto d-flex h-100 w-100 `}>
      <Row className="w-100 mx-0 justify-content-center px-3 py-3 align-items-center">
        {Array.apply(0, Array(16)).map(function (x, i) {
          return (
            <Col lg={3}>
              <div className="position-relative text-center align-self-center">
                <img
                  src={Prem}
                  alt="premier"
                  className="img-fluid align-self-center"
                />
                <div className="position-absolute" style={styles.qrCShape}>
                  <img src={qrCode} className="img" height={`130px`} />
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
const styles = {
  qrCShape: {
    transform:"rotate3d(-732, 0, -354, 25deg)",
    top: "241px",
    left: "95px"
  },
};
export default TestingTemplate;
