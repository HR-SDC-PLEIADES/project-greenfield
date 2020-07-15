import React from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../../../redux/actions/questionActions';
import { updateHelpful } from '../../../redux/actions/helpfulAction';
import { QA_API_URL } from '../../../constants';

const HelpButton = ({ widget, data, update, id, clicked, helpIds }) => {
  const dataId = helpIds.filter(
    (el) => Number(Object.keys(el)[0]) === (data.question_id || data.id)
  )[0];
  const dataBool = Object.values(dataId)[0];
  const handleClick = (e) => {
    e.preventDefault();
    if (widget === 'qa' && !dataBool) {
      fetch(`${QA_API_URL}/qa/question/${data.question_id}/helpful`, {
        method: 'PUT',
      })
        .then(() => {
          update(id);
          setTimeout(() => clicked(data.question_id), 150);
        })
        .catch((err) => console.log(err));
    } else if (widget === 'answer' && !dataBool) {
      fetch(`${QA_API_URL}/qa/answer/${data.id}/helpful`, {
        method: 'PUT',
      })
        .then(() => {
          update(id);
          setTimeout(() => clicked(data.id), 150);
        })
        .catch((err) => console.log('Helpful update error'));
    }
  };
  return (
    <div className="help-div">
      Helpful?
      <button type="button" onClick={handleClick} className="yes-btn">
        {' '}
        Yes
      </button>
      ({data.question_helpfulness || data.helpfulness})
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  update: (id) => dispatch(fetchQuestions(id)),
  clicked: (id) => dispatch(updateHelpful(id)),
});
const mapStateToProps = (state) => ({
  id: state.product.product.id,
  helpIds: state.helpfulIds,
});

export default connect(mapStateToProps, mapDispatchToProps)(HelpButton);
