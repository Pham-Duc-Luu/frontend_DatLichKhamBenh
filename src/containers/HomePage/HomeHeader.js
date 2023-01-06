import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.svg';
import './HomeHeader.scss';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { changeLanguage } from '../../store/actions/appActions';
import { LANGUAGES } from '../../utils/constant';
import { withRouter } from 'react-router';
import { path } from '../../utils';

class HomeHeader extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            // language: 'vi',
        };
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguage(language);
    };

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        });
    }
    render() {
        return (
            <div className="HomeHeader">
                <div className="header-logo">
                    <i class="fas fa-bars"></i>
                    <img
                        src={logo}
                        onClick={() => {
                            console.log(123);
                            this.props.history.push(path.HOMEPAGE);
                        }}
                    />
                </div>
                <ul className="header-main-func">
                    <div className="specialist ">
                        <div className="title text-dark ">
                            <FormattedMessage id="homeheader.specialty" />
                        </div>
                        <div className="description">
                            <FormattedMessage id="homeheader.specialty-description" />
                        </div>
                    </div>

                    <div className="place ">
                        <div className="title text-dark">
                            <FormattedMessage id="homeheader.place" />
                        </div>
                        <div className="description">
                            <FormattedMessage id="homeheader.place-description" />
                        </div>
                    </div>

                    <div className="doctor ">
                        <div className="title text-dark">
                            <FormattedMessage id="homeheader.doctor" />
                        </div>
                        <div className="description">
                            <FormattedMessage id="homeheader.doctor-description" />
                        </div>
                    </div>

                    <div className="package  ">
                        <div className="title text-dark">
                            <FormattedMessage id="homeheader.package" />
                        </div>
                        <div className="description">
                            <FormattedMessage id="homeheader.package-description" />
                        </div>
                    </div>
                </ul>

                <div className="header-help">
                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret className="px-2">
                            {<FormattedMessage id="homeheader.language" />} / {this.props.language}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem
                                onClick={() => {
                                    this.handleChangeLanguage('vi');
                                    // this.setState({ language: 'vi' });
                                }}
                            >
                                {<FormattedMessage id="homeheader.vietnamese" />}
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem
                                onClick={() => {
                                    this.handleChangeLanguage('en');

                                    // this.setState({ language: 'en' });
                                }}
                            >
                                {<FormattedMessage id="homeheader.english" />}
                            </DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>

                    <div className="help">
                        <i class="fas fa-question-circle"></i>
                        <div className="title text-dark">
                            <FormattedMessage id="homeheader.help" />
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
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return { changeLanguage: (language) => dispatch(changeLanguage(language)) };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
