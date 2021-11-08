import { fetchError, fetchStart, fetchSuccess } from '../../../redux/actions';
import { setAuthUser, setForgetPassMailSent, updateLoadUser } from '../../../redux/actions/Auth';
import React from 'react';
import {getCurrentUser, login} from "../../../util/APIUtils";
import {ACCESS_TOKEN, ACCESS_TOKEN_ROMICO} from "../../../constants";
import {getCurrentUserRestAPI, loginRestAPI} from "../../../util/RomicoAPIUtils";

const BasicAuth = {
  onRegister: ({ name, email, password }) => {
    return dispatch => {
      dispatch(fetchStart());

      setTimeout(() => {
        dispatch(fetchSuccess());
        const user = { name: name, email: email, password: password };
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(setAuthUser(user));
      }, 300);
    };
  },

  onLogin: ({ email, password }) => {
    return dispatch => {
      console.log("success")
      const loginRequest = Object.assign({}, {username: email, password: password});
      loginRestAPI(loginRequest)
          .then(response => {
            localStorage.setItem(ACCESS_TOKEN_ROMICO, response.accessToken);
            const user = {name: 'Admin', email: email, password: password};
            getCurrentUserRestAPI(email)
                .then(response => {
                  localStorage.setItem('user', JSON.stringify(response));
                  dispatch(setAuthUser(user));

                })
          }).catch(error => {
        if (error.status === 401) {
          alert("Your username or password is incorrect!");
        } else {
          alert({
            message: 'Romico App',
            description: error.message || 'Sorry! Something went wrong. Please try again!'
          });
        }
      });
    }
  },
  onLogout: () => {
    return dispatch => {
      dispatch(fetchStart());

      setTimeout(() => {
        dispatch(fetchSuccess());
        localStorage.removeItem('user');
        dispatch(setAuthUser(null));
      }, 300);
    };
  },

  getAuthUser: (loaded = false) => {
    return dispatch => {
      dispatch(fetchStart());
      dispatch(updateLoadUser(loaded));

      setTimeout(() => {
        dispatch(fetchSuccess());
        dispatch(setAuthUser(JSON.parse(localStorage.getItem('user'))));
      }, 300);
    };
  },

  getCurrentAuthUser: () => {
    return ({
        type: 'USER',
        payload: JSON.parse(localStorage.getItem('user'))});
  },

  onForgotPassword: () => {
    return dispatch => {
      dispatch(fetchStart());

      setTimeout(() => {
        dispatch(setForgetPassMailSent(true));
        dispatch(fetchSuccess());
      }, 300);
    };
  },
  getSocialMediaIcons: () => {
    return <React.Fragment> </React.Fragment>;
  },
};

export default BasicAuth;
