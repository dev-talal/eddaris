const StaticsBox = (props) => {
    const Style = {
        innerBoxStyle:{
            width:"80px",
            height:"80px",
            background: props.bg,
            filter: "drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.161))",
            fontSize:"30px"
        }
    }
    return (
        <div>
            <div className="statics-box radius-20 bg-white 
                box-shadow-statics px-3 py-4 d-flex flex-column 
                align-items-center justify-content-center">
                <div className="radius-8 text-white d-flex align-items-center 
                    justify-content-center medium" style={Style.innerBoxStyle}>
                    {props.text}
                </div>
                <p className="mb-0 f-14 mt-3 text-capitalize">
                    {props.heading}
                </p>
            </div>
        </div>
    )
}

export default StaticsBox;