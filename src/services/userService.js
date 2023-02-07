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
    return axios.delete('/api/delete-user-info', { data: { id } });
};

export const handleUpdateUser = (data) => {
    console.log(data);
    return axios.post('/api/update-user-info', data);
};

export const handleGetAllCode = (data) => {
    // console.log(data);
    return axios.get(`/api/allCode?type=${data}`);
};

export const handleGetTopDoctor = (limit) => {
    return axios.get(`/api/get-doctor-info?limit=${limit}`);
};

export const handleGetAllDoctor = () => {
    return axios.get(`/api/get-all-doctor`);
};

export const handleSaveDoctorDetail = (data) => {
    return axios.post('/api/save-detail-info-doctor', data);
};

export const handleGetDoctorDetailById = (id) => {
    return axios.get(`/api/get-doctor-detail-description-by-id?id=${id}`);
};

export const handleSavedoctorSchedule = (data) => {
    return axios.post('/api/post-dotor-schedule/bulk-create', data);
};

export const handleGetDoctorScheduleById = ({ id, date }) => {
    return axios.get(`/api/get-doctor-schedule-by-id?id=${id}&date=${date}`);
};

export const handleCreateBooking = (data) => {
    return axios.post(`/api/create-patient-examination`, data);
};
