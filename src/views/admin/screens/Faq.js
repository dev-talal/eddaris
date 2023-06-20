import React, { Component } from 'react';
import Services from '../../../services';
import Loader from "react-loader-spinner";
import Accordion from "react-bootstrap/Accordion";
import { Pencil, Trash, PlusCircle } from 'react-bootstrap-icons'
export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AddForm: false,
            result: [],
            loading: false,
            question: "",
            answer: "",
            successMessage: '',
            AddLoader: false,
            editId: "",
            loader: false,
            LoadingId: {"id":"","show":false}
        };
    }
    AddFaq = () => {
        this.setState({
            loading:true
        })
        // this.setState({AddLoader:true});
        Services.admin.AddFaqs(this.state.question,this.state.answer).then(response => {
            this.setState({
                successMessage: response.data.message,
                AddLoader: false,
                answer: "",
                question: ''
            })
            this.setState({
                AddForm: false,
                result: [...this.state.result, response.data]
            })
        }).catch((error) => {
            this.setState({
                message: error.message
            })
        }).finally(() => {
            this.setState({
                AddLoader: false,
                loading:false
            })
        })
    }
    showFaqList = () => {
        Services.admin.getFaqs().then(response => {
            this.setState({
                result: response.data,
                loading: false
            })
        }).catch((error) => {
            this.setState({
                message: error.message
            })
        }).finally(() => {
            this.setState({
                loading: false,
                loader: false
            })
        })
    }
    editFaq = (event, index, id) => {
        event.stopPropagation();
        const data = this.state.result[index]
        this.setState({
            AddForm: true,
            question: data.question,
            answer: data.answer,
            editId: {"id":id,"nested":index}
        })
    }
    editQuery = () => {
        this.setState({
            loading:true
        })
        Services.admin.editFaqs(this.state.question,this.state.answer,this.state.editId.id).then(response => {
            let data = this.state.result;
            data[this.state.editId.nested].question=this.state.question;
            data[this.state.editId.nested].answer=this.state.answer;
            this.setState({
                editId: "",
                resutl:data,
                AddForm:false
            })
        }).catch((error) => {
            this.setState({
                message: error.message
            })
        }).finally(() => {
            this.setState({
                loading: false,
                loader: false
            })
        })
    }
    DeleteFaq = (event, target_id, index) => {
        event.stopPropagation()
        this.setState({
            LoadingId: {"id":target_id,"show":true}
        });
        Services.admin.deleteFaq(target_id).then(response => {
            const record = [...this.state.result];
            record.splice(index, 1);
            this.setState(state => ({
                result: record,
                editId: ""
            }));
        }).catch((error) => {
            this.setState({
                message: error.message
            })
        }).finally(() => {
            this.setState({
                loading: false,
                LoadingId: {"id":"","show":false}
            })
        })
    }
    componentDidMount() {
        this.setState({
            loader: true
        })
        this.showFaqList()
    }
    render() {
        const StyledButton = {
            borderRadius: "10px",
            background: "#05278D",
            paddingTop: "11px",
            paddingBottom: "11px",
            outline: "none"
        }
        const FontStyle = {
            fontSize: "20px"
        }
        return (
            <>
                <div className="container-fluid p-4">
                    <div className="d-flex flex-wrap align-items-center pt-2">
                        <div>
                            <h5 className="mb-0 f-22 medium">FAQ's</h5>
                        </div>
                        {this.state.loader ? null :
                        <div className="ms-auto">
                            <button className="top-header-btn border-0 text-white px-4 
                                f-14 d-flex align-items-center justify-content-center"
                                type="button" onClick={() => this.setState({ AddForm: !this.state.AddForm })}
                                style={StyledButton}>
                                <PlusCircle className="me-2" size={19} style={FontStyle} />
                                Add New
                            </button>
                        </div>
                        }
                    </div>
                    {this.state.loader ?
                        <div className="text-center">
                            <Loader type={"Bars"} width={50} color={"#212529"} />
                        </div>
                        :
                        <>
                            {this.state.AddForm ?
                                <div className="bg-white shadow mb-3 p-3 mt-5" style={{ borderRadius: '10px' }}>
                                    <h1 className="font-weight-bold text-black f-22 ml-5 pt-2">Add New FAQ</h1>
                                    {this.state.AddLoader ?
                                        <div className="px-3 text-center">
                                            <Loader
                                                type="TailSpin"
                                                color="#84bbfd"
                                                height={70}
                                                width={70}
                                            />
                                        </div>
                                        :
                                        <div className="row">
                                            <div className="col-md-7 m-auto">
                                                {this.state.successMessage ?
                                                    <div className="alert alert-success mt-4 alert-dismissible">
                                                        <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
                                                        {this.state.successMessage}
                                                    </div>
                                                    : null}
                                                <div className="mt-5">
                                                    <input className="form-control bordered f-14" value={this.state.question}
                                                        onChange={(input) => this.setState({ question: input.target.value })}
                                                        placeholder="Question"
                                                    />
                                                    <textarea className="form-control bordered mt-3 f-14 disbale-resize"
                                                        value={this.state.answer} rows={5} cols={4}
                                                        onChange={(input) => this.setState({ answer: input.target.value })} placeholder="Answer"></textarea>
                                                    <div className="text-right mt-5">
                                                        {this.state.loading?
                                                          <Loader type="ThreeDots" height={40} width={40} color="#212529" />
                                                        :
                                                        <>
                                                            <button className="text-danger 
                                                                font-weight-bold bg-white border-0 me-4 f-14" type="button"
                                                                onClick={() => this.setState({ AddForm: !this.state.AddForm })}>
                                                                Cancel
                                                            </button>
                                                            <button className="btn bg-purple text-white p-0 f-14 medium px-4 py-1"
                                                                type="button" style={{ height: "40px", borderRadius: '10px' }}
                                                                onClick={e =>
                                                                this.state.editId == "" ?
                                                                this.AddFaq() :
                                                                this.editQuery()}>
                                                                Submit
                                                            </button>
                                                        </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>}
                                    </div>
                                : null}
                            <div className="w-100 mt-4">
                                <Accordion>
                                    {this.state.result.map((list, index) =>
                                            <Accordion.Item eventKey={list._id} key={index}
                                                className="shadow mb-2" style={{ borderRadius: "10px", overflow: "hidden" }}>
                                                <Accordion.Header className="f-14 medium custom-acc-button">
                                                    {list.question}
                                                    <div className="ms-auto d-flex me-3">
                                                        {this.state.LoadingId.id==list._id && this.state.LoadingId.show==true?
                                                            <>
                                                              <Loader type="ThreeDots" height={17.66} width={17.66} color="#212529" />
                                                            </>
                                                        :
                                                           <>
                                                                <div className="border-0 bg-transparent text-primary me-2"
                                                                    onClick={e => this.editFaq(e, index, list._id)} type="button">
                                                                    <Pencil size={17} style={FontStyle} />
                                                                </div>
                                                                <div className="border-0 bg-transparent mr-2 ml-1 text-danger" type="button">
                                                                    <Trash size={17}
                                                                        onClick={e => this.DeleteFaq(e, list._id, index)}
                                                                        style={FontStyle}
                                                                    />
                                                                </div>
                                                            </>    
                                                        }
                                                    </div>
                                                </Accordion.Header>
                                                <Accordion.Body className="f-13">
                                                    {list.answer}
                                                </Accordion.Body>
                                            </Accordion.Item>
                                    )}
                                </Accordion>
                            </div>
                        </>}
                </div>
            </>
        )
    }
}