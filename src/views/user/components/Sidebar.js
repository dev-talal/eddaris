import React from 'react'
import {People , HouseDoor , GraphUp , Code , 
 QuestionCircle} from 'react-bootstrap-icons'
import {logo} from '../../Widgets/AllImages'
import {Link,useLocation} from 'react-router-dom'
const Sidebar = (props) => {
    const location = window.location.href.indexOf("/admin") > -1 ? true : false
    const UlSpacing = location?"mt-4 pt-1":"pt-5 mt-3"
    const {collapse} = props;
    const locationPath = useLocation()
    return (
        <aside data-collapse={collapse} className="app-sidebar" id="app-sidebar">
            <nav>
                <div className="text-center px-2 mt-2">
                    <img src={logo} height="20px" />
                </div>
                <ul className={`list-unstyled w-fit-content mx-auto pt-4 sidebar-links ${UlSpacing}`}>
                    <li className="mb-2">
                        <Link to={location?"/admin/dashboard":"/user/dashboard"} className={`text-decoration-none 
                            py-2 d-block px-4 link-grey ${locationPath.pathname=="/admin/dashboard" || locationPath.pathname=="/user/dashboard"?"active":""}`}>
                            <HouseDoor className="me-2" />
                            {!collapse?<span className="f-13">Dashboard</span>:null}
                        </Link>
                    </li>
                    <li className="mb-2">
                        <Link to={location?"/admin/manageUsers":"/user/downloadReport"} className={`text-decoration-none 
                            py-2 d-block px-4 link-grey ${locationPath.pathname=="/admin/manageUsers" || locationPath.pathname=="/user/downloadReport"?"active":""}`}>
                            <People className="me-2" />
                            {!collapse?
                            <span className="f-13">
                                {location?
                                    "Manage Users":
                                    "Download Reports"
                                }
                            </span>:null}
                        </Link>    
                    </li>
                    {location?
                        <>
                            <li className="mb-2">
                                <Link to="/admin/printerReports"  className={`text-decoration-none 
                                    py-2 d-block px-4 link-grey ${locationPath.pathname=="/admin/printerReports"?"active":""}`}>
                                    <GraphUp className="me-2" />
                                    {!collapse?
                                    <span className="f-13">Printer Reports</span>:null}
                                </Link>    
                            </li>
                            <li className='mb-2'>
                                <Link to="/admin/faq" className={`text-decoration-none 
                                    py-2 d-block px-4 link-grey ${locationPath.pathname=="/admin/faq"?"active":""}`}>
                                    <QuestionCircle className="me-2" />
                                    {!collapse?
                                    <span className="f-13">Add/Edit FAQ's</span>:null}
                                </Link>    
                            </li>
                            {/* <li>
                                <Link to="/admin/qr-templates" className="text-decoration-none
                                    py-2 d-block px-4 link-grey">
                                    <Code className="me-2" />
                                    {!collapse?
                                    <span className="f-13">Qr Templates</span>:null}
                                </Link>    
                            </li> */}
                        </>    
                        :null
                    }
                </ul>
            </nav>
            {location?
                <style>{`
                    body{
                        background:#F5F6FA !important;
                    }
                `}</style>
            :null}
        </aside>
    )
}

export default Sidebar