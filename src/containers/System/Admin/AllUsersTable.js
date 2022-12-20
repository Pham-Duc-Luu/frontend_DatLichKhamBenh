import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersArr: [],
            deleteResponse: {},
        };
    }

    componentDidMount() {
        console.log(this.props);
        this.props.fetchGetAllUser();
    }

    componentDidUpdate(prevProps) {
        // console.log(this.props);
        if (this.props.usersArr !== prevProps.usersArr) {
            this.setState({
                usersArr: this.props.usersArr.reverse(),
            });
        }
        if (this.props.deleteResponse !== prevProps.deleteResponse) {
            this.notify(this.props.language === 'en' ? 'DELETED' : 'ĐÃ XÓA');
            this.props.fetchGetAllUser();
        }
    }

    handleDeleteUser(user) {
        let response = this.props.deleteUser(user.id);
    }

    notify(message) {
        toast(message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });
    }

    render() {
        // console.log(this.props);
        // console.log(this.state);

        return (
            <div className="all-user-table ">
                <div className="container">
                    <table class="table table-hover">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">
                                    <FormattedMessage id="menu.admin.crud-keyword.email" />
                                </th>
                                <th scope="col">
                                    <FormattedMessage id="menu.admin.crud-keyword.first-name" />
                                </th>
                                <th scope="col">
                                    <FormattedMessage id="menu.admin.crud-keyword.last-name" />
                                </th>
                                <th scope="col">
                                    <FormattedMessage id="menu.admin.crud-keyword.address" />
                                </th>
                                <th scope="col">
                                    <FormattedMessage id="menu.admin.crud-keyword.phone-number" />
                                </th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        {this.state.usersArr.map((value, index) => (
                            <tbody key={index}>
                                <tr>
                                    <td>{value.email}</td>
                                    <td>{value.firstName}</td>
                                    <td>{value.lastName}</td>
                                    <td>{value.address}</td>
                                    <td>{value.phoneNumber}</td>
                                    <td>
                                        <button
                                            type="button"
                                            class="btn btn-warning px-2 mx-2"
                                            onClick={(e) => this.props.handleUpdateUser(value)}
                                        >
                                            <i class="fas fa-edit"></i>
                                            <FormattedMessage id="common.edit" />
                                        </button>
                                        <button
                                            type="button"
                                            class="btn px-2 btn-danger "
                                            onClick={(e) => {
                                                this.handleDeleteUser(value);
                                            }}
                                        >
                                            <i class="fas fa-user-slash"></i>
                                            <FormattedMessage id="common.delete" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        usersArr: state.admin.users,
        deleteResponse: state.admin.deleteResponse,
        language: state.admin.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGetAllUser: (data) => dispatch(actions.fetchGetAllUser()),
        deleteUser: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
