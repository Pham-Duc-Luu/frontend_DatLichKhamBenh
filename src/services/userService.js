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

export const handleDeleteUser = (id) => {
    console.log(id);
    return axios.delete('/api/delete-user-info', { data: { id } });
};

export const handleUpdateUser = (data) => {
    console.log(data);
    // return axios.post('/api/update-user-info', {data})
};
