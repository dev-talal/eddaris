import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF,faTwitter,faGoogle } from '@fortawesome/free-brands-svg-icons';
import Style from '../Style/Style';
const SocialLinks = () => {
    const classes = "list-inline-item cursor-pointer rounded-circle"
    return (
        <div>
            <ul className="list-inline">
                <li className={classes +" me-3"}
                  style={Style.SocialLinks}>
                  <FontAwesomeIcon icon={faFacebookF} />
                </li>
                <li className={classes +" me-3"}
                  style={Style.SocialLinks}>
                  <FontAwesomeIcon icon={faTwitter} />
                </li>
                <li className={classes}
                  style={Style.SocialLinks}>
                  <FontAwesomeIcon icon={faGoogle} />
                </li>
            </ul>
        </div>
    )
}

export default SocialLinks