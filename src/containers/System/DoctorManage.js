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

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

            priceSelected: {},
            paymentSelected: {},
            provinceSelected: {},
            clinicName: '',
            clinicAddress: '',
            note: '',

            doctorList: [],
            priceList: [],
            paymentList: [],
            provinceList: [],
            allCodeRes: {},
        };
    }

    componentDidMount() {
        this.props.getAllDoctor();
        this.props.handleGetTypeBykey('PRICE');
        this.props.handleGetTypeBykey('PAYMENT');
        this.props.handleGetTypeBykey('PROVINCE');
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
            if (this.props.saveDoctorDetailResponse?.errCode === 0) {
                this.setState({
                    contentHTML: '',
                    contentMarkDown: '',
                    description: '',
                    doctorId: '',
                    selectedOption: {},

                    priceSelected: {},
                    paymentSelected: {},
                    provinceSelected: {},
                    clinicName: '',
                    clinicAddress: '',
                    note: '',
                });
                this.notifySuccess(this.props.saveDoctorDetailResponse?.message);
            } else {
                this.notifyError(this.props.saveDoctorDetailResponse?.message);
            }
        }
        if (this.props.getDoctorDetailByIdResponse !== prevProps.getDoctorDetailByIdResponse) {
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

                clinicName: this.props.getDoctorDetailByIdResponse.data?.Doctor_infor
                    ? this.props.getDoctorDetailByIdResponse.data.Doctor_infor.addressClinic
                    : this.state.clinicName,
                clinicAddress: this.props.getDoctorDetailByIdResponse.data?.Doctor_infor
                    ? this.props.getDoctorDetailByIdResponse.data.Doctor_infor.nameClinic
                    : this.state.clinicAddress,
                note: this.props.getDoctorDetailByIdResponse.data?.Doctor_infor
                    ? this.props.getDoctorDetailByIdResponse.data.Doctor_infor.note
                    : this.state.note,
            });

            if (this.props.getDoctorDetailByIdResponse.data?.Doctor_infor) {
                let { priceId, paymentId, provinceId } = this.props.getDoctorDetailByIdResponse.data.Doctor_infor;
                if (this.state.priceList && this.state.priceList.length > 0) {
                    let found = this.state.priceList.find((item) => item.keyMap === priceId);
                    console.log(found);
                    this.setState({ priceSelected: found ? found : {} });
                }

                if (this.state.paymentList && this.state.paymentList.length > 0) {
                    let found = this.state.paymentList.find((item) => item.keyMap === paymentId);

                    this.setState({ paymentSelected: found ? found : {} });
                }
                if (this.state.provinceList && this.state.provinceList.length > 0) {
                    let found = this.state.provinceList.find((item) => item.keyMap === provinceId);

                    this.setState({ provinceSelected: found ? found : {} });
                }
            }

            console.log(this.props.getDoctorDetailByIdResponse.data.Doctor_infor);
            console.log(this.state.paymentList);
        }

        if (
            this.props.allCodeRes !== prevProps.allCodeRes &&
            this.props.allCodeRes?.data &&
            this.props.allCodeRes?.data.length > 0
        ) {
            if (this.props.allCodeRes?.key === 'PRICE') {
                this.setState({
                    priceList: this.props.allCodeRes.data.map((value) => {
                        return {
                            ...value,
                            value: value.keyMap,
                            label: this.props.language === 'en' ? value.valueEn : value.valueVi,
                        };
                    }),
                });
            }
            if (this.props.allCodeRes?.key === 'PAYMENT') {
                this.setState({
                    paymentList: this.props.allCodeRes.data.map((value) => {
                        return {
                            ...value,
                            value: value.keyMap,
                            label: this.props.language === 'en' ? value.valueEn : value.valueVi,
                        };
                    }),
                });
            }
            if (this.props.allCodeRes?.key === 'PROVINCE') {
                this.setState({
                    provinceList: this.props.allCodeRes.data.map((value) => {
                        return {
                            ...value,
                            value: value.keyMap,
                            label: this.props.language === 'en' ? value.valueEn : value.valueVi,
                        };
                    }),
                });
            }
        }

        if (this.props.language !== prevProps.language) {
            this.setState({
                priceList: this.state.priceList.map((item) => {
                    return {
                        ...item,
                        label: this.props.language === 'en' ? item.valueEn : item.valueVi,
                    };
                }),
            });

            this.setState({
                paymentList: this.state.paymentList.map((item) => {
                    return {
                        ...item,
                        label: this.props.language === 'en' ? item.valueEn : item.valueVi,
                    };
                }),
            });

            this.setState({
                provinceList: this.state.provinceList.map((item) => {
                    return {
                        ...item,
                        label: this.props.language === 'en' ? item.valueEn : item.valueVi,
                    };
                }),
            });

            if (this.state.priceSelected) {
                this.setState({
                    priceSelected: {
                        ...this.state.priceSelected,
                        label:
                            this.props.language === 'en'
                                ? this.state.priceSelected.valueEn
                                : this.state.priceSelected.valueVi,
                    },
                });
            }

            if (this.state.paymentSelected) {
                this.setState({
                    paymentSelected: {
                        ...this.state.paymentSelected,
                        label:
                            this.props.language === 'en'
                                ? this.state.paymentSelected.valueEn
                                : this.state.paymentSelected.valueVi,
                    },
                });
            }

            if (this.state.provinceSelected) {
                this.setState({
                    provinceSelected: {
                        ...this.state.provinceSelected,
                        label:
                            this.props.language === 'en'
                                ? this.state.provinceSelected.valueEn
                                : this.state.provinceSelected.valueVi,
                    },
                });
            }
        }
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption, doctorId: selectedOption.value.id }, () => {});
        this.props.getDoctorDetailById(selectedOption.value.id);
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkDown: text,
        });
    };

    notifySuccess(message) {
        toast.success(message, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    }

    notifyError(message) {
        toast.error(message, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
        });
    }

    render() {
        const mdParser = new MarkdownIt(/* Markdown-it options */);
        return (
            <div className="doctor-manage p-2">
                <div className="title p-4">
                    <FormattedMessage id="system.doctor-manage.title" />
                </div>
                <div className="container">
                    <div className="row my-2">
                        <div className="doctor-select col">
                            <label for="" className="">
                                <FormattedMessage id="system.doctor-manage.doctor-name" />
                            </label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.doctorList}
                            />
                        </div>
                        <div className="doctor-description col ">
                            <label for="description" className="">
                                <FormattedMessage id="system.doctor-manage.introductory-information" />
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                className="border rounded form-control"
                                rows="4"
                                onChange={(e) => {
                                    this.setState({ description: e.target.value });
                                }}
                                value={this.state.description}
                            ></textarea>
                        </div>
                    </div>

                    <div className="row my-2">
                        <div className="price col">
                            <label for="" className="">
                                <FormattedMessage id="system.doctor-manage.price" />
                            </label>
                            <Select
                                value={this.state.priceSelected}
                                onChange={(options) => {
                                    this.setState({
                                        priceSelected: options,
                                    });
                                }}
                                options={this.state.priceList}
                            />
                        </div>
                        <div className="credit col">
                            <label for="" className="">
                                <FormattedMessage id="system.doctor-manage.payment-method" />
                            </label>
                            <Select
                                // value={this.state.selectedOption}
                                // onChange={this.handleChange}
                                value={this.state.paymentSelected}
                                onChange={(options) => {
                                    console.log(options);
                                    this.setState({
                                        paymentSelected: options,
                                    });
                                }}
                                options={this.state.paymentList}
                            />
                        </div>
                        <div className="city col">
                            <label for="" className="">
                                <FormattedMessage id="system.doctor-manage.city" />
                            </label>
                            <Select
                                // value={this.state.selectedOption}
                                // onChange={this.handleChange}
                                value={this.state.provinceSelected}
                                onChange={(options) => {
                                    this.setState({
                                        provinceSelected: options,
                                    });
                                }}
                                options={this.state.provinceList}
                            />
                        </div>
                    </div>

                    <div className="row my-2">
                        <div className="clinic-name doctor-description col">
                            <label for="" className="">
                                <FormattedMessage id="system.doctor-manage.clinic-name" />
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={this.state.clinicName}
                                onChange={(e) => {
                                    this.setState({
                                        clinicName: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className="clinic-address doctor-description col">
                            <label for="" className="">
                                <FormattedMessage id="system.doctor-manage.clinic-address" />
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={this.state.clinicAddress}
                                onChange={(e) => {
                                    this.setState({
                                        clinicAddress: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className="note  doctor-description col">
                            <label for="" className="">
                                <FormattedMessage id="system.doctor-manage.note" />
                            </label>
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Username"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={this.state.note}
                                onChange={(e) => {
                                    this.setState({
                                        note: e.target.value,
                                    });
                                }}
                            />
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
                            console.log(this.state);
                            this.props.saveDoctorDetail({
                                contentHTML: this.state.contentHTML,
                                contentMarkDown: this.state.contentMarkDown,
                                description: this.state.description,
                                doctorId: this.state.doctorId,
                                price: this.state.priceSelected?.keyMap,
                                payment: this.state.paymentSelected?.keyMap,
                                province: this.state.provinceSelected?.keyMap,
                                clinicName: this.state.clinicName,
                                clinicAddress: this.state.clinicAddress,
                                note: this.state.note,
                            });
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
        language: state.app.language,
        allCodeRes: state.admin.allCodeRes,
        saveDoctorDetailResponse: state.admin.saveDoctorDetailResponse,
        getDoctorDetailByIdResponse: state.admin.getDoctorDetailByIdResponse,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleGetTypeBykey: (key) => dispatch(actions.handleGetTypeBykey(key)),
        getAllDoctor: () => dispatch(actions.getAllDoctor()),
        saveDoctorDetail: (data) => dispatch(actions.saveDoctorDetail(data)),
        getDoctorDetailById: (id) => dispatch(actions.getDoctorDetailById(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
