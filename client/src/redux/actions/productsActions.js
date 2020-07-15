import {
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
} from './types';
import { PRODUCTS_API_URL } from '../../constants';

export const getProducts = () => ({
  type: GET_PRODUCTS,
});

export const getProductsSuccess = (products) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: products,
});

export const getProductsFailure = () => ({
  type: GET_PRODUCTS_FAILURE,
});

export const fetchProducts = (page) => (dispatch) => {
  dispatch(getProducts());
  fetch(`${PRODUCTS_API_URL}/products/list?page=${page}&count=100`)
    .then((res) => res.json())
    .then((data) => dispatch(getProductsSuccess(data)))
    .catch((err) => dispatch(getProductsFailure()));
};
