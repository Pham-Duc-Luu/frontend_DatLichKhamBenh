import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Footer.scss';
import logo from '../../../assets/images/logo.svg';

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <div className="home-footer">
                <div className="footer-main mx-5 p-5">
                    <div className="footer-address col-6">
                        <div className="footer-logo">
                            <img src={logo} className="col-4 my-3" />
                        </div>
                        <span className="footer-name">Cong ty co phan cong nghe Booking care</span>
                        <div className="footer-place">
                            <i class="fas fa-map-marker-alt"></i>
                            <span> 28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</span>
                        </div>
                        <div className="footer-degree">
                            <i class="fas fa-check-circle"></i>
                            <span> ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</span>
                        </div>
                        <div className="footer-degree-logo">
                            <a class="an-ud" target="_blank" href="http://online.gov.vn/Home/WebDetails/68563">
                                <img src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg" />
                            </a>

                            <a target="_blank" href="http://online.gov.vn/Home/AppDetails/1101">
                                <img src="https://bookingcare.vn/assets/icon/bo-cong-thuong.svg" />
                            </a>
                        </div>
                    </div>
                    <ul className="footer-contact col text-info">
                        <li>
                            <a className="text-info " href="/hop-tac-voi-bookingcare">
                                Liên hệ hợp tác
                            </a>
                        </li>
                        <li>
                            <a className="text-info " href="/goi-chuyen-doi-so">
                                Gói chuyển đổi số doanh nghiệp
                            </a>
                        </li>
                        <li>
                            <a className="text-info " href="/tuyen-dung">
                                Tuyển dụng
                            </a>
                        </li>
                        <li>
                            <a className="text-info " href="/benh-nhan-thuong-hoi">
                                Câu hỏi thường gặp
                            </a>
                        </li>
                        <li>
                            <a className="text-info " href="/page/dieu-khoan-su-dung-p7">
                                Điều khoản sử dụng
                            </a>
                        </li>
                        <li>
                            <a className="text-info " href="/page/chinh-sach-bao-mat-p8">
                                Chính sách Bảo mật
                            </a>
                        </li>
                        <li>
                            <a className="text-info " href="/thong-tin/quy-trinh-ho-tro-giai-quyet-khieu-nai-p13">
                                Quy trình hỗ trợ giải quyết khiếu nại
                            </a>
                        </li>
                        <li>
                            <a className="text-info " href="/site/quyche">
                                Quy chế hoạt động
                            </a>
                        </li>
                    </ul>
                    <ul className="footer-headquarters col">
                        <li>
                            <span className="title text-dark">Tru so ha noi</span>
                            <span className="description">28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</span>
                        </li>
                        <li>
                            <span className="title text-dark">Tru so ha noi</span>
                            <span className="description">28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</span>
                        </li>
                        <li>
                            <span className="title text-dark">Tru so ha noi</span>
                            <span className="description">28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</span>
                        </li>
                    </ul>
                </div>
                <div className="footer-extra text-muted px-5">
                    <div className="name">© 2022 BookingCare.</div>
                    <div className="icon">
                        <a target="_blank" href="https://facebook.com/bookingcare">
                            <i class="fab fa-facebook-square text-muted"></i>
                        </a>
                        <a target="_blank" href="https://www.youtube.com/channel/UC9l2RhMEPCIgDyGCH8ijtPQ">
                            <i class="fab fa-youtube text-muted"></i>
                        </a>

                        <a target="_blank" href="https://github.com/Pham-Duc-Luu/frontend_DatLichKhamBenh">
                            <i class="fab fa-github text-muted"></i>
                        </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
