import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { handleGetUserInfo, handleCreateNewUser, handleDeleteUser, handleUpdateUser } from '../../services/userService';
import './UserManage.scss';
import ModalAddUser from './ModalAddUser';
import ModalUpdateUser from './ModalUpdateUser';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUser: [],
            isOpenModal: false,
            isOpenModalUpdate: false,
            userInfo: {},
        };
    }

    async componentDidMount() {
        await this.displayAllUser();
        // console.log(this.state.allUser);
        // console.log(userData);
    }

    displayAllUser = async () => {
        let userData = await handleGetUserInfo('ALL');
        if (userData && userData.errCode === 0) {
            this.setState({ allUser: userData.userData });
        }
    };

    toggleModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        });
    };

    toggleUpdateModal = () => {
        this.setState({
            isOpenModalUpdate: !this.state.isOpenModalUpdate,
        });
    };

    createNewUser = async (data) => {
        let response;

        try {
            response = await handleCreateNewUser(data);
            // console.log(response);
            this.displayAllUser();
        } catch (e) {}

        // console.log(data);
        return response;
    };

    deleteUser = async (id) => {
        // console.log(id);
        try {
            let res = await handleDeleteUser(id);
            console.log(res);
            if (res && res.errCode === 0) {
                this.displayAllUser();
            }
        } catch (e) {
            console.log(e);
        }
    };

    handleShowUpdateModal = (user) => {
        this.setState({
            isOpenModalUpdate: true,
            userInfo: user,
        });
    };

    updateUser = async (data) => {
        try {
            let res = await this.handleUpdateUser(data);
        } catch (e) {}
    };

    render() {
        return (
            <div className="container">
                <h2>User manage</h2>
                <button type="button" class="btn btn-primary px-2" onClick={() => this.setState({ isOpenModal: true })}>
                    Add new user
                    <i className="fas fa-plus mx-2"></i>
                </button>
                {this.state.isOpenModal && (
                    <ModalAddUser
                        createNewUser={this.createNewUser}
                        isOpen={this.state.isOpenModal}
                        toggleModal={this.toggleModal}
                    />
                )}
                {this.state.isOpenModalUpdate && (
                    <ModalUpdateUser
                        toggleModal={this.toggleUpdateModal}
                        userInfo={this.state.userInfo}
                        isOpen={this.state.isOpenModalUpdate}
                        updateUser={this.updateUser}
                    />
                )}

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Email</th>
                            <th scope="col">Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.allUser.map((user, index) => (
                            <tr key={index}>
                                <th scope="row">{user.id}</th>
                                <td>{user.email}</td>
                                <td>{user.lastName}</td>
                                <td>{user.address}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-warning px-2"
                                        onClick={() => {
                                            this.handleShowUpdateModal(user);
                                        }}
                                    >
                                        Edit
                                        <i className="fas fa-edit mx-2"></i>
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger mx-3 px-2"
                                        onClick={() => this.deleteUser(user.id)}
                                    >
                                        Delete
                                        <i className="fas fa-trash-alt mx-2"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
