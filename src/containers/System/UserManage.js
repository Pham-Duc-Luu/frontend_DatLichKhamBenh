import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { handleGetUserInfo, handleCreateNewUser } from '../../services/userService';
import './UserManage.scss';
import ModalAddUser from './ModalAddUser';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUser: [],
            isOpenModal: false,
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

    render() {
        return (
            <div className="container">
                <h2>User manage</h2>
                <ModalAddUser
                    createNewUser={this.createNewUser}
                    isOpen={this.state.isOpenModal}
                    toggleModal={this.toggleModal}
                />

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
                                    <button type="button" className="btn btn-warning px-2">
                                        Edit
                                        <i className="fas fa-edit mx-2"></i>
                                    </button>
                                    <button type="button" className="btn btn-danger mx-3 px-2">
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
