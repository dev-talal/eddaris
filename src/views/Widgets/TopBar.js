import React from 'react'
import { useHistory,Link } from 'react-router-dom'
import Keys from '../../constant/keys'
import {ListNested} from 'react-bootstrap-icons'
import {dummy} from './AllImages'
import Dropdown from 'react-bootstrap/Dropdown'
import {
    BoxArrowLeft,Gear
} from 'react-bootstrap-icons'
const TopBar = ({onButtonClick}) => {
    const history = useHistory()
    const userData = JSON.parse(localStorage.getItem('user'))
    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem(Keys.Preference.ACCESS_TOKEN)
        history.push('/')
    }
    return (
        <div>
            <div className="bg-white py-3  px-3 d-flex flex-wrap align-items-center ">
                <div className="menu-trigger">
                    <button className="bg-transparent d-flex align-items-center
                        link-grey f-14 border-0"
                        onClick={() => onButtonClick()}>
                        <ListNested size={20} className="me-2" />
                        Hide Menu
                    </button>
                </div>
                <ul className="list-unstyled noti-prof list-inline mb-0 ms-auto d-flex align-items-center">
                    <li className="list-inline-item">
                        <Dropdown>
                            <Dropdown.Toggle className="bg-transparent border-0 disable-toggle p-0">
                                <img src={dummy} width="30px" height="30px" className="rounded-circle" />
                                <span className="ms-2 f-14 link-grey">{userData['name']}</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item 
                                    className="f-14 mb-2 text-decoration-none">
                                    <Link  to={userData.user_type=="printer"?"/user/settings":"/admin/settings"}
                                        className="text-decoration-none" style={{color:"#212529"}}>    
                                        <span><Gear className="me-1" size={20} /> Settings </span>
                                    </Link>
                                </Dropdown.Item>
                                <Dropdown.Item href="#" className="f-14 text-decoration-none" onClick={logout}>
                                    <span><BoxArrowLeft className="me-1" size={20} /> Logout </span>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
            </div>
            <style>{`
                body{
                    background:#F5F6FA !important;
                }
            `}</style>
        </div>
    )
}
export default TopBar
