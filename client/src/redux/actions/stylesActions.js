import {
  GET_STYLES,
  GET_STYLES_SUCCESS,
  GET_STYLES_FAILURE,
  UPDATE_CURRENT_STYLE_SUCCESS,
} from './types';
import { PRODUCTS_API_URL } from '../../constants';

export const getStyles = () => ({
  type: GET_STYLES,
});

export const getStylesSuccess = (styles) => ({
  type: GET_STYLES_SUCCESS,
  payload: styles,
});

export const getStylesFailure = (err) => ({
  type: GET_STYLES_FAILURE,
  payload: err,
});

export const fetchStyles = (productId) => (dispatch) => {
  dispatch(getStyles());
  fetch(`${PRODUCTS_API_URL}/products/${productId}/styles`)
    .then((res) => res.json())
    .then((data) => {
      dispatch(getStylesSuccess(data));
    })
    .catch((err) => dispatch(getStylesFailure(err)));
};

export const updateCurrentStyle = (style) => ({
  type: UPDATE_CURRENT_STYLE_SUCCESS,
  style,
});
