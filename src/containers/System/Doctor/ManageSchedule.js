import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { FormattedMessage } from 'react-intl';
import actionTypes from '../../../store/actions/actionTypes';
import DatePicker from '../../../components/Input/DatePicker';
import Select from 'react-select';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate';
import { dateFormat } from '../../../utils';
import { toast } from 'react-toastify';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorId: '',
            currentDate: new Date(),
            selectedOption: {},
            doctorList: [],
            timeList: [],
        };
    }

    componentDidMount() {
        this.props.getAllDoctor();
        this.props.getSchedule();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.allDoctor !== prevProps.allDoctor) {
            this.setState({
                doctorList: this.props.allDoctor.map((value, index) => {
                    return { value: value, label: `${value.firstName} ${value.lastName}` };
                }),
            });
        }

        if (this.props.timeSchedule !== prevProps.timeSchedule) {
            if (this.props.timeSchedule && this.props.timeSchedule.length > 0) {
                let timeList = this.props.timeSchedule.map((item) => {
                    return { ...item, isSelected: false };
                });
                this.setState({ timeList: timeList });
            }
        }
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption, doctorId: selectedOption.value.id }, () => {
            console.log(this.state);
        });
        this.props.getDoctorDetailById(selectedOption.value.id);
        // console.log(selectedOption.value.id);
    };

    handleOnChageDatePicker = (date) => {
        this.setState({ currentDate: moment(date[0]).format(dateFormat.SEND_TO_SERVER) });
    };

    handleOnSubmit = () => {
        let { doctorId, selectedOption, currentDate } = this.state;
        let submitTime = this.state.timeList
            .filter((time) => time.isSelected)
            .map((time) => {
                return { time, doctor: selectedOption.value, currentDate };
            });

        if (doctorId && currentDate && submitTime.length > 0) {
            toast.success('successful');
        } else {
            toast.error('error');
        }
    };
    render() {
        return (
            <div className="manage-schedule">
                <div className="container">
                    <div className="title m-4 ">Quan li lich kham benh </div>
                    <div className="row my-4">
                        <div className="doctor col ">
                            <label>Chon bac sy</label>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.doctorList}
                            />
                        </div>
                        <div className="day col">
                            <label>Chon bac sy</label>
                            <DatePicker
                                onChange={this.handleOnChageDatePicker}
                                minDate={new Date()}
                                className="form-control"
                                value={this.state.currentDate}
                            />
                        </div>
                    </div>

                    <div className="time m-4">
                        {this.state.timeList &&
                            this.state.timeList.length > 0 &&
                            this.state.timeList.map((time, index, arr) => {
                                return (
                                    <button
                                        type="button"
                                        className={`btn ${time.isSelected ? ' btn-warning' : 'btn-light'} mx-2 px-2`}
                                        onClick={() => {
                                            time.isSelected = !time.isSelected;
                                            this.setState({
                                                timeList: arr,
                                            });
                                        }}
                                    >
                                        {this.props.language === 'en' ? time.valueEn : time.valueVi}
                                    </button>
                                );
                            })}
                    </div>
                    <button type="button" class=" m-4 btn btn-primary mx-2 px-2" onClick={() => this.handleOnSubmit()}>
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        allDoctor: state.admin.allDoctor,
        language: state.app.language,
        timeSchedule: state.admin.timeSchedule,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctor: () => dispatch(actions.getAllDoctor()),
        getSchedule: () => dispatch(actions.getSchedule()),
        getDoctorDetailById: (id) => dispatch(actions.getDoctorDetailById(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
