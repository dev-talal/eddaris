import React from 'react'
import Style from '../user/auth/Style/Style'
const LogoText = (props) => {
    return (
        <div>
            <h5 className={`mtype text-white text-uppercase
                position-relative w-fit-content mx-auto ${props.classes}`}
                style={Style.logoText}>
                Thank You
                <small className="position-absolute"
                style={Style.smallSign}>&reg;</small>
            </h5>
        </div>
    )
}
export default LogoText