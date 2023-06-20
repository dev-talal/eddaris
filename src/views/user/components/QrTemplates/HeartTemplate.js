import React from "react";
import { Heart, qrHeart, Tooltip } from "../../../Widgets/AllImages";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const HeartTemplate = ({downloadArray}) => {
  return (
    <div className={`mx-auto d-flex h-100`}>
      <Row
        className={`justify-content-center mx-auto align-items-center heart-template-inner`}
        id="QrWrapBox"
        style={{ paddingTop: "1.5px", paddingBottom: "1.5px" }}
      >
        {downloadArray
          ? downloadArray.map((img, key) => {
              return (
                <Col xs={6} className={`px-0 position-relative`} key={key}>
                  <div
                    className="position-absolute"
                    style={{ bottom: "0px", left: "50px" }}
                  >
                    <span
                      className="d-flex align-items-center justify-content-center triangle-down position-relative"
                      style={styles.qrCounterHeart}
                    >
                      <img src={Heart} alt="heart" />
                      &nbsp;<span style={{ color: "#000" }}>{key + 1}</span>
                    </span>
                  </div>
                  <div className="position-relative text-center">
                    <img
                      src={qrHeart}
                      width={`520px`}
                      height={`494px`}
                      alt="thankyou-heart-qr"
                    />
                    <div className="position-absolute" style={styles.qrHShape}>
                      <img src={img} className="img" height={`150px`} style={{border:"2px solid #000"}} />
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
  qrCounterHeart: {
    fontSize: "50px",
    fontWeight: 700,
    height: "92px",
    width: "118px",
    marginLeft: "-30px",
    color: " rgb(231, 30, 38)",
    paddingBottom: "11px",
    borderRadius: "4px",
    backgroundImage: `url(${Tooltip})`,
    backgroundSize: "cover",
  },
  qrHShape: {
    transform: " rotate(-3deg)",
    top: "83px",
    left: "200px",
  },
};
export default HeartTemplate;
