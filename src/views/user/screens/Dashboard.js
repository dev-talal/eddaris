import React,{useEffect,useState} from 'react'
import {useHistory} from 'react-router-dom'
import DownloadTile from '../components/DownloadTile'
import DownloadQr from '../components/DownloadQr'
import {Building} from 'react-bootstrap-icons'
import Col from 'react-bootstrap/Col'
import QrBox from '../components/QrBox'
import Services from '../../../services'
// import * as html2canvas from 'html2canvas'
const Dashboard = () => {
    const [downloads,setDownloads] = useState()
    const history = useHistory()
    
    const TotalGet = async () => {
        try {
            let response = await Services.admin.getDownloads()
            const data = response.data;
            setDownloads(data.counts)
        } catch (error) {
            
        }
    }
    const changeData =  () => {
        TotalGet()
    }
    useEffect(() => {
        switch(JSON.parse(localStorage.getItem('user')).user_type){
            case "admin":
            history.push('/admin/dashboard')
            break
        }
        TotalGet()
    }, [])
    return (
        <div className="px-4 py-5">
            <Col xs={12} md={6} lg={3} xl={4}>
                <DownloadTile 
                    Icon={Building}
                    IconClass="orange-color"
                    IconBgClass="bg-orange-t"
                    heading="Total Downloads"
                    value={downloads?downloads:"..."}
                />
            </Col>
            <div className="mt-5 pt-5">
               <DownloadQr changeDownloads={changeData} />
            </div>
            {
                <style>{`
                  body{
                   background:#F5F6FA;
                  }
                `}</style>
            }
        </div>
        
    )
    
}

export default Dashboard