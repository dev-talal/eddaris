import React from 'react'
import {ArrowLeft} from 'react-bootstrap-icons'
import {useHistory} from 'react-router-dom'
import {
    notFound
} from "../Widgets/AllImages"
const NotFound = () => {
    const history = useHistory();
    const goBack = () => {
        history.goBack()
    }     
    const ButtonStyle={
        boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.25)"
    }
    return (
        <div className="px-5 text-center my-5 py-5">
            <img src={notFound} height="200px" />
            <h5 className="mt-5 f-30px font-boldest">Request Not Found</h5>
            <button className="bg-purple mt-5 d-flex mx-auto align-items-center 
                text-white btn f14-size btn-round-8 font-bolder text-decoration-none" 
                onClick={goBack} style={ButtonStyle}>
                <ArrowLeft className="me-3" color="#fff" size={25} />
                Go Back
            </button>
        </div>
    )
}

export default NotFound