import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Style from '../auth/Style/Style'
import LogoText from '../../Widgets/LogoText'
import ReactPlayer from 'react-player'
import { FileText } from 'react-bootstrap-icons'
import { Cart } from '../../Widgets/AllImages'
import {
    RoundButton,
} from '../components/FormElements'
const QrResponse = () => {
    const history = useHistory();
    const [data, setData] = useState({ dataLink: "", type: "",ext:"" })
    const [loader, setLoader] = useState()
    const location = useLocation()
    const query = new URLSearchParams(location.search);
    const blobGenerate = (url) => {
        fetch(url)
        .then(res => res.blob())
        .then(blob => {
            URL.createObjectURL(blob)
            const pathname = url
            const ext = pathname.split(/[#?]/)[0].split('.').pop().trim()
            const types = new Map([["jpg", "img"], ["jpeg", "img"],["avif", "img"],["avi", "img"],["apng", "img"], ["gif", "img"], ["png", "img"], ["svg", "img"], ["webp", "img"], ["mp4", "video"],["mp4", "video"],["mov", "video"], ["3gp", "video"],
            ["WebM", "video"], ["flv", "video"], ["zip", "file"],["doc", "file"],["docx", "file"],["html", "file"],["html", "file"], ["psd", "file"],["psd", "file"],["xls", "file"],["xlsx", "file"],["ods", "file"],["ppt", "file"],["pptx", "file"],
            ["pdf", "file"],["m4a", "audio"],["mp3", "audio"],
            ["m4a", "audio"],["wav", "audio"],["aac", "audio"],["wma", "audio"],["flac", "audio"]])
            setData({ dataLink: URL.createObjectURL(blob), type: types.get(ext),ext:ext})
            setLoader(false)
        });
    }
    useEffect(() => {
        if (!query.get('url')) {
            history.push('/qrScan')
            return
        }
        setLoader(true)
        const queryData = JSON.stringify({ 'url': query.get('url'), 'id': query.get('id') })
        blobGenerate(query.get('url'))
        localStorage.setItem('qrData', queryData)
    }, [])
    const setLocation = () => {
        history.push('/sendMessage')
    }
    return (
        <div>
            <div className="mx-0 px-md-5 px-4" style={Style.HeightFullScreen}>
                <Row className="my-5 h-100 bg-white" style={Style.RowDesign}>
                    <div className="black-overlay position-relative d-flex 
                       align-items-center justify-content-center" style={Style.BoxBar}>
                        <div>
                            <LogoText classes="f-45 text-white" />
                        </div>
                    </div>
                    <Col lg={8} className="px-md-5 px-3 py-5 mx-auto">
                        <div className="text-center">
                            {!loader ?
                                <>                                    
                                    {data.type == "video" ?
                                        <ReactPlayer
                                            width="100%"
                                            url={data.dataLink}
                                            playing={false}
                                            controls={true}
                                        />
                                        :
                                        data.type == "img" ?
                                          <img src={data.dataLink} className="img-fluid" />
                                        : data.type == "file" ?
                                            <>
                                                <FileText size={60} /> 
                                                <p className="mt-2 mb-0 fbold"><span className="text-capitalize">{data.ext} File</span></p>
                                            </>
                                        :  data.type == "audio" ?
                                            <AudioPlayer
                                                autoPlay
                                                src={data.dataLink}
                                            />
                                        :
                                        <>
                                            <>
                                                <FileText size={60} /> 
                                                <p className="mt-2 mb-0 fbold"><span className="text-capitalize">{data.ext} File</span></p>
                                            </>
                                        </> 
                                    }
                                    <div className="col-sm-8 col-lg-6 col-12 mx-auto mt-5">
                                        <RoundButton click={(() => setLocation())} text="Send Response" />
                                        <a href={data.dataLink} 
                                            download={`Thankyou-Qr.${data.ext}`} className="f-16 text-white
                                            border-0 w-100 text-uppercase mt-3 d-flex
                                            align-items-center justify-content-center opacity-btn 
                                            text-decoration-none" style={Style.button}>
                                            Download File
                                        </a>
                                        <a href="https://spreadthankyou.com/products/thank-you-card" 
                                            target="_blank" className="f-16 text-white
                                            border-0 w-100 text-uppercase mt-3 d-flex
                                            align-items-center bg-primary justify-content-center
                                            text-decoration-none" style={Style.button}>
                                            <img src={Cart} className="align-self-center me-2 white-filter" height="23px" />
                                            <span class="pt-1">Get Thank You Stickers</span>
                                        </a>
                                    </div>
                                </>
                                :
                                <div>
                                    <Loader type={"Bars"} height={200} color={"#1d1d1d"} />
                                </div>
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default QrResponse