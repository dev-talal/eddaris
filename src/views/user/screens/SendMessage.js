import React,{useEffect,useState} from 'react'
import keys from '../../../constant/keys'
import {useHistory} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {mailImage} from '../../Widgets/AllImages'
import {
    RoundButton,
    CustomInput,
    CustomTextArea
} from '../components/FormElements'
import Services from '../../../services'
const SendMessage = () => {
    const [name,setName] = useState()
    const [message,setMessage] = useState()
    const [apiMessage,setApiMessage] = useState()
    const [loader,setLoader] = useState(false)
    const localData = localStorage.getItem('qrData')
    const getUrl = JSON.parse(localData)
    const history = useHistory()
    useEffect(() => {
        if(!getUrl){
            history.push('/qrScan')
            return
        }else{
            if(!localStorage.getItem(keys.Preference.ACCESS_TOKEN)){
              history.push('/?redirect=response')
            }else if(JSON.parse(localStorage.getItem('user')).user_type!=="user"){
                localStorage.removeItem(keys.Preference.ACCESS_TOKEN)
                localStorage.removeItem('user')
                history.push('/?redirect=response')
            }
        }
    }, [])
    const submitResponse = () => {
        setApiMessage(null)
        if(!message || !name){
            setApiMessage({class:"text-danger",message:"Fields should not be empty"})
            window.scrollTo(0,0)
            return
        }
        setLoader(true)
        let responseId = getUrl.id
        Services.admin.sendQrResponse(responseId,name,message).then((response) => {
            setApiMessage({class:"text-success",message:"Qr response successfully submitted"})
            localStorage.removeItem('qrData')
            window.scrollTop(0)
        }).catch((error) => {
           const {response} = error
        //    console.log(response)
           setApiMessage({class:"text-danger",message:response.data.message})
        }).finally(()=>{
            setLoader(false)
            window.scrollTo(0,0)
        })
    }
    return (
        <div className="p-5 my-5">
            <Row className="align-items-center">
                <Col xs={12} md={6}>
                    <div>
                        <h3 className="text-black semibold 
                           mb-2 f-33">
                           Leave a Message for Sender.
                        </h3>
                        <p className="medium 
                           color-purple f-18">Know something we don’t?
                            <br /> We’d love to hear from you...
                        </p>
                        {apiMessage?
                            <div className={`f-14 mb-3 ${apiMessage.class}`}>
                                {apiMessage.message}
                            </div>
                        :null}
                        <div>
                            <CustomInput 
                                placeholder="What's your name?"
                                type="text"
                                onChange={((e)=>setName(e.target.value))} 
                            />
                        </div>
                        <div className="mt-3">
                            <CustomTextArea 
                            onChange={((e)=>setMessage(e.target.value))}
                            placeholder="Message" />
                        </div>
                        <div className="mt-5 text-center">
                            {!loader?
                                <RoundButton
                                click={submitResponse} text="send" />
                            :
                            <Loader height={50} width={50} color={'#1d1d1d'}
                            type={'ThreeDots'} />}
                        </div>
                    </div>
                </Col>
                <Col xs={12} md={6} className="mt-5 mt-md-0">
                    <div className="text-center">
                        <img className="img-fluid" src={mailImage} />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default SendMessage