import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorPage.scss';
import * as actions from '../../../store/actions/index';
import './ClinicInfo.scss';
import { FormattedMessage } from 'react-intl';

import { LANGUAGES } from '../../../utils';

class ClinicInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPrice: true,
            clinicAddress: '',
            clinicName: '',
            price: {},
            payment: {},
            province: {},
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.getDoctorDetailByIdResponse !== prevProps.getDoctorDetailByIdResponse) {
            if (this.props.getDoctorDetailByIdResponse?.data?.Doctor_infor) {
                let Doctor_infor = this.props.getDoctorDetailByIdResponse?.data?.Doctor_infor;

                this.setState({
                    payment: Doctor_infor.payment,
                    price: Doctor_infor.price,
                    province: Doctor_infor.province,
                    clinicName: Doctor_infor.nameClinic,
                    clinicAddress: Doctor_infor.addressClinic,
                });
            }
        }
    }

    render() {
        // console.log(this.state);
        return (
            <div className="clinic-info col">
                <div className="clinic-address border-bottom">
                    <span className="text-secondary">
                        {' '}
                        <FormattedMessage id="homebanner.doctor-page.clinic.address" />
                    </span>
                    <div className="clinic-name my-2">{this.state.clinicName}</div>
                    <div className="address my-2">{this.state.clinicAddress}</div>
                </div>

                <div className="clinic-price">
                    <span>
                        <FormattedMessage id="homebanner.doctor-page.clinic.price" />{' '}
                        {this.state.isShowPrice && (
                            <React.Fragment>
                                {this.props.language === LANGUAGES.EN
                                    ? this.state.price?.valueEn + '$'
                                    : this.state.price?.valueVi + 'VND'}
                                <span
                                    className="hide-price text-primary m-2"
                                    onClick={() => this.setState({ isShowPrice: false })}
                                >
                                    <FormattedMessage id="homebanner.doctor-page.clinic.show" />
                                </span>
                            </React.Fragment>
                        )}
                    </span>
                    {!this.state.isShowPrice && (
                        <React.Fragment>
                            <div className="clinic-price-box">
                                <div className="price p-2">
                                    {' '}
                                    {this.props.language === LANGUAGES.EN
                                        ? this.state.price?.valueEn + '$'
                                        : this.state.price?.valueVi + 'VND'}
                                </div>
                                <div className="payment p-2">
                                    <FormattedMessage id="homebanner.doctor-page.clinic.payment-methods" />:{' '}
                                    {this.props.language === LANGUAGES.EN
                                        ? this.state.payment?.valueEn
                                        : this.state.payment?.valueVi}
                                </div>
                            </div>
                            <span
                                className="hide-price text-primary m-2"
                                onClick={() => this.setState({ isShowPrice: true })}
                            >
                                <FormattedMessage id="homebanner.doctor-page.clinic.hide" />
                            </span>
                        </React.Fragment>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        getDoctorDetailByIdResponse: state.admin.getDoctorDetailByIdResponse,
        getDailyScheduleRes: state.admin.getDailyScheduleRes,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorDetailById: (id) => dispatch(actions.getDoctorDetailById(id)),
        handleGetDoctorSchedule: (data) => dispatch(actions.handleGetDoctorSchedule(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicInfo);
