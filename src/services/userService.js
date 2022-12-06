import axios from '../axios';

export const handleLoginUser = (email, password) => {
    return axios.post('/api/login', { email, password });

    // console.log(123);
};
