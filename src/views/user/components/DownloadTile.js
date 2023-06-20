import React from 'react'
const DownloadTile = (props) => {
    return (
        <div className="bg-white px-3 py-4 radius-4
            d-flex flex-wrap align-items-center">
            <div className={`icon-tile
                d-flex align-items-center justify-content-center 
                me-3 ${props.IconBgClass}`}>
                <props.Icon className={props.IconClass} />
            </div>
            <div>
                
                <h5 className="mb-0 semibold f-25">
                    {props.value}
                </h5>
                <p className="mb-0 f-14 tile-desc">{props.heading}</p>
            </div>
        </div>
    )
}

export default DownloadTile