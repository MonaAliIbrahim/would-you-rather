import {
  FETCH_USER_REQUEST, 
  FETCH_USER_SUCCESS, 
  FETCH_USER_FAIL,
  ADD_AUTHUSER } from "./types";
import { _getUsers } from '../../DATA';


/**
  * This Request is used in Users and Login Component
  * The function return user's ID, name, avatarURL,
    answers and questions
**/
export function fetchUsers() {
  return (dispatch) => {

    dispatch({type: FETCH_USER_REQUEST});

    _getUsers().then(response => {
      dispatch({type: FETCH_USER_SUCCESS, payload: response});

    }).catch(error => {
      dispatch({type: FETCH_USER_FAIL, payload: error})

    })

  }
}


/**
  * This Request is used in Login Component
  * The function is used to save current user's ID, name, avatarURL,
    answers and questions
**/
export function addAuthUser(user) {
  return {
    type: ADD_AUTHUSER,
    user: user
  }
}