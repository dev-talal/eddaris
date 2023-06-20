import Style from '../auth/Style/Style'
const RoundButton = (props) => {
    return (
        <div>
            <button type="button" className={`f-16 text-white
                border-0 w-100 text-uppercase ${props.opacity=="0.5"?"opacity-btn":"no-opacity"}`}
                onClick={props.click}
                style={Style.button}>
                {props.text}
            </button>
        </div>
    )
}

const CustomInput = (props) => {
    return (
        <>
            <input  className="w-100 bg-white border"
                style={Style.field}
                {...props}
            />
        </>
    )
}

const CustomTextArea = (props) => {
    return (
        <>
            <textarea className="w-100 pt-4 h-auto disbale-resize bg-white border"
                {...props} style={Style.field}
                rows="8" cols="12"
            ></textarea>
        </>
    )
}


export {
    RoundButton,
    CustomInput,
    CustomTextArea
}