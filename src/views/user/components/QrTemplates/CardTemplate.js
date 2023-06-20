import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { qrCard } from "../../../Widgets/AllImages";
const CardTemplate = ({ downloadArray }) => {
  return (
    <div className={`mx-auto d-flex h-100 `}>
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
                      "25px solid transparent"
                  }}
                >
                  <div>
                    <span
                      className={`d-flex align-items-center justify-content-start`}
                      style={styles.qrCardCounter}
                    >
                      {key + 1}
                    </span>
                  </div>
                  <div className="position-relative text-center">
                    <img
                      src={qrCard}
                      width={`373px`}
                      height={`373px`}
                      alt="thankyou-card-qr"
                    />
                    <div className="position-absolute" style={styles.qrCShape}>
                      <img src={img} className="img" style={{border:"2px solid #000"}} height={`193px`} />
                    </div>
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
  qrCardCounter: {
    fontSize: "180px",
    fontFamily: "skippy",
    height: "70px",
    width: "70px",
    color: "#000",
  },
  qrCShape: {
    transform: "rotate3d(-732, 0, -354, 25deg)",
    top: "79px",
    left: "129px",
  }
};
export default CardTemplate;
