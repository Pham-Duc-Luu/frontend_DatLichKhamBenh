import React, { Component } from 'react';
import { connect } from 'react-redux';

import HomeHeader from '../../HomePage/HomeHeader';
import Footer from '../../HomePage/Footer/Footer';
import './DoctorPage.scss';
import * as actions from '../../../store/actions/index';

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
        };
    }

    componentDidMount() {
        this.props.getDoctorDetailById(this.props.match.params.id);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.getDoctorDetailByIdResponse !== prevProps.getDoctorDetailByIdResponse) {
            // console.log(this.props);

            this.setState({
                image: this.props.getDoctorDetailByIdResponse.data.image,
                firstName: this.props.getDoctorDetailByIdResponse.data.firstName,
                lastName: this.props.getDoctorDetailByIdResponse.data.lastName,
                contentHTML: this.props.getDoctorDetailByIdResponse.data.MarkDown.contentHTML,
                contentMarkDown: this.props.getDoctorDetailByIdResponse.data.MarkDown.contentMarkDown,
                description: this.props.getDoctorDetailByIdResponse.data.MarkDown.description,
                doctorId: this.props.getDoctorDetailByIdResponse.data.MarkDown.doctorId,
                specialtyId: this.props.getDoctorDetailByIdResponse.data.MarkDown.specialtyId,
                clinicId: this.props.getDoctorDetailByIdResponse.data.MarkDown.clinicId,
            });
        }
    }

    render() {
        console.log(this.state);
        console.log(this.props.getDoctorDetailByIdResponse);
        return (
            <div className="detail-doctor-page">
                <HomeHeader />
                <div className="container">
                    <div className="container-header">
                        <img className="img border border-dark" src={this.state.image} />
                        <div className="info">
                            <div className="name">Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng</div>
                            <div className="position">
                                Nguyên Trưởng phòng chỉ đạo tuyến tại Bệnh viện Da liễu Trung ương Bác sĩ từng công tác
                                tại Bệnh viện Da liễu Trung ương Nguyên Tổng Thư ký Hiệp hội Da liễu Việt Nam
                            </div>
                        </div>
                    </div>
                    <div className="booking my-4">
                        <div className="date">Hom nay - 30/12</div>
                        <div className="calendar">
                            <div className="booking-title">
                                <i class="fas fa-calendar-alt"></i>
                                dat lich kham
                            </div>
                            <ul>
                                <li className="bg-warning col-1 m-2 p-2">13:00 - 14:00</li>
                                <li className="bg-warning col-1 m-2 p-2">14:00 - 15:00</li>
                                <li className="bg-warning col-1 m-2 p-2">15:00 - 16:00</li>
                                <li className="bg-warning col-1 m-2 p-2">16:00 - 17:00</li>
                                <li className="bg-warning col-1 m-2 p-2">17:00 - 18:00</li>
                            </ul>
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
    return { getDoctorDetailByIdResponse: state.admin.getDoctorDetailByIdResponse };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorDetailById: (id) => dispatch(actions.getDoctorDetailById(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorPage);
