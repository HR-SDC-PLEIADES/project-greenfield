import { GET_PRODUCT, GET_PRODUCT_SUCCESS, GET_PRODUCT_FAILURE } from './types';
import { PRODUCTS_API_URL } from '../../constants';

export const getProduct = () => ({
  type: GET_PRODUCT,
});

export const getProductSuccess = (products) => ({
  type: GET_PRODUCT_SUCCESS,
  payload: products,
});

export const getProductFailure = () => ({
  type: GET_PRODUCT_FAILURE,
});

export const fetchProduct = (productId) => (dispatch) => {
  dispatch(getProduct());
  fetch(`${PRODUCTS_API_URL}/products/${productId}`)
    .then((res) => res.json())
    .then((data) => dispatch(getProductSuccess(data)))
    .catch((err) => dispatch(getProductFailure(err)));
};
