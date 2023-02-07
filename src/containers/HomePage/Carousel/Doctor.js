import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';

import * as action from '../../../store/actions/index';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Doctor.scss';
import { withRouter } from 'react-router';

import { FormattedMessage } from 'react-intl';

import chuyenkhoamat from '../../../assets/images/chuyen-khoa-mat.jpg';
import cotsong from '../../../assets/images/cot-song.jpg';
import nhikhoa from '../../../assets/images/nhi-khoa.jpg';
import roiloantamthan from '../../../assets/images/roi-loan-tam-than.jpg';
import sanphukhoa from '../../../assets/images/san-phu-khoa.jpg';
import sieuamthai from '../../../assets/images/sieu-am-thai.jpg';
import taimuihong from '../../../assets/images/tai-mui-hong.jpg';
import thankinh from '../../../assets/images/than-kinh.jpg';
import tieuhoa from '../../../assets/images/tieu-hoa.jpg';
import timmach from '../../../assets/images/tim-mach.jpg';
import xuongkhop from '../../../assets/images/xuong-khop.jpg';
import yhoccotruyen from '../../../assets/images/y-hoc-co-truyen.jpg';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className="custom-nextArrow text-secondary border-secondary rounded border " onClick={onClick}>
            {' '}
            <i class="fas fa-chevron-right "></i>
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div onClick={onClick} className="custom-preArrow text-secondary border-secondary rounded border ">
            <i class="fas fa-chevron-left"></i>
        </div>
    );
}

class Doctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doctorArr: [],
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorRes !== this.props.topDoctorRes) {
            this.setState({
                doctorArr: this.props.topDoctorRes?.data,
            });
        }
    }

    componentDidMount() {
        this.props.getTopdoctor(10);
    }
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,

            cssEase: 'linear',
        };

        return (
            <div>
                <div className="specailist-carousel m-5 p-5 ">
                    <div className="carousel-header">
                        <div className="title text-secondary">
                            <FormattedMessage id="homebanner.top-doctor" />
                        </div>
                        <div className="more bg-light border border-dark rounded">
                            <FormattedMessage id="homebanner.more" />
                        </div>
                    </div>
                    <Slider {...settings}>
                        {Array.isArray(this.state.doctorArr) &&
                            this.state.doctorArr.map((doctor, index) => {
                                let doctorImg = doctor.image.data;
                                let doctorImgURL = new Buffer(doctorImg, 'base64').toString('binary');

                                return (
                                    <div>
                                        <div
                                            className="img-cover"
                                            onClick={() => {
                                                this.props.history.push(`/detail-doctor/${doctor.id}`);
                                            }}
                                        >
                                            <img src={doctorImgURL} />
                                            <div className="title text-secondary">
                                                {this.props.language === 'en'
                                                    ? doctor.positionData.valueEn
                                                    : doctor.positionData.valueVi}{' '}
                                                {doctor.lastName}
                                            </div>
                                            <div className="decription"></div>
                                        </div>
                                    </div>
                                );
                            })}
                    </Slider>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorRes: state.admin.topDoctorRes,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTopdoctor: (limit) => dispatch(action.getTopdoctor(limit)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
