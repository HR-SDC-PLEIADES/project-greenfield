import React, { useState } from 'react';
import HelpButton from './HelpButton';
import ReportButton from './ReportButton';

// think about using ...args as a parameter so that you can add more to it, will probably make seller sorting easier
const Tile = ({ widget, data }) => {
  const renderTile = () => {
    if (widget === 'qa') {
      return data.map((element) => {
        const [showMore, setShowMore] = useState(false);
        const handleChange = (e) => {
          e.preventDefault();
          return setShowMore(true);
        };
        return (
          <li key={element.question_id}>
            <div className="qa-title">
              <div className="qa-body">
                Q:{' '}
                <div className="q-title">
                  <strong>{element.question_body}</strong>
                </div>
              </div>
              <div className="qa-help-answer">
                <HelpButton widget="qa" data={element} />| Add Answer
              </div>
            </div>
            <div className="answer-div">
              <div className="a-title">A: </div>
              <ul className="answers-list">
                {Object.values(element.answers)
                  .sort((a, b) => b.helpfulness - a.helpfulness)
                  .map((value, idx) => {
                    if (idx < 2) {
                      const dateFormat = new Date(value.date)
                        .toDateString()
                        .slice(4, value.date.length);
                      return (
                        <li key={value.id} className="answer">
                          <div className="a-body">{value.body}</div>
                          <div className="a-info">
                            {value.photos.length > 1 ? (
                              value.photos.map((el, index) => {
                                return (
                                  <img
                                    src={el}
                                    alt="answer photo"
                                    key={index + Math.random() * 86}
                                    width="150px"
                                    height="150px"
                                    className="a-photos"
                                  />
                                );
                              })
                            ) : (
                              <></>
                            )}
                            <div className="a-name">
                              by {value.answerer_name}, {dateFormat}
                            </div>
                            |
                            <HelpButton widget="answer" data={value} /> |
                            <ReportButton widget="answer" data={value} />
                          </div>
                        </li>
                      );
                    }
                  })}
              </ul>
            </div>
            <div className="more-div">
              {Object.values(element.answers).length > 2 && !showMore ? (
                <a href="" onClick={handleChange} className="show-btn">
                  <strong>Show More Answers</strong>
                </a>
              ) : (
                <ul className="more-list">
                  {Object.values(element.answers)
                    .sort((a, b) => b.helpfulness - a.helpfulness)
                    .map((value, idx) => {
                      if (idx > 2 && idx < 10) {
                        const dateFormat = new Date(value.date)
                          .toDateString()
                          .slice(4, value.date.length);
                        return (
                          <li key={value.id} className="answer">
                            <div className="a-body">{value.body}</div>
                            <div className="a-info">
                              {value.photos.length > 1 ? (
                                value.photos.map((el, index) => {
                                  return (
                                    <img
                                      src={el}
                                      alt="answer photo"
                                      key={index + Math.random() * 86}
                                      width="150px"
                                      height="150px"
                                      className="a-photos"
                                    />
                                  );
                                })
                              ) : (
                                <></>
                              )}
                              <div className="a-name">
                                by {value.answerer_name}, {dateFormat}
                              </div>
                              | <HelpButton widget="answer" data={value} /> |
                              <ReportButton widget="answer" data={value} />
                            </div>
                          </li>
                        );
                      }
                    })}
                </ul>
              )}
            </div>
          </li>
        );
      });
    }
  };
  return <ul>{renderTile()}</ul>;
};

export default Tile;
