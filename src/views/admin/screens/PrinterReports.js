import React,{useState,useEffect} from 'react'
import { DateRangePicker } from 'rsuite'
import Loader from 'react-loader-spinner'
import 'rsuite/dist/styles/rsuite-default.css'
import Col from 'react-bootstrap/Col'
import {ThreeDots} from 'react-bootstrap-icons'
import Services from '../../../services'
const PrinterReports = () => {
    const [loader,setLoader] = useState(false)
    const [startRange,setStartRange] = useState()
    const [endRange,setEndRange] = useState()
    const [result,setResult] = useState()
    const [downloads,setDownloads] = useState()
    const convert = (str , type) => {
        const
        da = new Date(str),
        ms = da.getTime() + 86400000,
        date = type=="end"?new Date(ms):new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }
    const fetchList = (start,end) => {
        Services.admin.downloadByRange(start,end).then((response) => {
            setResult(response.data.counts)
            const dataCount = response.data.counts.reduce((sum, { countsOfObj }) => 
            sum + countsOfObj, 0)
            setDownloads(dataCount)
            
        }).catch(() => {
    
        }).finally(() => {
            setLoader(false)
        })
    }
    const rangeDownloadGet = (value) => {
        const start = convert(value[0],"start"),
        end = convert(value[1],"end");
        if(value.length>1){
            setLoader(true)
            fetchList(start,end)
            const startDate = getDateName(value[0])
            const endDate = getDateName(value[1])
            setStartRange(startDate)
            setEndRange(endDate)
        }
    }
    const getDateName = (date) => {
        const d = new Date(date);
        const monthNames = ["January", "February", "March", "April", "May", "June",
         "July", "August", "September", "October", "November", "December"
        ];
        return  monthNames[d.getMonth()] + " " + ("0" + date.getDate()).slice(-2) + ", " + d.getFullYear();
    }
    useEffect(() => {
        setLoader(true)
        var date = new Date();
        var end = new Date();
        date.setDate(date.getDate() - 7);
        end.setDate(end.getDate() + 1);
        fetchList(convert(date,"start"),end,"end")
        const startDate = getDateName(date)
        const endDate = getDateName(new Date())
        setStartRange(startDate)
        setEndRange(endDate)
    }, [])
    return (
        <div className="px-4 pb-5 pt-4">
            <div className="text-end">
              <DateRangePicker 
                placement={"bottomEnd"}
                format="YYYY-MM-DD"
                onChange={((value) => 
                    rangeDownloadGet(value)
                )} 
              />
            </div>
            <h5 className="medium f-22 mb-4">Printer Reports</h5>
            <Col xs={12} md={6} lg={4}>
                <div className="bg-cream px-2 py-3 radius-8">
                    <ul className="d-flex list-unstyled align-items-center">
                        <li>Total Downloads</li>
                        <li className="ms-auto"><ThreeDots /></li>
                    </ul>
                    <div className="mt-5 px-2">
                        <h5 className="f-33 color-light-green mb-2">
                            {downloads?
                             parseInt(downloads).toLocaleString()
                            :"0"}
                        </h5>
                        <small className="link-grey f-14">SHOWING RESULT OF FROM</small>
                        <small className="d-block f-14">{startRange} ~ {endRange} </small>
                    </div>
                </div>
            </Col>
            <table className="table mt-5 table-striped border-0 w-100">
                <thead>
                    <tr>
                        <th className="bg-white">Download Amount</th>
                        <th className="bg-white">Date</th>
                    </tr>
                </thead>
                <tbody>
                {!loader?    
                result?
                    result.map((row,index)=>{
                        return(
                        <tr key={index}>
                            <td>{row.countsOfObj}</td>
                            <td>{convert(row.date)}</td>
                        </tr>
                    )
                }):
                <tr><td colspan="12" className="text-center py-4">No Record Found</td></tr>
                :
                <tr><td colspan="12" className="text-center py-4">
                <Loader type={"Bars"} width={50} color={"#212529"} /></td></tr>}
                </tbody>
            </table>
            <style>{`
                body{
                    background:#F5F6FA !important;
                }
            `}</style>
        </div>
    )
}

export default PrinterReports