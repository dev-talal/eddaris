import React,{useEffect,useState} from 'react'
import Loader from 'react-loader-spinner'
import swal from 'sweetalert'
import Services from '../../../services'
import Table from '../components/Table'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {Trash , Pencil} from 'react-bootstrap-icons'
const ManageUsers = () => {
    const [users,setUsers] = useState()
    const [loading,setLoader] = useState(true)
    const [modalShow, setModalShow] = useState(false)
    const [Name, setName] = useState("")
    const [Email, setEmail] = useState("")
    const [Phone, setPhone] = useState("")
    const [Location, setLocation] = useState("")
    const [updateKey, setKey] = useState()
    const [loadingId, setLoadingId] = useState({})
    const [loader,setLoad] = useState()
    const cols =  ["Name","Email","Location","Phone","Action"]
    useEffect(() => {
        setLoader(true)
        if(!users || users==undefined){
          fetchData()
        }else{
            setLoader(false)
        }
    }, [users]); 
    const fetchData = async () => {
        try {
            let response = await Services.admin.getUsers();
            const data = response.data;
            data.map((item, key) => {
                item["action"] = (
                    <div>
                        <span
                            className="me-3 text-primary cursor-pointer"
                            onClick={() => setModalData(key,data)}
                        >
                            <Pencil size={18} />
                        </span>
                        <span className="text-danger cursor-pointer" 
                            onClick={(()=>deleteUser(data,key))}>
                            <Trash size={18} />
                        </span>
                    </div>
                );
            });
            setUsers(data);
            setLoader(false);
        } catch (error) {
            setLoader(false);
        }
    };      
    const setModalData = (key,record) => {
        setModalShow(true)
        const data = record[key]
        setName(data.name)
        setEmail(data.email)
        setLocation(data.location)
        setPhone(data.phone_no)
        setKey(key)
    }
    const changeRecord = (type , value) => {
        switch(type){
         case "Email":
            setEmail(value)
            break
         case "Name":
            setName(value)
            break
         case "Location":
            setLocation(value) 
            break
         case "Phone Number":
            setPhone(value)
            break
        }
    }
    const customField = (Obj) => {
        return(
            Obj.map((item,key) => {
                return(
                    <input className="form-control bordered f-14 mb-3"
                        onChange={(e) => changeRecord(item, e.target.value)} 
                        key={key}
                        value={
                            item=="Email"?Email:
                            item=="Name"?Name:
                            item=="Location"?Location:
                            item=="Phone Number"?Phone:null
                        }
                        type={item=="Phone Number"?"number":
                        item=="Email"?"email":"text"}
                        placeholder={item} 
                        disabled={item=="Email"?true:false}
                    />
                )
            })
        )
    }
    const setEleLoader = (type , target) => {
        const id  = target;
        setLoadingId(ids => ({
            ...ids,
            [id]: type==true?true:false
        }));
    }
    const updateUser = (id) => {
        const record = users[updateKey]
        setEleLoader(true,id)
       Services.admin.userUpdate(Name,Location,Phone,record._id).then((response) => {
        let updateObject = record
        updateObject['location'] = response.data.location
        updateObject['phone_no'] = response.data.phone_no
        updateObject['name'] = response.data.name
        setUsers(
         [
           ...users.slice(0,updateKey),
            updateObject,
            ...users.slice(updateKey+1)
         ]
        )
        setModalShow(false)
       }).catch((error)=>{

       }).finally(() => {
        setEleLoader(false,id)
       })
    }
    const deleteUser = (record,key) => {
        setLoad(true)
        swal({
            title: "Are you sure?",
            text: "Are you sure you want to delete this user?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                const data = record[key]
                Services.admin.deleteUser(data._id).then((response) => {
                    swal("User deleted successfully", {
                        icon: "success",
                    });
                    setUsers(users=>users.filter(i => i._id !== data._id))
                }).catch((error)=>{
    
                })
            }
        });
    }
    return (
        <div className="px-4 py-5">
            <h5 className="medium f-22">Manage Users</h5>
            {   
                !loading?
                <>
                    <div className="mt-4">
                        <Table columns={cols} data={users} colClass={'bg-white'} />
                    </div>
                    <Modal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        >
                        <Modal.Header closeButton>
                            <Modal.Title className="f-18" id="contained-modal-title-vcenter">
                                Update User Profile
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {customField(["Name","Email","Location","Phone Number"])}
                        </Modal.Body>
                        <Modal.Footer>
                            {loadingId['updateRecord00'] ? 
                               <div>
                                    <Loader
                                        type="ThreeDots"
                                        color="#29abe1"
                                        height={35}
                                        width={35}
                                    />
                                </div>
                              :
                              <Button type="submit" className="f-14 btn-success" id="updateRecord00" onClick={(()=>updateUser('updateRecord00'))}>Update User</Button>
                            }
                        </Modal.Footer>
                    </Modal>
                </>    
                :
                <div className="text-center">
                    <Loader type={"Bars"} width={50} color={"#212529"} />
                </div>
            }
        </div>
    )
}

export default ManageUsers