import React,{ useState , useEffect } from 'react'
import { useLocation , useHistory } from 'react-router'
import Services from '../../../services'
import Loader from 'react-loader-spinner'
import Keys from '../../../constant/keys'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Style from './Style/Style'
import LeftContent from './Widgets/LeftContent'
import {RoundButton,CustomInput} from '../components/FormElements'
import ResetPassword from './ResetPassword'
const Login = () => {
    const history = useHistory()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [message,setMessage] = useState()
    const [loader,setLoader] = useState(false)
    const [resetOpen, setResetOpen] = useState(false)
    const location = useLocation()
    const userProfile = JSON.parse(localStorage.getItem('user'))
    const query = new URLSearchParams(location.search);
    const queryData = query.get('redirect')
    const LoginRequest = () => {
        setMessage("")
        setLoader(true)
        if(!email || !password){
            setMessage("Fields should not be empty")
            setLoader(false)
            return
        }
        Services.admin.login(email,password).then(response => {
            const data = response.data
            // setMessage(response.data.message);
            if(queryData && data.user.user_type=="user"){
                localStorage.setItem(Keys.Preference.ACCESS_TOKEN, data.token)
                localStorage.setItem('user',JSON.stringify(data.user))
                history.push('/sendMessage')
                return
            }else{
                if(queryData){
                    setMessage("Your account type is not user.Please login with user account to Send Response")
                    return
                }
            }
            localStorage.setItem(Keys.Preference.ACCESS_TOKEN, data.token)
            localStorage.setItem('user',JSON.stringify(data.user))
            switch(data.user.user_type){
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
        }).catch((error) => {
            const { response } = error,
            message = response
            if(message){
                setMessage(
                    message.data.email && message.data.password ?
                    "Please enter your email and password":
                    message.data.password?
                    message.data.password:
                    message.data.message?
                    "Please enter correct email":null
                );
            }else{
                setMessage(
                    "An error occured"
                );
            }
            setLoader(false)
        }).finally(() => {
            setLoader(false)
        })
    }
    const Register = () => {
        queryData?
        history.push('/register?redirect=response')
        :
        history.push('/register')
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
            {!resetOpen?
            <div className="mx-0 px-md-5 px-4" style={Style.HeightFullScreen}>
                <Row className="bg-white my-5" style={Style.RowDesign}>
                    <Col className="px-0" md={6}>
                        <LeftContent />
                    </Col>
                    <Col className="px-0" md={6}>
                        <div className="px-md-5 px-4  py-4 py-md-5">
                            <h4 className="mb-4 mt-md-5 mt-4 semibold f-33">Sign In</h4>
                            {message?
                            <div class="mb-4 text-danger">
                                {message}
                            </div>
                            :null}
                            <div className="input-fields-group">
                                <CustomInput
                                  placeholder="Email" type="email" onChange={((e)=>setEmail(e.target.value))}
                                />
                            </div>
                            <div className="input-fields-group mt-4">
                                <CustomInput
                                  placeholder="Password" type="password" onChange={((e)=>setPassword(e.target.value))}
                                />
                            </div>
                            <div className="text-end mt-2">
                                <span className="f-14 cursor-pointer" onClick={()=>setResetOpen(true)} 
                                    style={Style.forgot}>
                                    Forgot password?
                                </span>
                            </div>
                            <div className="mt-5 text-center">
                                {!loader?
                                    <>
                                        <RoundButton
                                          click={LoginRequest} text="Sign in" 
                                        />
                                        <br />
                                        <RoundButton
                                          click={Register} text="Register" 
                                          opacity={"0.5"}
                                        />
                                    </>
                                :   <Loader type={"Bars"} height={50} color={"#212529"} />
                                }
                            </div>
                        </div>
                    </Col>
                </Row>    
            </div>
            :
            <ResetPassword />
            }
        </div>
    )
}

export default Login