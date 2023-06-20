import React from "react";
import { qrBox } from "../../../Widgets/AllImages";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const GiftBoxTemplate = ({ downloadArray }) => {
  return (
    <div className={`mx-auto d-flex h-100`}>
      <Row
        className={`justify-content-center mx-auto align-items-center`}
        id="QrWrapBox"
        style={{ paddingTop: "1.5px", paddingBottom: "1.5px" }}
      >
        {downloadArray
          ? downloadArray.map((img, key) => {
              return (
                <Col
                  xs={6}
                  className={`px-5`}
                  key={key}
                  style={{
                    border:
                      key == 0 || key == 3 || key == 4
                        ? "25px solid #e71e26"
                        : "25px solid transparent",
                  }}
                >
                  <div>
                    <span
                      className={`d-flex align-items-center ${
                        key == 0 || key == 3 || key == 4
                          ? `justify-content-center justify-content-start ${"rounded-circle overlap-counter text-white"}`
                          : `justify-content-center`
                      }
                    `}
                      style={styles.qrCounter}
                    >
                      {key + 1}
                    </span>
                  </div>
                  <div className="position-relative text-center">
                    <img
                      src={qrBox}
                      width={`373px`}
                      height={`373px`}
                      alt="thankyou-gift-qr"
                    />
                    <div className="position-absolute" style={styles.qrDes}>
                      <img src={img} className="img" height={`193px`} style={{border:"2px solid #000"}} />
                    </div>
                    <p className="mb-0 mt-3 text-center mtype f-60 text-uppercase">
                      Scan Me
                    </p>
                  </div>
                </Col>
              );
            })
          : null}
      </Row>
    </div>
  );
};
const styles = {
  qrCounter: {
    fontSize: "55px",
    fontWeight: 700,
    height: "70px",
    width: "70px",
    marginLeft: "-30px",
    color: "#e71e26",
  },
  qrDes: {
    transform: "rotate3d(-659, 740, -151, 33deg)",
    top: "155px",
    left: "195px",
  },
};
export default GiftBoxTemplate;
