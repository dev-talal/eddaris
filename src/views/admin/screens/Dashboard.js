import React,{ useEffect,useState } from 'react'
import Services from '../../../services'
import Loader from 'react-loader-spinner'
import DownloadTile from '../../user/components/DownloadTile'
import { Building, PeopleFill , ThreeDots } from 'react-bootstrap-icons'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Table from '../components/Table'
const Dashboard = () => {
    const [users,addUsers] = useState()
    const [downloads,setDownloads] = useState()
    const [loading,setLoader] = useState(true)
    const cols = ["Name","Email"]
    const fetchData = async () => {
        try {
            let response = await Services.admin.getUsers()
            const data = response.data;
            addUsers(data)
        } catch (error) {

        }
        finally {
            setLoader(false)
        }
        try {
            let response = await Services.admin.getDownloads()
            const data = response.data;
            setDownloads(data.counts)
        } catch (error) {
            
        }
    }
    useEffect(() => {
        setLoader(true)
        fetchData()
    }, [])
    return (
        <div className="px-4 py-5">
            <Row>
                <Col xs={12} md={6} lg={3} xl={4}>
                    <DownloadTile
                        Icon={Building}
                        IconClass="orange-color"
                        IconBgClass="bg-orange-t"
                        heading="Total Downloads"
                        value={
                            downloads?parseInt(downloads).toLocaleString():"..."
                        }
                    />
                </Col>
                <Col xs={12} md={6} lg={3} xl={4}>
                    <DownloadTile
                        Icon={PeopleFill}
                        IconClass="blue-color"
                        IconBgClass="blue-bg-t"
                        heading="Total Users"
                        value={
                            users?parseInt(users.length).toLocaleString():"..."
                        }
                    />
                </Col>
                <Col xs={12}>
                    <div className="bg-white shadow rounded w-100 mt-5 p-4">
                        <div className="row ml-0 mr-0">
                            <div className="col-6">
                              <p className="font-weight-bold text-black font-20">User List</p>
                            </div>
                            <div className="col-6 text-end">
                              <ThreeDots />
                            </div>
                        </div>
                        {!loading?
                            <div className="mt-3">
                                <Table columns={cols} data={users} />
                            </div>
                        :
                            <div className="text-center">
                                <Loader type={"Bars"} width={50} color={"#212529"} />
                            </div>
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}
export default Dashboard