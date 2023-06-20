import React,{useState} from 'react'
import Services from '../../services'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {RoundButton} from '../user/components/FormElements'
import Loader from 'react-loader-spinner'
const Setting = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [Name, setName] = useState(user.name)
    const [Email, setEmail] = useState(user.email)
    const [Password, setPassword] = useState("")
    const [Confirm_password, setCPassword] = useState("")
    const [message, setMessage] = useState("")
    const [loader,setLoader] = useState(false)
    const changeRecord = (type , value) => {
        switch(type){
         case "Email":
            setEmail(value)
            break
         case "Name":
            setName(value)
            break
         case "Password":
            setPassword(value) 
            break
         case "Confirm Password":
            setCPassword(value)
            break
        }
    }
    const updateUser = () => {
        setMessage('')
        if(!Name){
            setMessage({message:'Name should not be empty',class:"text-danger"})
            return
        }
        if(Password==Confirm_password){
            setLoader(true)
            Services.admin.updateProfile(Name,Password).then((response) => {
            const setObj = user
            setObj.name = response.data.user.name
            const setPar = JSON.stringify(setObj)
            localStorage.setItem('user',setPar)
            setMessage({message:response.data.message,class:"text-success"})
            setTimeout(() => {
                window.location.reload()
            }, 1500);
            }).catch((error) => {
              const {response} = error
              setMessage({message:response.data.message?response.data.message:"An erro occured"
              ,class:"text-danger"})
            }).finally(() => {
                setLoader(false)
            })
        }else{
            setMessage({message:"Password and Confirm password did'nt matched",class:"text-danger"})
        }
    }
    const customField = (Obj) => {
        return(
            Obj.map((item,key) => {
                return(
                    <Col sm={6} key={key}>
                        <label className="mb-2 f-13">{item}</label>
                        <input className="form-control h-45 bordered f-13 mb-4"
                            onChange={(e) => changeRecord(item, e.target.value)} 
                            value={
                                item=="Email"?Email:
                                item=="Name"?Name:
                                item=="Password"?Password:
                                item=="Confirm Password"?Confirm_password:null
                            }
                            type={item=="Password" || item=="Confirm Password"? "password":
                            item=="Email"?"email":"text"}
                            disabled={item=="Email"?true:false}
                        />
                    </Col>
                )
            })
        )
    }
    return (
        <div className="px-4 pb-5 pt-4">
           <h5 className="medium f-22 mb-4">Settings</h5>
           <Col md={10} lg={9} xl={8} className="mx-auto">
                <div className="bg-white shadow rounded w-100 mt-5 p-4">
                    {message?
                      <p className={`f-14 mb-3 ${message.class}`}>{message.message}</p>
                      :null
                    }
                    <Row>
                      {customField(["Name","Email","Password","Confirm Password"])}
                       <Col xs={12} className="mt-4 text-center">
                           {!loader?
                            <RoundButton text="Update profile" click={updateUser} />:
                            <Loader type={"Bars"} width={50} height={50} color={"#212529"} />
                           }
                       </Col>
                   </Row>
                </div>
            </Col>
        </div>
    )
}

export default Setting