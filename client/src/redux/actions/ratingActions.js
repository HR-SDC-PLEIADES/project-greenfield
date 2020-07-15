import {
  GET_REVIEWS_META,
  GET_REVIEWS_META_SUCCESS,
  GET_REVIEWS_META_FAILURE,
} from './types';
import { PRODUCTS_API_URL } from '../../constants';

export const getReviewsMeta = () => ({
  type: GET_REVIEWS_META,
});

export const getReviewsMetaSuccess = (meta) => ({
  type: GET_REVIEWS_META_SUCCESS,
  payload: meta,
});

export const getReviewsMetaFailure = (error) => ({
  type: GET_REVIEWS_META_FAILURE,
  error,
});

export const fetchReviewsMeta = (id) => (dispatch) => {
  dispatch(getReviewsMeta());
  fetch(`${PRODUCTS_API_URL}/reviews/${id}/meta`)
    .then((res) => res.json())
    .then((data) => dispatch(getReviewsMetaSuccess(data)))
    .catch((err) => dispatch(getReviewsMetaFailure(err)));
};
