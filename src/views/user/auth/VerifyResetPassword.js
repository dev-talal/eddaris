import React,{useState,useEffect} from 'react'
import {useHistory,useLocation,Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Services from '../../../services'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Style from './Style/Style'
import {RoundButton,CustomInput} from '../components/FormElements'
import LeftContent from './Widgets/LeftContent'
const VerifyResetPassword = () => {
    const history = useHistory()
    const location = useLocation()
    const [password,SetPassword] = useState()
    const [confirmPassword,SetConfirmPassword] = useState()
    const [Message,setMessage] = useState()
    const [loader,setLoader] = useState(false)
    const userProfile = JSON.parse(localStorage.getItem('user'))
    const query = new URLSearchParams(location.search);
    const queryData = query.get('user')
    const Reset = () => {
        setLoader(true)
        setMessage(null)
        if (password!==confirmPassword) {
            setMessage({message:"Password and confirm password did'nt matched",class:"text-danger"})
            setLoader(false)
            return
        }
        else{
            Services.admin.changePassword(queryData,password,confirmPassword).then((response) => {
                setMessage({message:"Password has been changed successfully",class:"text-success"})
               setTimeout(() => {
                history.push('/')
               }, 3000);
            }).catch((error) => {
                const { response } = error
                setMessage({message:response.data.message,class:"text-danger"})
            }).finally(() => {
                setLoader(false)
            })
        }
        
    }
    useEffect(() => {
        if(!queryData){
            history.push('/')
        }
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
                    <Col className="px-0 pb-5" md={6}>
                        <div className="px-5 pt-5 pb-4">
                            <h4 className="mb-4 mt-5 semibold f-33">Reset Password</h4>
                            {Message?
                            <div className={`mb-4 ${Message.class}`}>
                                {Message.message}
                            </div>
                            :null}
                            <div className="input-fields-group mt-4">
                                <CustomInput
                                    placeholder="Enter Password" 
                                    type="password"
                                    onChange={((e)=>SetPassword(e.target.value))}
                                />
                            </div>
                            <div className="input-fields-group mt-4">
                                <CustomInput
                                    placeholder="Enter Confirm Password" 
                                    type="password"
                                    onChange={((e)=>SetConfirmPassword(e.target.value))}
                                />
                            </div>
                            <div className="mt-5 text-center">
                              {
                                !loader?
                                <RoundButton text="Change Password" click={Reset} />
                                :<Loader type={"Bars"} height={50} color={"#212529"} />
                              }
                                <div className="text-start mt-3">
                                    <Link to="/" className="f-14 text-decoration-none cursor-pointer" 
                                        style={Style.forgot}>
                                        Back to Login
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </Col>
                </Row>
            </div>    
        </div>
    )
}

export default VerifyResetPassword