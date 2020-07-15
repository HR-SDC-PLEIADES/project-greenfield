import { GET_CART, GET_CART_SUCCESS, GET_CART_FAILURE } from './types';
import { CART_API_URL } from '../../constants';

export const getCart = () => ({
  type: GET_CART,
});

export const getCartSuccess = (cartProducts) => ({
  type: GET_CART_SUCCESS,
  payload: cartProducts,
});

export const getCartFailure = () => ({
  type: GET_CART_FAILURE,
});

export const fetchCart = (userToken) => (dispatch) => {
  dispatch(getCart());
  fetch(`${CART_API_URL}/cart/${userToken}`)
    .then((res) => res.json())
    .then((data) => dispatch(getCartSuccess(data)))
    .catch((err) => dispatch(getCartFailure(err)));
};

export const addToCart = (userToken, skuId) => (dispatch) => {
  console.log(`ut: ${userToken}, sku: ${skuId}`);
  dispatch(getCart());
  fetch(`${CART_API_URL}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_token: userToken, sku_id: skuId }),
  })
    .then((res) => res.json())
    .then(() => dispatch(fetchCart(userToken)))
    .catch((err) => dispatch(getCartFailure(err)));
};
