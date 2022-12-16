import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './YoutubeAdd.scss';
import cuccongnghethongtin from '../../../assets/mediaLogo/cuc-cong-nghe-thong-tin-bo-y-te-2.png';
import ictnews from '../../../assets/mediaLogo/ictnews.png';
import infonet from '../../../assets/mediaLogo/infonet.png';
import suckhoedoisong from '../../../assets/mediaLogo/suckhoedoisong.png';
import vnexpress from '../../../assets/mediaLogo/vnexpress.png';
import vtcgo from '../../../assets/mediaLogo/vtcgo.png';
import vtcnews from '../../../assets/mediaLogo/vtcnews.png';
import vtv1 from '../../../assets/mediaLogo/vtv1.png';

class youtubeAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="bg-light">
                <div className="youtubeAdd mx-5 p-5">
                    <div className="main-title title text-secondary ">Truyen thong noi gi ve booking care</div>
                    <div className="main-cover">
                        <div className="youtube">
                            <iframe
                                width="570"
                                height="322"
                                src="https://www.youtube.com/embed/FyDQljKtWnI"
                                title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                            ></iframe>
                        </div>
                        <ul className="other">
                            <li>
                                <a
                                    target="_blank"
                                    title="Báo sức khỏe đời sống nói về BookingCare"
                                    href="https://suckhoedoisong.vn/dat-lich-kham-benh-tiet-kiem-thong-minh-va-hieu-qua-n153232.html"
                                >
                                    <img className="" src={cuccongnghethongtin} />
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    title="VTV1 - Cà phê khởi nghiệp 14-11-2018"
                                    href="https://vtv.vn/video/ca-phe-khoi-nghiep-14-11-2018-334894.htm"
                                >
                                    <img className="" src={ictnews} />
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    title="Báo điện tử ictnews giới thiệu BookingCare"
                                    href="https://ictnews.vn/kinh-doanh/doanh-nghiep/startup-bookingcare-chinh-thuc-ra-mat-phien-ban-di-dong-cua-nen-tang-ho-tro-dat-lich-kham-online-173512.ict"
                                >
                                    <img className="" src={infonet} />
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    title="VnExpress nói về BookingCare"
                                    href="https://video.vnexpress.net/tin-tuc/cuoc-song-4-0/kham-benh-khong-phai-xep-hang-o-ha-noi-3797126.html"
                                >
                                    <img className="" src={suckhoedoisong} />
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    title="VTC News nói về BookingCare"
                                    href="https://vtc.vn/dat-kham-chuyen-khoa-va-hanh-trinh-ho-tro-cac-benh-vien-qua-tai-d434101.html"
                                >
                                    <img className="" src={vnexpress} />
                                </a>
                            </li>
                            <li>
                                <a
                                    target="_blank"
                                    title="VTC Go nói về BookingCare"
                                    href="https://www.youtube.com/watch?v=mstAc81lpMc"
                                >
                                    <img className="" src={vtv1} />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(youtubeAdd);
