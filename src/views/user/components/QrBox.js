import React from 'react'
import {qrCode ,qrBox} from '../../Widgets/AllImages'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
const QrBox = () => {
    const styles = {
        qrDes:{
            transform: 'rotate3d(-601, 713, -145, 32deg)',
            top:'155px',
            left:'144px'
        }
    }
    return (
        <div id="qrBoxData" className="d-none">
            <Row className="p-5 m-5">
                <Col xs={6} className="mb-5 px-5">
                    <div className="position-relative">
                        <img src={qrBox} className="img-fluid" width="630px" alt="thankyou-qr" />
                        <p class="mb-0 mt-3 text-center mtype f-60 text-uppercase">Scan Me</p>
                        <div className="position-absolute" style={styles.qrDes}>
                            <img src={qrCode} class="img" height="188px" />
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default QrBox