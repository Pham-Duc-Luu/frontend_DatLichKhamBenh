import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './DoctorManage.scss';
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import actionTypes from '../../store/actions/actionTypes';
import * as actions from '../../store/actions/index';

class DoctorManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentHTML: '',
            contentMarkDown: '',
            description: '',
            doctorId: '',
            clinicId: '',
            specialtyId: '',
            selectedOption: {},
            doctorList: [],
        };
    }

    componentDidMount() {
        this.props.getAllDoctor();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allDoctor !== prevProps.allDoctor) {
            this.setState({
                doctorList: this.props.allDoctor.map((value, index) => {
                    return { value: value, label: `${value.firstName} ${value.lastName}` };
                }),
            });
        }
        if (this.props.saveDoctorDetailResponse !== prevProps.saveDoctorDetailResponse) {
            this.setState({
                contentHTML: '',
                contentMarkDown: '',
                description: '',
                doctorId: '',
                selectedOption: {},
            });
        }
        if (this.props.getDoctorDetailByIdResponse !== prevProps.getDoctorDetailByIdResponse) {
            console.log(this.props.getDoctorDetailByIdResponse);
            this.setState({
                contentHTML:
                    this.props.getDoctorDetailByIdResponse.data &&
                    this.props.getDoctorDetailByIdResponse.data.MarkDown &&
                    this.props.getDoctorDetailByIdResponse.data.MarkDown.contentHTML !== null
                        ? this.props.getDoctorDetailByIdResponse.data.MarkDown.contentHTML
                        : '',
                contentMarkDown:
                    this.props.getDoctorDetailByIdResponse.data &&
                    this.props.getDoctorDetailByIdResponse.data.MarkDown &&
                    this.props.getDoctorDetailByIdResponse.data.MarkDown.contentMarkDown !== null
                        ? this.props.getDoctorDetailByIdResponse.data.MarkDown.contentMarkDown
                        : '',
                description:
                    this.props.getDoctorDetailByIdResponse.data &&
                    this.props.getDoctorDetailByIdResponse.data.MarkDown &&
                    this.props.getDoctorDetailByIdResponse.data.MarkDown.description !== null
                        ? this.props.getDoctorDetailByIdResponse.data.MarkDown.description
                        : '',
                // doctorId:
                //     this.props.getDoctorDetailByIdResponse.data &&
                //     this.props.getDoctorDetailByIdResponse.data.MarkDown &&
                //     this.props.getDoctorDetailByIdResponse.data.MarkDown.doctorId !== null
                //         ? this.props.getDoctorDetailByIdResponse.data.MarkDown.doctorId
                //         : '',
                clinicId:
                    this.props.getDoctorDetailByIdResponse.data &&
                    this.props.getDoctorDetailByIdResponse.data.MarkDown &&
                    this.props.getDoctorDetailByIdResponse.data.MarkDown.clinicId !== null
                        ? this.props.getDoctorDetailByIdResponse.data.MarkDown.clinicId
                        : '',
                specialtyId:
                    this.props.getDoctorDetailByIdResponse.data &&
                    this.props.getDoctorDetailByIdResponse.data.MarkDown &&
                    this.props.getDoctorDetailByIdResponse.data.MarkDown.specialtyId !== null
                        ? this.props.getDoctorDetailByIdResponse.data.MarkDown.specialtyId
                        : '',
            });
        }
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption, doctorId: selectedOption.value.id }, () => {
            console.log(this.state);
        });
        this.props.getDoctorDetailById(selectedOption.value.id);
        // console.log(selectedOption.value.id);
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkDown: text,
        });
    };

    render() {
        const mdParser = new MarkdownIt(/* Markdown-it options */);
        // console.log(this.state);
        return (
            <div className="doctor-manage p-2">
                <div className="container">
                    <div className="row my-2">
                        <div className="doctor-select col">
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.doctorList}
                            />
                        </div>
                        <div className="doctor-description col border rounded">
                            <label for="description" className="">
                                Descriptions
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                onChange={(e) => {
                                    this.setState({ description: e.target.value });
                                }}
                                value={this.state.description}
                            ></textarea>
                        </div>
                    </div>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkDown}
                    />

                    <div
                        className="doctor-manage-submit btn btn-warning px-2 m-4"
                        onClick={() => {
                            this.props.saveDoctorDetail({
                                contentHTML: this.state.contentHTML,
                                contentMarkDown: this.state.contentMarkDown,
                                description: this.state.description,
                                doctorId: this.state.doctorId,
                            });

                            console.log(this.state);
                        }}
                    >
                        Submit
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allDoctor: state.admin.allDoctor,
        saveDoctorDetailResponse: state.admin.saveDoctorDetailResponse,
        getDoctorDetailByIdResponse: state.admin.getDoctorDetailByIdResponse,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctor: () => dispatch(actions.getAllDoctor()),
        saveDoctorDetail: (data) => dispatch(actions.saveDoctorDetail(data)),
        getDoctorDetailById: (id) => dispatch(actions.getDoctorDetailById(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
