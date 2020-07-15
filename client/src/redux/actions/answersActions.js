import { GET_ANSWERS, GET_ANSWERS_SUCCESS, GET_ANSWERS_FAILURE } from './types';
import { QA_API_URL } from '../../constants';

export const getAnswers = () => ({
  type: GET_ANSWERS,
});

export const getAnswersSuccess = (answers) => ({
  type: GET_ANSWERS_SUCCESS,
  payload: answers,
});

export const getAnswersFailure = (err) => ({
  type: GET_ANSWERS_FAILURE,
  payload: err,
});

export const fetchAnswers = (questionId) => (dispatch) => {
  dispatch(getAnswers());
  fetch(`${QA_API_URL}/qa/${questionId}/answers`)
    .then((res) => res.json())
    .then((data) => dispatch(getAnswersSuccess(data)))
    .catch((err) => dispatch(getAnswersFailure(err)));
};
