import React,{useState,useEffect} from 'react'
import {useHistory,useLocation} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Services from '../../../services'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Style from './Style/Style'
import {Link} from 'react-router-dom'
import {RoundButton,CustomInput} from '../components/FormElements'
import LeftContent from './Widgets/LeftContent'
const ResetPassword = () => {
    const history = useHistory()
    const location = useLocation()
    const [email,SetEmail] = useState()
    const [password,SetPassword] = useState()
    const [confirmPassword,SetConfrimPassword] = useState()
    const [Message,setMessage] = useState()
    const [loader,setLoader] = useState(false)
    const userProfile = JSON.parse(localStorage.getItem('user'))
    const query = new URLSearchParams(location.search);
    const queryData = query.get('redirect')
    const Reset = () => {
        setLoader(true)
        setMessage(null)
        const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(email)) {
            setMessage({message:"Please enter valid email address.",class:"text-danger"})
            setLoader(false)
            return
        }
        else{
            Services.admin.sendVerification(email).then((response) => {
                setMessage({message:"A verification link successfully sent on your email",class:"text-success"})
                // setTimeout(() => {
                //     console.log(response)
                // }, 600);
            }).catch((error) => {
                const { response } = error
                setMessage({message:response.data.message,class:"text-danger"})
            }).finally(() => {
                setLoader(false)
            })
        }
        
    }
    useEffect(() => {
        if(userProfile){
            switch(userProfile.user_type){
                case "user": 
                history.push('/qrScan')
                break
                case "printer": 
                history.push('/user/dashboard')
                break
                case "admin":
                history.push('/admin/dashboard')
                break
            }
        }
    }, [])
    return (
        <div>
           <div className="mx-0 px-5" style={Style.HeightFullScreen}>
                <Row className="bg-white my-5" style={Style.RowDesign}>
                    <Col className="px-0" md={6}>
                        <LeftContent />
                    </Col>
                    <Col className="px-0" md={6}>
                        <div className="px-5 pt-5 pb-4">
                            <h4 className="mb-4 mt-5 semibold f-33">Reset Password</h4>
                            {Message?
                            <div className={`mb-4 ${Message.class}`}>
                                {Message.message}
                            </div>
                            :null}
                            <div className="input-fields-group mt-4">
                                <CustomInput
                                    placeholder="Email" 
                                    type="email"
                                    onChange={((e)=>SetEmail(e.target.value))}
                                />
                            </div>
                            {/* <div className="input-fields-group mt-4">
                                <CustomInput
                                    placeholder="Password" 
                                    type="password" 
                                    onChange={((e)=>SetPassword(e.target.value))}
                                />
                            </div>
                            <div className="input-fields-group mt-4">
                                <CustomInput
                                    placeholder="Confirm password" 
                                    type="password" 
                                    onChange={((e)=>SetConfrimPassword(e.target.value))}
                                />
                            </div> */}
                            <div className="mt-5 text-center">
                              {
                                !loader?
                                <RoundButton text="Send Verification code" click={Reset} />
                                :<Loader type={"Bars"} height={50} color={"#212529"} />
                              }
                            </div>
                        </div>
                        <div className="px-5 text-start mb-5">
                            <a href="/" className="f-14 text-decoration-none cursor-pointer" 
                                style={Style.forgot}>
                                Back to Login
                            </a>
                        </div>
                    </Col>
                </Row>
            </div>    
        </div>
    )
}

export default ResetPassword 