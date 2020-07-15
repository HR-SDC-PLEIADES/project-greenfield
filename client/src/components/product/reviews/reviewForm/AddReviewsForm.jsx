import React, { useState } from 'react';
import {
  Modal,
  TextField,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Button,
} from '@material-ui/core';
import { connect } from 'react-redux';
import Rating from '@material-ui/lab/Rating';
import { useParams } from 'react-router-dom';
import SizeCharacteristic from './characteristics/SizeCharacteristic';
import WidthCharacteristic from './characteristics/WidthCharacteristic';
import ComfortCharacteristic from './characteristics/ComfortCharacteristic';
import QualityCharacteristic from './characteristics/QualityCharacteristic';
import LengthCharacteristic from './characteristics/LengthCharacteristic';
import FitCharacteristic from './characteristics/FitCharacteristic';
import AddImages from './AddImages';
import { REVIEWS_API_URL } from '../../../../constants';

const AddReviewsForm = ({ meta, name }) => {
  const [value, setValue] = React.useState(0); // the selected star value
  const [hover, setHover] = React.useState(-1);
  const [form, setForm] = useState(true);
  const { id } = useParams();

  const labels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Average',
    4: 'Good',
    5: 'Great',
  };

  const [characteristics, setCharacteristics] = useState({
    '1': '5',
    '2': '5',
    '3': '5',
    '4': '5',
    '5': '5',
    '6': '5',
  });

  const [recommend, setRecommend] = useState(true);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const bodyCharCount = 50 - body.length;

  const handleStateChange = (v, target) => {
    setCharacteristics({
      ...characteristics,
      [v]: target,
    });
  };

  const handleRadioButtonClick = (e) => {
    if (e.target.value === 'no') {
      setRecommend(false);
    }
  };

  const handleFormChange = (e) => {
    let id = e.target.getAttribute('id');

    if (id === 'review-summary') {
      setSummary(e.target.value);
    } else if (id === 'review-body') {
      setBody(e.target.value);
    } else if (id === 'nickname') {
      setNickname(e.target.value);
    } else if (id === 'email') {
      setEmail(e.target.value);
    }
  };

  const createRequestBody = () => {
    return {
      rating: value,
      summary,
      body,
      recommend,
      name: nickname,
      email,
      characteristics,
    };
  };

  const reviewPost = (formBody) => {
    fetch(`${REVIEWS_API_URL}/reviews/${id}`, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formBody),
    })
      .then((response) => {
        return response.statusText;
      })
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let submitBody = createRequestBody();
    reviewPost(submitBody);
    setForm(!form);
  };

  const renderForm = () => {
    if (form) {
      return (
        <>
          <h2>Write Your Review</h2>
          <h3>
            About the
            {` ${name}`}
          </h3>
          <form onSubmit={handleSubmit}>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating
                name="hover-feedback"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
              />
              {value !== null && (
                <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
              )}
            </Box>

            <FormLabel>Do you recommend this product?</FormLabel>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
              onClick={handleRadioButtonClick}
            >
              <FormControlLabel
                value="yes"
                control={<Radio color="primary" />}
                label="Yes"
                labelPlacement="bottom"
              />
              <FormControlLabel
                value="no"
                control={<Radio color="primary" />}
                label="No"
                labelPlacement="bottom"
              />
            </RadioGroup>

            <br />
            <br />
            <SizeCharacteristic change={handleStateChange} />
            <br />
            <WidthCharacteristic change={handleStateChange} />
            <br />
            <ComfortCharacteristic change={handleStateChange} />
            <br />
            <QualityCharacteristic change={handleStateChange} />
            <br />
            <LengthCharacteristic change={handleStateChange} />
            <br />
            <FitCharacteristic change={handleStateChange} />
            <br />
            <TextField
              className="standard-full-width"
              id="review-summary"
              label="Review Summary"
              style={{ margin: 8, marginTop: 25 }}
              onChange={handleFormChange}
              placeholder="Summary"
              fullWidth
              margin="normal"
              inputProps={{ maxLength: 60 }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <br />
            <TextField
              className="standard-full-width"
              id="review-body"
              label="Review Body"
              style={{ margin: 8, marginTop: 25 }}
              placeholder="Review"
              onChange={handleFormChange}
              fullWidth
              margin="normal"
              inputProps={{ maxLength: 1000, minLength: 50 }}
              required={true}
              InputLabelProps={{
                shrink: true,
              }}
              helperText={
                50 - body.length < 0
                  ? 'Minimum reached'
                  : `Minimum required characters left: [${bodyCharCount}]`
              }
            />

            <br />
            <AddImages />

            <br />
            <TextField
              className="standard-full-width"
              id="nickname"
              label="Nickname"
              style={{ margin: 8, marginTop: 25 }}
              placeholder="Nickname"
              fullWidth
              margin="normal"
              onChange={handleFormChange}
              inputProps={{ maxLength: 60 }}
              InputLabelProps={{
                shrink: true,
              }}
              helperText="For privacy reasons, do not use your full name or email address"
              required={true}
            />

            <TextField
              className="standard-full-width"
              id="email"
              label="Email"
              style={{ margin: 8, marginTop: 25 }}
              placeholder="Email"
              fullWidth
              margin="normal"
              onChange={handleFormChange}
              inputProps={{ maxLength: 60 }}
              InputLabelProps={{
                shrink: true,
              }}
              helperText="For authentication reasons, you will not be emailed"
              required={true}
            />

            <Button type="submit" variant="contained" size="large">
              Submit
            </Button>
          </form>
        </>
      );
    }

    return <div className="review-submitted">Review Submitted!</div>;
  };

  return <>{renderForm()}</>;
};

const mapStateToProps = (state) => ({
  meta: state.ratings.meta,
});

export default connect(mapStateToProps)(AddReviewsForm);
