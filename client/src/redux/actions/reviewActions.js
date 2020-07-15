import {
  GET_REVIEWS,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAILURE,
  UPDATE_REVIEWS_COUNT,
  UPDATE_REVIEWS_SORT,
} from './types';
import { REVIEWS_API_URL } from '../../constants';

export const getReviews = () => ({
  type: GET_REVIEWS,
});

export const getReviewsSuccess = (reviews) => ({
  type: GET_REVIEWS_SUCCESS,
  payload: reviews,
});

export const getReviewsFailure = (error) => ({
  type: GET_REVIEWS_FAILURE,
  error,
});

export const updateCount = (count) => ({
  type: UPDATE_REVIEWS_COUNT,
  payload: count,
});

export const updateSort = (sort) => ({
  type: UPDATE_REVIEWS_SORT,
  payload: sort,
});

export const fetchReviews = (count = 2, id, sort = 'relevant') => (
  dispatch
) => {
  dispatch(getReviews());
  fetch(`${REVIEWS_API_URL}/reviews/${id}/list?count=${count}&sort=${sort}`)
    .then((res) => res.json())
    .then((data) => dispatch(getReviewsSuccess(data)))
    .catch((err) => dispatch(getReviewsFailure(err)));
};

export const updateReviewCount = (count) => (dispatch) => {
  dispatch(updateCount(count));
};

export const updateReviewSort = (sort) => (dispatch) => {
  dispatch(updateSort(sort));
};
