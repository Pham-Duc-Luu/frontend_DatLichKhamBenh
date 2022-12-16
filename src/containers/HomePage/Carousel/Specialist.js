import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Specialist.scss';

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
    console.log(props);
    return (
        <div onClick={onClick} className="custom-preArrow text-secondary border-secondary rounded border ">
            <i class="fas fa-chevron-left"></i>
        </div>
    );
}

class Specialist extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
        };

        return (
            <div className="specailist-carousel m-5 p-5">
                <div className="carousel-header">
                    <div className="title text-secondary">
                        {<FormattedMessage id="homebanner.Specialist.main-title" />}
                    </div>
                    <div className="more bg-light border border-dark rounded">
                        {<FormattedMessage id="homebanner.more" />}
                    </div>
                </div>
                <Slider {...settings}>
                    <div>
                        <div className="img-cover col">
                            <img src={chuyenkhoamat} />
                            <div className="title text-secondary">
                                {<FormattedMessage id="homebanner.Specialist.eyes" />}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="img-cover">
                            <img src={cotsong} />
                            <div className="title text-secondary">
                                {<FormattedMessage id="homebanner.Specialist.spine" />}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="img-cover">
                            <img src={nhikhoa} />
                            <div className="title text-secondary">
                                {<FormattedMessage id="homebanner.Specialist.pediatrics" />}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="img-cover">
                            <img src={roiloantamthan} />
                            <div className="title text-secondary">
                                {<FormattedMessage id="homebanner.Specialist.mental" />}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="img-cover">
                            <img src={sanphukhoa} />
                            <div className="title text-secondary">
                                {<FormattedMessage id="homebanner.Specialist.obstetrics" />}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="img-cover">
                            <img src={sieuamthai} />
                            <div className="title text-secondary">
                                {<FormattedMessage id="homebanner.Specialist.ultrasound" />}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="img-cover">
                            <img src={taimuihong} />
                            <div className="title text-secondary">
                                {<FormattedMessage id="homebanner.Specialist.ear-nose-throat" />}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="img-cover">
                            <img src={thankinh} />
                            <div className="title text-secondary">
                                {<FormattedMessage id="homebanner.Specialist.nerve" />}
                            </div>
                        </div>
                    </div>{' '}
                    <div>
                        <div className="img-cover">
                            <img src={tieuhoa} />
                            <div className="title text-secondary">
                                {<FormattedMessage id="homebanner.Specialist.digest" />}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="img-cover">
                            <img src={timmach} />
                            <div className="title text-secondary">
                                {<FormattedMessage id="homebanner.Specialist.cardiology" />}
                            </div>
                        </div>
                    </div>{' '}
                    <div>
                        <div className="img-cover">
                            <img src={xuongkhop} />
                            <div className="title text-secondary">
                                {<FormattedMessage id="homebanner.Specialist.bone" />}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="img-cover">
                            <img src={yhoccotruyen} />
                            <div className="title text-secondary">
                                {<FormattedMessage id="homebanner.Specialist.traditional-medicine" />}
                            </div>
                        </div>
                    </div>
                </Slider>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialist);
