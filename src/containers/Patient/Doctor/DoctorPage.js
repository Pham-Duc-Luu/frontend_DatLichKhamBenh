import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import HomeHeader from '../../HomePage/HomeHeader';
import Footer from '../../HomePage/Footer/Footer';
import './DoctorPage.scss';
import * as actions from '../../../store/actions/index';
import { Dropdown, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { LANGUAGES } from '../../../utils';
import ClinicInfo from './ClinicInfo';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import DatePicker from '../../../components/Input/DatePicker';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class DoctorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            firstName: '',
            lastName: '',
            contentHTML: '',
            contentMarkDown: '',
            description: '',
            doctorId: '',
            specialtyId: '',
            clinicId: '',
            positionData: {},
            dropdownOpen: false,
            arrDate: [],
            choosenDate: {},
            dailySchedule: [],
            modal: false,
            gender: [],
            language: '',
            price: {},

            time: '',
            date: '',
            currentDate: '',

            patientName: '',
            patientPhone: '',
            patientEmail: '',
            patientAddress: '',
            patientNote: '',
            patientGender: '',
            patientDate: '',
            patientTimeType: '',
        };

        this.toggle = this.toggle.bind(this);
    }

    handleOnChageDatePicker = (date) => {
        // this.setState({ currentDate: moment(date[0]).format(dateFormat.SEND_TO_SERVER) });

        this.setState({ currentDate: new Date(date[0]).getTime() });
    };

    toggle(item) {
        this.setState({
            modal: !this.state.modal,
            time: this.props.language === LANGUAGES.EN ? item?.timeTypeData?.valueEn : item?.timeTypeData?.valueVi,
            date: this.state.choosenDate?.label?.charAt(0).toUpperCase() + this.state.choosenDate?.label?.slice(1),
        });
    }

    async componentDidMount() {
        this.props.getDoctorDetailById(this.props.match.params.id);
        await this.handleCreateListOfDay(this.props.language);
        await this.props.handleGetDoctorSchedule({
            id: this.props.match?.params?.id,
            date: this.state.arrDate[0]?.value,
        });

        this.props.fetchGender();
    }

    handleCreateListOfDay(language) {
        let arrDate = [];

        for (let i = 0; i < 7; i++) {
            let obj = {};
            language === LANGUAGES.EN
                ? (obj.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - DD/MM'))
                : (obj.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM'));

            obj.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            arrDate.push(obj);
        }

        if (arrDate && arrDate.length > 0) {
            this.setState({
                arrDate: arrDate,
            });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.getDoctorDetailByIdResponse !== prevProps.getDoctorDetailByIdResponse) {
            // console.log(this.props);

            this.setState({
                image: this.props.getDoctorDetailByIdResponse?.data?.image,
                firstName: this.props.getDoctorDetailByIdResponse?.data?.firstName,
                lastName: this.props.getDoctorDetailByIdResponse?.data?.lastName,
                contentHTML: this.props.getDoctorDetailByIdResponse?.data?.MarkDown.contentHTML,
                contentMarkDown: this.props.getDoctorDetailByIdResponse?.data?.MarkDown.contentMarkDown,
                description: this.props.getDoctorDetailByIdResponse?.data?.MarkDown.description,
                doctorId: this.props.getDoctorDetailByIdResponse?.data?.MarkDown.doctorId,
                specialtyId: this.props.getDoctorDetailByIdResponse?.data?.MarkDown.specialtyId,
                clinicId: this.props.getDoctorDetailByIdResponse?.data?.MarkDown.clinicId,
                positionData: this.props.getDoctorDetailByIdResponse?.data?.positionData,
            });
        }
        if (this.props.language !== prevProps.language) {
            this.handleCreateListOfDay(this.props.language);
            this.setState({ language: this.props.language });
        }
        if (this.state.arrDate !== prevState.arrDate) {
            this.setState({ choosenDate: this.state.arrDate[0] });
        }
        if (this.props.getDailyScheduleRes !== prevProps.getDailyScheduleRes) {
            // console.log(this.props.getDailyScheduleRes);
            if (this.props.getDailyScheduleRes?.data?.length > 0) {
                this.setState({
                    dailySchedule: this.props.getDailyScheduleRes.data,
                });
            } else {
                this.setState({
                    dailySchedule: [],
                });
            }
        }

        // console.log(this.props.gender);
        if (this.props.gender !== prevProps.gender && this.props.gender.length > 0) {
            this.setState({ gender: this.props.gender });
            this.setState({ patientGender: this.props.gender[0].keyMap });
        }

        if (this.props.getDoctorDetailByIdResponse !== prevProps.getDoctorDetailByIdResponse) {
            if (this.props.getDoctorDetailByIdResponse?.data?.Doctor_infor) {
                let Doctor_infor = this.props.getDoctorDetailByIdResponse?.data?.Doctor_infor;

                this.setState({
                    price: Doctor_infor.price,
                });
            }
        }

        if (this.props.createBookingRes !== prevProps.createBookingRes) {
            if (this.props.createBookingRes.errCode === 0) {
                this.notifySuccess('Created Booking successfully');
            } else {
                this.notifyError('Created Booking fail');
            }
        }
    }

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

    handleSubmit() {
        // console.log(
        //     this.state.patientName,
        //     this.state.patientPhone,
        //     this.state.patientEmail,
        //     this.state.patientAddress,
        //     this.state.patientNote,
        //     this.state.patientGender,
        //     this.state.doctorId,
        //     this.state.patientDate,
        //     this.state.patientTimeType,
        // );
        this.props.handleCreateBooking({
            email: this.state.patientEmail,
            address: this.state.patientAddress,
            phoneNumber: this.state.patientPhone,
            gender: this.state.patientGender,
            doctorId: this.state.doctorId,
            date: this.state.patientDate,
            timeType: this.state.patientTimeType,
        });
    }

    render() {
        return (
            <div className="detail-doctor-page">
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={'detail-doctor-page-modal'}>
                    <ModalHeader className="bg-white text-dark" toggle={this.toggle}>
                        <FormattedMessage id="homebanner.doctor-page.information" />
                    </ModalHeader>

                    <ModalBody>
                        <div className="info">
                            <img className="img border border-dark" src={this.state.image} />
                            <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
                                <div className="name">
                                    {`${
                                        this.props.language === 'en'
                                            ? this.state.positionData?.valueEn
                                            : this.state.positionData?.valueVi
                                    } ${this.state.firstName} ${this.state.lastName}`}
                                </div>
                                <div className="description">{this.state.description}</div>
                            </div>
                        </div>
                        {
                            <>
                                <div className="m-3 ">
                                    <FormattedMessage id="homebanner.doctor-page.clinic.price" />{' '}
                                    {this.props.language === LANGUAGES.EN
                                        ? this.state.price?.valueEn + '$'
                                        : this.state.price?.valueVi + 'VND'}
                                </div>
                                <div className="m-3 ">{this.state.time + ' ' + this.state.date}</div>
                            </>
                        }
                        <form>
                            <div class="form-group m-3">
                                <label for="name">
                                    <FormattedMessage id="homebanner.doctor-page.name" />
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="name"
                                    aria-describedby="emailHelp"
                                    placeholder=""
                                    onChange={(e) =>
                                        this.setState({
                                            patientName: e.target.value,
                                        })
                                    }
                                    value={this.state.patientName}
                                />
                                {/* <small id="emailHelp" class="form-text text-muted">
                                    We'll never share your email with anyone else.
                                </small> */}
                            </div>
                            <div class="form-group m-3">
                                <label for="phoneNumber">
                                    <FormattedMessage id="homebanner.doctor-page.phone" />
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="phoneNumber"
                                    placeholder=""
                                    onChange={(e) =>
                                        this.setState({
                                            patientPhone: e.target.value,
                                        })
                                    }
                                    value={this.state.patientPhone}
                                />
                            </div>

                            <div class="form-group m-3">
                                <label for="email">
                                    <FormattedMessage id="homebanner.doctor-page.email" />
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="email"
                                    placeholder=""
                                    onChange={(e) =>
                                        this.setState({
                                            patientEmail: e.target.value,
                                        })
                                    }
                                    value={this.state.patientEmail}
                                />
                            </div>

                            <div class="form-group m-3">
                                <label for="address">
                                    <FormattedMessage id="homebanner.doctor-page.address" />
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="address"
                                    placeholder=""
                                    onChange={(e) =>
                                        this.setState({
                                            patientAddress: e.target.value,
                                        })
                                    }
                                    value={this.state.patientAddress}
                                />
                            </div>

                            <div class="form-group m-3">
                                <label for="reason">
                                    <FormattedMessage id="homebanner.doctor-page.reason" />
                                </label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="reason"
                                    placeholder=""
                                    onChange={(e) =>
                                        this.setState({
                                            patientNote: e.target.value,
                                        })
                                    }
                                    value={this.state.patientNote}
                                />
                            </div>

                            <div class="form-group m-3">
                                <label for="gender">
                                    <FormattedMessage id="homebanner.doctor-page.gender" />
                                </label>
                                <select
                                    class="form-control"
                                    id="gender"
                                    onChange={(e) => {
                                        // console.log(e);
                                        this.setState({
                                            patientGender: e.target.value,
                                        });
                                    }}
                                    value={this.state.patientGender}
                                >
                                    {this.state.gender.length > 0 &&
                                        this.state.gender.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {this.props.language === LANGUAGES.EN ? item.valueEn : item.valueVi}
                                                </option>
                                            );
                                        })}
                                </select>
                                {/* <input type="text" class="form-control" id="gender" placeholder="" /> */}
                            </div>

                            <div class="form-group m-3">
                                <label for="birth">
                                    <FormattedMessage id="homebanner.doctor-page.birth" />
                                </label>
                                <DatePicker
                                    id="birth"
                                    onChange={this.handleOnChageDatePicker}
                                    minDate={new Date(new Date().setDate(new Date().getDate() - 1))}
                                    className="form-control"
                                    value={this.state.currentDate}
                                />
                                {/* <input type="text" class="form-control" id="birth" placeholder="" /> */}
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            className="px-2"
                            onClick={() => {
                                this.toggle();
                                this.handleSubmit();
                            }}
                        >
                            Submit
                        </Button>{' '}
                        <Button color="secondary" className="px-2" onClick={this.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                <HomeHeader />
                <div className="container">
                    <div className="container-header my-4">
                        <img className="img border border-dark" src={this.state.image} />
                        <div className="info">
                            <div className="name">
                                {`${
                                    this.props.language === 'en'
                                        ? this.state.positionData?.valueEn
                                        : this.state.positionData?.valueVi
                                } ${this.state.firstName} ${this.state.lastName}`}
                            </div>
                            <div className="description">{this.state.description}</div>
                        </div>
                    </div>
                    <div className="booking my-4">
                        <div className="date">
                            <ButtonDropdown
                                isOpen={this.state.dropdownOpen}
                                toggle={() => this.setState({ dropdownOpen: !this.state.dropdownOpen })}
                            >
                                <DropdownToggle className="px-2" caret>
                                    {this.state.choosenDate?.label?.charAt(0).toUpperCase() +
                                        this.state.choosenDate?.label?.slice(1)}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {this.state.arrDate && this.state.arrDate.length > 0
                                        ? this.state.arrDate.map((item, index) => {
                                              return (
                                                  <React.Fragment key={index}>
                                                      {index !== 0 && <DropdownItem divider />}
                                                      <DropdownItem
                                                          onClick={() => {
                                                              this.setState({ choosenDate: item });
                                                              this.props.handleGetDoctorSchedule({
                                                                  id: this.props.match?.params?.id,
                                                                  date: item.value,
                                                              });
                                                          }}
                                                      >
                                                          {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                                                      </DropdownItem>
                                                  </React.Fragment>
                                              );
                                          })
                                        : ''}
                                </DropdownMenu>
                            </ButtonDropdown>
                        </div>
                        <div className="row">
                            <div className="calendar my-4 col">
                                <div className="booking-title">
                                    <i class="fas fa-calendar-alt"></i>
                                    <span>
                                        <FormattedMessage id="homebanner.doctor-page.schedule" />
                                    </span>
                                </div>
                                <ul>
                                    {this.state.dailySchedule.length > 0 ? (
                                        this.state.dailySchedule.map((item, index) => {
                                            // console.log(item);
                                            return (
                                                <li
                                                    type="button"
                                                    class="btn btn-primary btn-lg"
                                                    onClick={() => {
                                                        this.toggle(item);
                                                        this.setState({
                                                            patientDate: item.date,
                                                            patientTimeType: item.timeType,
                                                        });
                                                    }}
                                                    key={index}
                                                    className="bg-warning col-1 m-2 p-2"
                                                >
                                                    {this.props.language === LANGUAGES.EN
                                                        ? item?.timeTypeData?.valueEn
                                                        : item?.timeTypeData?.valueVi}
                                                </li>
                                            );
                                        })
                                    ) : (
                                        <li
                                            type="button"
                                            class="btn btn-primary btn-lg"
                                            className="bg-warning col-1 m-2 p-2"
                                        >
                                            <FormattedMessage id="homebanner.doctor-page.no-schedule" />
                                        </li>
                                    )}
                                </ul>
                                {this.state.dailySchedule.length > 0 && (
                                    <div className="m-3">
                                        <i className="fas fa-hand-point-up"></i>
                                        <span>
                                            <FormattedMessage id="homebanner.doctor-page.booking" />
                                        </span>
                                    </div>
                                )}
                            </div>

                            <ClinicInfo />
                        </div>
                    </div>
                    <div className="main-content" dangerouslySetInnerHTML={{ __html: this.state.contentHTML }}></div>
                </div>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        getDoctorDetailByIdResponse: state.admin.getDoctorDetailByIdResponse,
        getDailyScheduleRes: state.admin.getDailyScheduleRes,
        language: state.app.language,
        gender: state.admin.gender,
        createBookingRes: state.admin.createBookingRes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorDetailById: (id) => dispatch(actions.getDoctorDetailById(id)),
        fetchGender: () => dispatch(actions.fetchGender()),
        handleCreateBooking: (data) => dispatch(actions.handleCreateBooking(data)),
        handleGetDoctorSchedule: (data) => dispatch(actions.handleGetDoctorSchedule(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorPage);
