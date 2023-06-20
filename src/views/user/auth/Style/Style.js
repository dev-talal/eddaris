import 
{
    AuthBanner2,
    AuthBanner,
    BoxTopBar
} from '../../../Widgets/AllImages'
const Style = {
    banner:{
        background:`url('${window.location.href.indexOf("register") > -1?AuthBanner2:AuthBanner}')`,
        backgroundSize:'cover',
        backgroundPosition:'left center',
        backgroundRepeat:"no-repeat"
    },
    HeightFullScreen:{
       minHeight:"100vh",
    },
    logoText:{
        fontSize:"40px",
        transform:"scale(-1, -1)"
    },
    smallSign:{
        transform:"scale(-1, -1)",
        left:"-17px",
        bottom:"0px",
        fontWeight:"200"
    },
    field:{
        filter:"drop-shadow(0px 6px 20px rgba(31, 84, 195, 0.149))",
        borderRadius:"30px",
        paddingLeft:"15px",
        paddingRight:"15px",
        height:"50px",
        fontSize:"14px",
        lineHeight:"21px",
        color:"#1D2226",
        opacity:0.5
    },
    forgot:{
        color:"#1D1D1D"
    },
    button:{
        filter: "drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.161))",
        height:"50px",
        paddingLeft:"15px",
        paddingRight:"15px",
        background: "#1D1D1D",
        borderRadius:"30px"

    },
    SocialLinks: {
        width: "50px",
        height: "50px",
        border: "1px solid #e1e1e1",
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "50%"
    },
    SocialColor:{
        color:"#4B4B4B"
    },
    RowDesign:{
        borderRadius: "20px",
        overflow: "hidden",
        filter:"drop-shadow(0px 14px 16px rgba(0, 0, 0, 0.102))"
    },
    BoxBar:{
        background:`url('${BoxTopBar}')`,
        backgroundSize:'cover',
        backgroundPosition:'left center',
        backgroundRepeat:"no-repeat",
        height:"140px"
    }

}

export default Style