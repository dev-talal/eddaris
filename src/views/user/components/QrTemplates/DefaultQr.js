import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DefaultLayer , ThankyouLabel } from "../../../Widgets/AllImages";
const DefaultQr = ({ downloadArray }) => {
  return (
    <div class="h-100 px-5 py-5">
      <div
        className={`mx-auto d-flex align-items-center h-100  w-100 position-relative`}
        style={{
          backgroundImage: `url(${DefaultLayer})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          border:"0"
        }}
      >
        <div
          class="position-absolute w-100 text-center"
          style={{ top: "-47px" }}
        >
          <img src={ThankyouLabel} />
        </div>
        <Row
          className={` w-100 mx-auto py-4 px-4 justify-content-between position-relative`}
          id="QrWrapBox"
          style={{
            paddingTop: "1.5px",
            paddingBottom: "1.5px",
            height: "fit-content",
          }}
        >
          {downloadArray
            ? downloadArray.map((img, key) => {
                return (
                  <Col
                    xs={6}
                    key={key}
                    className={`px-4`}
                    style={{
                      border: "25px solid transparent",
                      borderBottom: "0",
                    }}
                  >
                    <div className={`${key==3 || key==1 || key==5?"w-fit-content ms-auto":null}`}>
                    <div>
                      <span className={` f-light-c`} style={styles.qrCounter}>
                        {key+1}.
                      </span>
                    </div>
                    <div className="position-relative w-fit-content text-center">
                      <img
                        src={img}
                        width={`297px`}
                        height={`297px`}
                        alt="thankyou-default-qr"
                        style={{border:"2px solid #000"}}
                      />
                      <p
                        className="mb-0 mt-3  mtype f-60 text-uppercase"
                        style={{ fontSize: "30px" }}
                      >
                        Scan Me
                      </p>
                    </div>
                    </div>
                  </Col>
                );
              })
            : null}
        </Row>
      </div>
    </div>
  );
};
const styles = {
  qrCounter: {
    fontSize: "100px",
    fontWeight: 300,
    color: "#000",
    lineHeight: 1,
    marginLeft: "-30px",
  },
};
export default DefaultQr;
