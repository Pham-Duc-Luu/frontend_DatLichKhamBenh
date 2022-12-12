import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Banner.scss';
// import background from '../../../assets /doctor.jpg';
import { FormattedMessage } from 'react-intl';

class Banner extends Component {
    render() {
        return (
            <div className="home-banner">
                <div className="banner-bg">
                    <div className="banner-title">
                        <div className="main-title text-light">
                            <FormattedMessage id="homebanner.main-title" />
                        </div>
                        <div className="extra-title text-light">
                            <FormattedMessage id="homebanner.description" />
                        </div>
                    </div>
                    <div className="banner-search bg-warning ">
                        <i class="fas fa-search"></i>
                        <input className="bg-warning" placeholder="" type="text" />
                    </div>
                    <div className="banner-main-func">
                        <div className="banner-func col">
                            <div className="icon-box shadow-lg bg-white">
                                <i class="fas fa-hospital-alt"></i>
                            </div>
                            <div className="title text-dark">
                                <FormattedMessage id="homebanner.specialty" />
                            </div>
                        </div>
                        <div className="banner-func col">
                            <div className="icon-box shadow-lg bg-white">
                                <i class="fas fa-mobile-alt"></i>
                            </div>
                            <div className="title text-dark">
                                <FormattedMessage id="homebanner.remote-exam" />
                            </div>
                        </div>

                        <div className="banner-func col">
                            <div className="icon-box shadow-lg bg-white">
                                <i class="fas fa-file-alt"></i>
                            </div>
                            <div className="title text-dark">
                                <FormattedMessage id="homebanner.medical-test" />
                            </div>
                        </div>

                        <div className="banner-func col">
                            <div className="icon-box shadow-lg bg-white">
                                <i class="fas fa-vial"></i>
                            </div>
                            <div className="title text-dark">
                                <FormattedMessage id="homebanner.general-health" />
                            </div>
                        </div>

                        <div className="banner-func col">
                            <div className="icon-box shadow-lg bg-white">
                                <i class="fas fa-user-md"></i>
                            </div>
                            <div className="title text-dark">
                                <FormattedMessage id="homebanner.mental-health" />
                            </div>
                        </div>
                        <div className="banner-func col">
                            <div className="icon-box shadow-lg bg-white">
                                <i class="fas fa-ambulance"></i>
                            </div>
                            <div className="title text-dark">
                                <FormattedMessage id="homebanner.medical-product" />
                            </div>
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
