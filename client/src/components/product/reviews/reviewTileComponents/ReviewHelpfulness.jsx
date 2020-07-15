import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { REVIEWS_API_URL } from '../../../../constants';

const ReviewHelpfulness = ({ helpfulness }) => {
  const { id } = useParams();
  const [helpfulCount, setHelpfulCount] = useState(helpfulness);
  const [disable, setDisable] = useState('helpful-on');

  const sendPutRequest = () => {
    fetch(`${REVIEWS_API_URL}/reviews/helpful/${id}`, {
      method: 'PUT',
    })
      .then((response) => response.status)
      .then((result) => result)
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setHelpfulCount(helpfulCount + 1);
    sendPutRequest();
    if (disable === 'helpful-on') {
      setDisable('helpful-off');
    } else {
      setDisable('helpful-on');
    }
  };

  return (
    <>
      <div className={disable}>
        {'Helpful ? '}
        <a href="#" className={disable} value={1} onClick={handleClick}>
          Yes
        </a>
        {`( ${helpfulCount} )`}
      </div>
    </>
  );
};

export default ReviewHelpfulness;
