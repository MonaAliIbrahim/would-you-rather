import {
  FETCH_QUESTION_REQUEST, FETCH_QUESTION_SUCCESS, FETCH_QUESTION_FAIL,
  ADD_QUESTION_REQUEST, ADD_QUESTION_SUCCESS, ADD_QUESTION_FAIL,
  ADD_ANSWER_REQUEST, ADD_ANSWER_SUCCESS, ADD_ANSWER_FAIL } from "./types";
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../../DATA';


/**
  * This Request is used in Home Component
  * The function return all question's id, author,
  * optionOne and optionTwo and their votes
**/
export function fetchQuestions() {
  return (dispatch) => {

    dispatch({type: FETCH_QUESTION_REQUEST});

    _getQuestions().then(response => {
      dispatch({type: FETCH_QUESTION_SUCCESS, payload: response});

    }).catch(error => {
      dispatch({type: FETCH_QUESTION_FAIL, payload: error})

    })

  }
}


/**
  * This Request is used in New Question Component
  * The function save new question's author,
  * optionOne and optionTwo
**/
export function addQuestion(question) {
  return (dispatch) => {

    dispatch({type: ADD_QUESTION_REQUEST});

    _saveQuestion(question).then(response => {
      dispatch({type: ADD_QUESTION_SUCCESS, payload: response});

    }).catch(error => {
      dispatch({type: ADD_QUESTION_FAIL, payload: error})

    })

  }
}


/**
  * This Request is used in Question Details Component
  * The function save question's answer
**/
export function addQuestionAnswer(answer) {
  return (dispatch) => {

    dispatch({type: ADD_ANSWER_REQUEST});

    _saveQuestionAnswer(answer).then(response => {
      dispatch({type: ADD_ANSWER_SUCCESS, payload: response});

    }).catch(error => {
      dispatch({type: ADD_ANSWER_FAIL, payload: error})

    })

  }
}