import Style from '../Style/Style'
import LogoText from '../../../Widgets/LogoText'
const LeftContent = () => {
    return (
        <div className="h-100 position-relative
            black-overlay d-flex flex-wrap align-items-center justify-content-center" 
            style={Style.banner}>
            <div className="position-relative w-100 text-white">
                <LogoText />
                <p className="mtype f-16 text-center">
                  spread gratitude.
                  <br />express appreciation.
                </p>
            </div>
        </div>
    )
}
export default LeftContent