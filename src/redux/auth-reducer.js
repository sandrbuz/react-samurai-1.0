import { authAPI, profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";



const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';
const SET_AUTH_USER_AVATAR = 'SET_AUTH_USER_AVATAR';
const TOGGLE_IS_FETCHING_HEADER = 'TOGGLE_IS_FETCHING_HEADER';


export const setAuthUserData = (id, email, login, isAuth) => {
    return {
        type: SET_AUTH_USER_DATA,
        payload: { id, email, login, isAuth }
    }
}
export const setAuthUserAvatar = (avatar) => {
    return {
        type: SET_AUTH_USER_AVATAR,
        avatar
    }
}
export const toggleIsFetchingHeader = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING_HEADER, isFetching
    }
}

// thunk creators
export const getAuthUserData = () => async (dispatch) => {
    dispatch(toggleIsFetchingHeader(true));
    let response = await authAPI.me()
    if (response.resultCode === 0) {
        let { id, email, login } = response.data;
        dispatch(setAuthUserData(id, email, login, true))
        let data = await profileAPI.getProfile(id)
        dispatch(setAuthUserAvatar(data.photos.small))
        dispatch(toggleIsFetchingHeader(false))
    }
    dispatch(toggleIsFetchingHeader(false))
}

export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit('login', { _error: message }));
    }
}
export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

let initialState = {
    email: null,
    id: null,
    login: null,
    isAuth: false,
    avatarSmall: null,
    isFetchingHeader: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.payload
            };
        case SET_AUTH_USER_AVATAR:
            return {
                ...state,
                avatarSmall: action.avatar
            };
        case TOGGLE_IS_FETCHING_HEADER:
            return {
                ...state,
                isFetchingHeader: action.isFetching
            }
        default: return state;
    }
}
export default authReducer;
