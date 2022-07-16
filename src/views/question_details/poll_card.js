import React, { useState, useEffect } from 'react';
import { Card, Image, Form, Checkbox, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './question_details.scss';
import { addQuestionAnswer } from '../../redux/actions/questionAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function PollCard(props) {

  const [answer, setAnswer] = useState('');
  const dispatch = useDispatch();
  const response = useSelector(state => state.question.answerResponse);
  const user = useSelector(state => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if(response === 'success') {
      navigate('/');
    }
  }, [response, navigate])

  const handleChange = (e, {value}) => {
    setAnswer(value);
  }

  const handleAddAnswer = () => {
    let data = {
      authedUser: user.id,
      qid: props.question.id,
      answer: answer
    }
    if(answer !== '') {
      dispatch(addQuestionAnswer(data));
    }
  }

  return (
    <React.Fragment>
      <Card className="vote-card centered">
        <Card.Content className='header'>
          <span>{props.question.author}</span> asks:
        </Card.Content>
        <Card.Content>
          <div className='text-center mb-3'>
            <Image src={props.avatar}
              size='small' className="ui circular image"/>
          </div>
          <Card.Description>
            <Form>
              <Form.Field> Would You Rather ... </Form.Field>
              {props.question.optionOne && 
                <Form.Field>
                  <Checkbox
                    radio
                    label= {props.question.optionOne.text}
                    name='checkboxRadioGroup'
                    value= 'optionOne'
                    checked= {answer === 'optionOne'}
                    onChange= {handleChange}
                  />
                </Form.Field>}
              {props.question.optionTwo &&
                <Form.Field>
                  <Checkbox
                    radio
                    label= {props.question.optionTwo.text}
                    name='checkboxRadioGroup'
                    value= 'optionTwo'
                    checked= {answer === 'optionTwo'}
                    onChange= {handleChange}
                  />
                </Form.Field>}
              <Button color="teal" fluid onClick={handleAddAnswer}>Submit</Button>
            </Form>
          </Card.Description>
        </Card.Content>
      </Card>
    </React.Fragment>
  )
}

PollCard.propTypes = {
  question: PropTypes.object,
  answer: PropTypes.string,
  user: PropTypes.object
}

export default PollCard;