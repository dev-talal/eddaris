import React,{useState,useEffect} from 'react'
import {useHistory,useLocation} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Services from '../../../services'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Style from './Style/Style'
import {RoundButton,CustomInput} from '../components/FormElements'
import LeftContent from './Widgets/LeftContent'
const Register = () => {
    const history = useHistory()
    const location = useLocation()
    const [name,SetName] = useState()
    const [email,SetEmail] = useState()
    const [password,SetPassword] = useState()
    const [confirmPassword,SetConfrimPassword] = useState()
    const [Message,setMessage] = useState()
    const [loader,setLoader] = useState(false)
    const userProfile = JSON.parse(localStorage.getItem('user'))
    const query = new URLSearchParams(location.search);
    const queryData = query.get('redirect')
    const Register = () => {
        setLoader(true)
        setMessage(null)
        if(!name || !email || !password){
          setMessage({message:"Fields should not be empty.",class:"text-danger"})
          setLoader(false)
          return
        }else{
            const pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(email)) {
                setMessage({message:"Please enter valid email address.",class:"text-danger"})
                setLoader(false)
                return
            }
            else if(confirmPassword!==password){
                setMessage({message:"Password and Confirm password did not matched.",class:"text-danger"})
                setLoader(false)
                return
            }else{
                Services.admin.register(name,email,password,"user").then((response) => {
                    setMessage({message:"user successfully registerd.",class:"text-success"})
                    setTimeout(() => {
                        if(queryData){
                            history.push('/?redirect=response')
                        }else{
                            history.push('/')
                        }
                    }, 600);
                }).catch((error) => {
                    const { response } = error
                    if(response.data.email){
                      setMessage({message:response.data.email,class:"text-danger"})
                    }
                }).finally(() => {
                    setLoader(false)
                })
            }
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
           <div className="mx-0 px-md-5 px-4" style={Style.HeightFullScreen}>
                <Row className="bg-white my-5" style={Style.RowDesign}>
                    <Col className="px-0" md={6}>
                        <LeftContent />
                    </Col>
                    <Col className="px-0" md={6}>
                        <div className="px-md-5 px-4 pt-md-5 pt-4 pb-4">
                            <h4 className="mb-4 mt-md-5 mt-4 semibold f-33">Sign Up</h4>
                            {Message?
                            <div className={`mb-4 ${Message.class}`}>
                                {Message.message}
                            </div>
                            :null}
                            <div className="input-fields-group">
                                <CustomInput
                                    placeholder="Full name" 
                                    type="text"
                                    onChange={((e)=>SetName(e.target.value))}
                                />
                            </div>
                            <div className="input-fields-group mt-4">
                                <CustomInput
                                    placeholder="Email" 
                                    type="email"
                                    onChange={((e)=>SetEmail(e.target.value))}
                                />
                            </div>
                            <div className="input-fields-group mt-4">
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
                            </div>
                            <div className="mt-5 text-center">
                              {
                                !loader?
                                <RoundButton text="sign up" click={Register} />
                                :<Loader type={"Bars"} height={50} color={"#212529"} />
                              }
                            </div>
                        </div>
                        <div className="px-5 text-start" style={Style.SocialColor}>
                            <h5 className="pb-5 f-14">
                                By tapping Signup you agree to our Terms of Service and
                                Privacy Policy.
                            </h5>
                        </div>
                    </Col>
                </Row>
            </div>    
        </div>
    )
}

export default Register