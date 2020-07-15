import {
  GET_QUESTIONS,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAILURE,
} from './types';
import { QA_API_URL } from '../../constants';

export const getQuestions = () => ({
  type: GET_QUESTIONS,
});

export const getQuestionsSuccess = (questions) => ({
  type: GET_QUESTIONS_SUCCESS,
  payload: questions,
});

export const getQuestionsFailure = (err) => ({
  type: GET_QUESTIONS_FAILURE,
  payload: err,
});

export const fetchQuestions = (productId) => (dispatch) => {
  dispatch(getQuestions());
  fetch(`${QA_API_URL}/qa/${productId}/`)
    .then((res) => res.json())
    .then((data) => dispatch(getQuestionsSuccess(data)))
    .catch((err) => dispatch(getQuestionsFailure(err)));
};
