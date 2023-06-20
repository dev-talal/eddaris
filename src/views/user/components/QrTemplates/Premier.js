import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Prem, property_managment } from "../../../Widgets/AllImages";
const Premier = ({ downloadArray }) => {
  console.log(downloadArray);
  return (
    <div className={`mx-auto d-flex h-100 w-100 `}>
      <Row className="w-100 justify-content-center px-3 py-3 align-items-center">
        {downloadArray
          ? downloadArray.map((img, key) => {
              return (
                <Col lg={3} key={key}>
                  <div className="position-relative text-center">
                    <img src={Prem} alt="premier" className="img-fluid" />
                    <div className="position-absolute" style={styles.qrCShape}>
                      <img src={img} className="img" height={`130px`} style={{border:"2px solid #000"}} />
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
  qrCShape: {
    transform:"rotate3d(-732, 0, -354, 25deg)",
    top: "243px",
    left: "95px"
  },
};
export default Premier;
