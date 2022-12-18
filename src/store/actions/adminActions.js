import actionTypes from './actionTypes';
import { handleGetAllCode, handleCreateNewUser } from '../../services/index';

export const fetchGender = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER });
            let data = {
                gender: await handleGetAllCode('GENDER'),
                role: await handleGetAllCode('ROLE'),
                position: await handleGetAllCode('POSITION'),
            };

            // console.log(data);
            if (data && data.errCode !== 0) {
                dispatch(fetchGenderSuccess(data));
            } else {
                dispatch(fetchGenderFail());
            }
        } catch (e) {
            console.log(e);
            dispatch(fetchGenderFail());
        }
    };
};

export const fetchGenderSuccess = (data) => {
    return { type: actionTypes.FETCH_GENDER_SUCCESS, data: data };
};
export const fetchGenderFail = () => {
    return { type: actionTypes.FETCH_GENDER_FAIL };
};

export const fetchCreateUser = (data) => {
    // console.log(data);
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_CREATE_USER });
            let fetcthData = await handleCreateNewUser(data);

            console.log(fetcthData);
            if (data && data.errCode !== 0) {
                dispatch(fetchCreateUserSuccess(fetcthData));
            } else {
                dispatch(fetchCreateUserFail(fetcthData));
            }
        } catch (e) {
            console.log(e);
            dispatch(fetchCreateUserFail(e));
        }
    };
};

export const fetchCreateUserSuccess = (data) => {
    return { type: actionTypes.FETCH_CREATE_USER_SUCCESS, data };
};

export const fetchCreateUserFail = (data) => {
    return { type: actionTypes.FETCH_CREATE_USER_FAIL, data };
};
