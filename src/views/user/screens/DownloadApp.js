import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {SocialLike} from '../../Widgets/AllImages'
import StaticsBox from '../components/StaticsBox'
import {
    RoundButton,
} from '../components/FormElements'
const DownloadApp = () => {
    return (
        <div className="p-5 my-5">
            <Row className="align-items-center">
                <Col lg={4}>
                    <div>
                      <img src={SocialLike} className="img-fluid" />
                    </div>
                </Col>
                <Col lg={8}>
                    <h3 className="text-black semibold 
                        mb-2 f-33">
                        Download App <br />Spread gratitude!
                    </h3>
                    <Row>
                        <Col lg={4} className="mt-5">
                            <StaticsBox 
                                bg="linear-gradient(134.47deg, #61B3F3 -23.26%, #05278D 100%)"
                                text="2M"
                                heading="downloads"
                            />
                        </Col>
                        <Col lg={4} className="mt-5">
                            <StaticsBox 
                                bg="linear-gradient(135deg, #FF95A5 0%, #FF64A3 100%)"
                                text="92K"
                                heading="Premium Users"
                            />
                        </Col>
                        <Col lg={4} className="mt-5">
                            <StaticsBox 
                                bg="linear-gradient(134.47deg, #FFB37A -23.26%, #FF884A 100%)"
                                text="75K"
                                heading="Positive Reviews"
                            />
                        </Col>
                        <Col lg={8} className="mt-5 mx-auto pt-2">
                            <RoundButton 
                                text="Download App"
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default DownloadApp