import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { addQuestion } from '../../redux/actions/questionAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import './new-question.scss'

function NewQuestion() {

  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const dispatch = useDispatch();
  const addResult = useSelector(state => state.question.addResult);
  // const [showMessage, setShowMessage] = useState('false'); 
  const authUser = useSelector(state => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if(addResult.length > 0) {
      navigate('/');
      // setShowMessage('true');
      // setTimeout(() => {
      //   setShowMessage('false');
      //   navigate('/');
      // }, 2000)
    }
  }, [addResult, navigate])

  const submitAction = () => {
    let question = {
      optionOneText: option1,
      optionTwoText: option2,
      author: authUser.id
    }
    dispatch(addQuestion(question));
  }

  return(
    <React.Fragment>
      <Card className="add-card">
        <Card.Content header='Create New Question' />
        <Card.Content>
          <Card.Meta>Complete the question:</Card.Meta>
          <Card.Description>
            <Form>
              <Form.Field> Would You Rather ... </Form.Field>
              <Form.Field>
                <Input
                  name="option1"
                  value={option1}
                  onChange={(e) => {setOption1(e.target.value)}}
                />
              </Form.Field>
              <p> OR </p>
              <Form.Field>
              <Input
                  value={option2}
                  name="option2"
                  onChange={(e) => {setOption2(e.target.value)}}
                />
              </Form.Field>
              <Button color="teal" onClick={submitAction}>Submit</Button>
            </Form>
          </Card.Description>
        </Card.Content>
      </Card>
      {/* {!showMessage &&
      <Message floating color='green'>{addResult}</Message>} */}
    </React.Fragment>
  );
}

NewQuestion.propTypes = {
  option1: PropTypes.string,
  option2: PropTypes.string,
  addQuestion: PropTypes.func,
  authUser: PropTypes.object
}

export default NewQuestion;