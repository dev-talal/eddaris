import React, { useState, useEffect } from "react";
import { styles, customStyles } from "./QrSettings";
import Services from "../../../services";
import Loader from "react-loader-spinner";
// import JSZip from "jszip";
import jsPDF from "jspdf";
// import JSZipUtils from "jszip-utils";
import saveAs from "save-as";
import domtoimage from "dom-to-image";
import {
  qrBox,
  qrHeart,
  qrCard,
  qrCode,
  qrHeartThumb,
  qrCardThumb,
  Prem,
} from "../../Widgets/AllImages";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Download, ArrowLeft } from "react-bootstrap-icons";
import "./switch.css";
import ReactSelect from "react-select";
import DefaultQr from "./QrTemplates/DefaultQr";
import HeartTemplate from "./QrTemplates/HeartTemplate";
import GiftBoxTemplate from "./QrTemplates/GiftBoxTemplate";
import CardTemplate from "./QrTemplates/CardTemplate";
import Premier from "./QrTemplates/Premier";
import TestingTemplate from "./QrTemplates/TestingTemplate";
const DownloadQr = ({ changeDownloads }) => {
  // const [dAmount, setCount] = useState("");
  const [loader, setLoader] = useState(false);
  const [downloadArray, setQrArray] = useState([]);
  const [dataResult, setDataResult] = useState([]);
  const [status, setStatus] = useState(false);
  const [counter, setCounter] = useState(0);
  const [zipArray, setZipArray] = useState([]);
  const [progress, setProgressWidth] = useState(0);
  const [progressShow, setProgressShow] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectValue, setSelectValue] = useState(false);
  const [isView, setIsView] = useState(false);
  const dAmount = selectValue == "premier" ? 32 : 12;
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  useEffect(() => {
    if (checked && progressShow === false) {
      qrDownload();
    }
  }, [checked, progressShow]);

  useEffect(() => {
    if (status) {
      setCounter((prev) => prev + 1);
      setQrArray(dataResult[counter]);
      dataFunc(dataResult);
    }
  }, [status]);

  useEffect(() => {
    const amount_noo = selectValue == "premier" ? 16 : 6;
    const totalNumberOfArrays = dAmount / amount_noo;
    if (totalNumberOfArrays >= counter) {
      const percentage = (counter / totalNumberOfArrays) * 100;
      // console.log(percentage, counter, totalNumberOfArrays, "progress Bar");
      if (percentage <= 100 && percentage > 0) {
        setProgressWidth(percentage.toFixed(0));
      }
    }
  }, [counter]);

  const dataFunc = async (result) => {
    setStatus(false);
    setTimeout(() => {
      var node = document.getElementById("qrBoxData");
      domtoimage
        .toPng(node)
        .then((response) => {
          if (counter === 0) {
            setZipArray([response]);
          } else {
            setZipArray([...zipArray, response]);
          }

          if (counter === result.length) {
            createZip(result);
          } else {
            setStatus(true);
          }
          // ProgressNum(dataResult);
        })
        .catch(function (error) {
          // console.error("oops, something went wrong!", error);
        });
    }, 100);
    // }, 100 * (counter + 1));
  };

  const createZip = async (result) => {
    // const zip = new JSZip();
    // let count = 0;
    // const zipFilename = "Thankyou-Qr-" + Math.random() * 10000000 + ".zip";
    // zipArray.forEach(async function (url) {
    //   const file = await JSZipUtils.getBinaryContent(url);
    //   zip.file("Thankyou-Qr-" + Math.random() * 10000000 + ".png", file, {
    //     binary: true,
    //   });
    //   count++;
    //   if (count === result.length) {
    //     zip.generateAsync({ type: "blob" }).then(function (content) {
    //       saveAs(content, zipFilename);
    //       changeDownloads();
    //       setLoader(false);
    //       document.body.className = document.body.className.replace(
    //         "overflow-hidden",
    //         ""
    //       );
    //       setTimeout(() => {
    //         setCounter(0);
    //         setProgressShow(false);
    //         setProgressWidth(0);
    //       }, 1000);
    //     });
    //   }
    // });
    // do not touch this  216, 324
    const doc = new jsPDF("p", "px", [selectValue == "premier" ? 459 : 216, selectValue == "premier" ?594:324]);
    let count = 0;
    const pdfFileName = "Thankyou-Qr-" + Math.random() * 10000000 + ".pdf";
    zipArray.forEach(async function (url) {
      doc.addImage(url, "JPEG", 0, 0, selectValue == "premier" ? 459 : 216, selectValue == "premier" ?594:324, undefined, "FAST");
      count++;
      if (count !== result.length) doc.addPage();
      if (count === result.length) {
        doc.save(pdfFileName);
        changeDownloads();
        setLoader(false);
        setTimeout(() => {
          setCounter(0);
          setProgressShow(false);
          setProgressWidth(0);
        }, 1000);
      }
    });
  };

  const singleImage = (dataResult) => {
    setTimeout(() => {
      var node = document.getElementById("qrBoxData");
      domtoimage
        .toBlob(node, { quality: 1.0 })
        .then(function (blob) {
          saveAs(blob, "Thankyou-QR-" + Math.random() * 10000000 + ".png");
          changeDownloads();
          setLoader(false);
          document.body.className = document.body.className.replace(
            "overflow-hidden",
            ""
          );
          setTimeout(() => {
            setProgressShow(false);
            setProgressWidth(0);
          }, 1500);
        })
        .catch(function (error) {
          // console.error("oops, something went wrong!", error);
          setLoader(false);
          document.body.className = document.body.className.replace(
            "overflow-hidden",
            ""
          );
        });
    }, 3000 * 1);
  };

  const qrDownload = () => {
    document.body.className = "overflow-hidden";
    setLoader(true);
    Services.admin
      .downloadEmptyQr(dAmount, selectValue, selectValue == "premier" ? 16 : 6)
      .then(async (response) => {
        const result = response.data;
        setProgressShow(true);
        if (result.length <= 1) {
          setLoader(true);
          result.map((item) => {
            setQrArray(item);
            singleImage(result);
          });
        } else {
          setDataResult(result);
          setQrArray(result[counter]);
          dataFunc(result);
        }
      })
      .catch((error) => {
        setLoader(false);
        document.body.className = document.body.className.replace(
          "overflow-hidden",
          ""
        );
      });
  };
  const getValue = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      // setCount(e.target.value);
    }
  };
  const qrDataArray = [
    {
      value: "default",
      label: "Default Qr",
      image: qrCode,
      template: <DefaultQr downloadArray={downloadArray} />,
      thumbnail: qrCode,
    },
    {
      value: "box",
      label: "3D Box",
      image: qrBox,
      template: <GiftBoxTemplate downloadArray={downloadArray} />,
      thumbnail: qrBox,
    },
    {
      value: "heart",
      label: "Qr Heart",
      image: qrHeart,
      template: <HeartTemplate downloadArray={downloadArray} />,
      thumbnail: qrHeartThumb,
    },
    {
      value: "card",
      label: "Qr Card",
      image: qrCard,
      template: <CardTemplate downloadArray={downloadArray} />,
      thumbnail: qrCardThumb,
    },
    {
      value: "premier",
      label: "Premier",
      image: Prem,
      template: <Premier downloadArray={downloadArray} />,
      thumbnail: Prem,
    },
  ];
  return (
    <>
      <div className="w-fit-content mx-auto">
        {!isView ? (
          <>
            <h3 className="medium text-start mb-4 mt-5">Select Qr Template</h3>
            <ReactSelect
              styles={customStyles}
              options={qrDataArray}
              onChange={(option) => {
                setSelectValue(option.value);
                setIsView(true);
              }}
              formatOptionLabel={(item) => (
                <div className="country-option">
                  <img
                    src={item.thumbnail}
                    className="me-2"
                    alt="country-image"
                    width="30px"
                  />
                  <span>{item.label}</span>
                </div>
              )}
            />
          </>
        ) : (
          <>
            <div className="d-flex align-items-center">
              {!loader ? (
                <ArrowLeft
                  onClick={() => setIsView(false)}
                  className="me-3 cursor-pointer"
                  size={25}
                />
              ) : null}
              <img
                src={
                  qrDataArray.filter((x) => x.value == selectValue)[0].thumbnail
                }
                className="me-3"
                width="50px"
              />
              <span style={{ fontWeight: "600" }}>
                {qrDataArray.filter((x) => x.value == selectValue)[0].label}
              </span>
            </div>
            <h3 className="medium text-center mb-4 mt-5">
              Turn On the switch to Download QR
              <br />
              One PDF Contain {dAmount} QR
            </h3>

            <div
              className="switch text-center"
              onChange={handleChange}
              checked={checked}
            >
              <input type="checkbox" name="toggle" />
              <label htmlFor="toggle">
                <i className="bulb">
                  <span className="bulb-center"></span>
                  <span className="filament-1"></span>
                  <span className="filament-2"></span>
                  <span className="reflections">
                    <span></span>
                  </span>
                  <span className="sparks">
                    <i className="spark1"></i>
                    <i className="spark2"></i>
                    <i className="spark3"></i>
                    <i className="spark4"></i>
                  </span>
                </i>
              </label>
            </div>
            <div className="text-center mt-5">
              {loader && <Loader type={"Bars"} height={50} color={"#212529"} />}
            </div>
          </>
        )}
      </div>
      <div className="w-100 overflow-hidden">
        <div
          id="qrBoxData"
          className={`${!isView ? "d-none" : ""}`}
          style={{
            width: `${selectValue == "premier" ? "1400" : "1200px"}`,
            height: `${selectValue == "premier" ? "2200" : "1800px"}`,
          }}
        >
          <div
            className={`mx-auto d-flex h-100  ${
              selectValue == "heart" ? "heart-tempalate" : ""
            }`}
          >
            {selectValue
              ? qrDataArray.filter((x) => x.value == selectValue)[0].template
              : null}
          </div>
        </div>
      </div>
      {progressShow ? (
        <div
          style={styles.progressBar}
          className="position-fixed shadow-sm p-3 bg-white border d-flex align-items-center"
        >
          <Download size={21} />
          <div className="flex-1 ms-2">
            <ProgressBar
              animated
              now={progress}
              variant="primary"
              label={`${progress}%`}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DownloadQr;
