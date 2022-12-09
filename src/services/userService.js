import axios from '../axios';

export const handleLoginUser = (email, password) => {
    return axios.post('/api/login', { email, password });

    // console.log(123);
};

export const handleGetUserInfo = (id) => {
    return axios.get(`/api/get-user-info?id=${id}`);
};

export const handleCreateNewUser = (data) => {
    return axios.post('/api/create-user-info', data);
};
