import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

class Header extends Component {
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
        const { processLogout } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                {/* nút logout */}
                <div className="d-flex options">
                    <div className="user mx-2 d-flex">
                        <FormattedMessage id="menu.admin.welcome" />
                        <div className="user-name text-info mx-2 ">
                            {this.props.userInfo && this.props.userInfo.lastName && this.props.userInfo.lastName}
                        </div>
                    </div>
                    <div className="languages">
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
                    </div>
                    <div className="btn btn-logout" onClick={processLogout}>
                        <i className="fas fa-sign-out-alt"></i>
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
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguage: (language) => dispatch(actions.changeLanguage(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
