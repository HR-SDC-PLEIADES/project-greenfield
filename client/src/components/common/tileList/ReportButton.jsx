import React, { useState } from 'react';
import { QA_API_URL } from '../../../constants';

const ReportButton = ({ widget, data }) => {
  const [clicked, setClicked] = useState(false);
  const handleChange = (bool) => {
    setClicked(bool);
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (widget === 'answer') {
      fetch(`${QA_API_URL}/qa/answer/${data.id}/report`, {
        method: 'PUT',
      })
        .then(() => handleChange(true))
        .catch((err) => console.log('report error'));
    }
  };
  return (
    <div className="report-div">
      {!clicked ? (
        <button type="button" onClick={handleClick} className="report-btn">
          Report
        </button>
      ) : (
        <p>Reported</p>
      )}
    </div>
  );
};

export default ReportButton;
