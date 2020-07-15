import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, TextField, makeStyles, Button } from '@material-ui/core';
import { fetchQuestions } from '../../../redux/actions/questionActions';
import { QA_API_URL } from '../../../constants';

const AddQuestion = ({ open, handleClose, name, id, update }) => {
  const [email, setEmail] = React.useState('');
  const [nickname, setName] = React.useState('');
  const [question, setQuestion] = React.useState('');
  const [nameErr, setNameErr] = React.useState(false);
  const [emailErr, setEmailErr] = React.useState(false);
  const [questErr, setQuestErr] = React.useState(false);

  const handleErrorChange = (stateName, bool) => {
    if (stateName === email) return setEmailErr(bool);
    if (stateName === nickname) return setNameErr(bool);
    if (stateName === question) return setQuestErr(bool);
  };

  const handleChange = (stateName, e) => {
    const { value } = e.target;
    if (stateName === email) setEmail(value);
    else if (stateName === nickname) setName(value);
    else if (stateName === question) setQuestion(value);

    if (nickname.length > 1) handleErrorChange(nickname, false);
    if (question.length > 1) handleErrorChange(question, false);
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase()) || email.length > 1) {
      handleErrorChange(email, false);
    }
  };

  useEffect(() => {
    if (nickname.length < 1) setNameErr(true);
    if (question.length < 1) setQuestErr(true);
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase()) || email.length < 1) {
      setEmailErr(true);
    }
  });

  const handleClick = (e) => {
    e.preventDefault();
    const data = {
      body: question,
      name: nickname,
      email,
    };
    setTimeout(() => {
      if (emailErr === false && nameErr === false && questErr === false) {
        fetch(`${QA_API_URL}/qa/${id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify(data),
        })
          .then((res) => res.status)
          .then(() => {
            setEmail('');
            setName('');
            setQuestion('');
            handleClose();
            update(id);
          })
          .catch((err) => console.log(err));
      }
    }, 150);
  };
  function getModalStyle() {
    return {
      margin: 'auto',
    };
  }

  const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '20px',
    },
    paper: {
      position: 'absolute',
      width: 600,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const useTextStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '400px',
      },
    },
  }));
  const classesText = useTextStyles();
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Ask Your Question</h2>
      <p id="simple-modal-description">
        About the
        {name}
      </p>
      <br />
      <form
        className={classesText.root}
        noValidate
        autoComplete="off"
        onSubmit={handleClick}
      >
        {!nameErr ? (
          <TextField
            required
            id="outlined-basic-nickname"
            label="Nickname"
            helperText="For privacy reasons, do not use your full name or email address"
            variant="outlined"
            placeholder="Example: jackson11!"
            inputProps={{ maxLength: 60, minLength: 3 }}
            onChange={(e) => handleChange(nickname, e)}
            fullWidth
          />
        ) : (
          <TextField
            error
            id="outlined-basic-nickname"
            label="Nickname"
            helperText="You must enter the following: Nickname"
            variant="outlined"
            placeholder="Example: jackson11!"
            inputProps={{ maxLength: 60, minLength: 3 }}
            onChange={(e) => handleChange(nickname, e)}
            fullWidth
          />
        )}

        <br />
        {!emailErr ? (
          <TextField
            required
            id="outlined-basic-email"
            label="Email"
            helperText="For authentication reasons, you will not be emailed"
            placeholder="Why did you like the product or not?"
            variant="outlined"
            inputProps={{ maxLength: 60, minLength: 6 }}
            onChange={(e) => handleChange(email, e)}
            fullWidth
          />
        ) : (
          <TextField
            error
            id="outlined-basic-email"
            label="Email"
            helperText="You must enter the following: Valid email"
            placeholder="Why did you like the product or not?"
            variant="outlined"
            inputProps={{ maxLength: 60, minLength: 6 }}
            onChange={(e) => handleChange(email, e)}
            fullWidth
          />
        )}
        <br />
        {!questErr ? (
          <TextField
            required
            id="outlined-multiline-static"
            label="Enter Question.."
            multiline
            rows={2}
            variant="outlined"
            inputProps={{ maxLength: 1000, minLength: 50 }}
            onChange={(e) => handleChange(question, e)}
          />
        ) : (
          <TextField
            error
            id="outlined-multiline-static"
            label="You Must enter the following: Valid Question"
            multiline
            rows={2}
            variant="outlined"
            inputProps={{ maxLength: 1000, minLength: 50 }}
            onChange={(e) => handleChange(question, e)}
          />
        )}
      </form>
      <br />
      <Button
        type="submit"
        variant="contained"
        size="medium"
        onClick={handleClick}
      >
        Submit
      </Button>
    </div>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {body}
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => ({
  name: state.product.product.name,
  id: state.product.product.id,
});

const mapDispatchToProps = (dispatch) => ({
  update: (id) => dispatch(fetchQuestions(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);
