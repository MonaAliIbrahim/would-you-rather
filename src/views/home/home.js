import React, { useState, useEffect } from 'react';
import { Menu, Segment, Grid, Label } from 'semantic-ui-react';
import './home.scss';
import QuestionCard from './question-card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../../redux/actions/questionAction';

function Home() {

  const [activeItem, setActiveItem] = useState('unanswered');
  const dispatch = useDispatch();
  const questions = useSelector(state => state.question.questions);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const authUser = useSelector(state => state.user.user);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch])

  useEffect(() => {
    setAnsweredQuestions([]);
    setUnansweredQuestions([]);
    if(questions?.length > 0) {
      questions.forEach(question => {
        if((question.optionOne.votes.filter(user => user === authUser.id).length) === 1
          ||(question.optionTwo.votes.filter(user => user === authUser.id).length) === 1 ){
          setAnsweredQuestions(answeredQuestions => [...answeredQuestions, question])
        }else {
          setUnansweredQuestions(unansweredQuestions => [...unansweredQuestions, question])
        }
      })
    }
  }, [authUser, questions])

  return (
    <div className='question-container'>
      <Menu attached='top' tabular>
        <Menu.Item
          className='text-capitalize'
          name='unanswered'
          active={activeItem === 'unanswered'}
          onClick={() => setActiveItem('unanswered')}>
          unanswered
          {unansweredQuestions &&
            <Label color='grey'>{unansweredQuestions.length}</Label>}
        </Menu.Item>
        <Menu.Item
          className='text-capitalize'
          name='answered'
          active={activeItem === 'answered'}
          onClick={() => setActiveItem('answered')}>
          answered
          {answeredQuestions && 
            <Label color='grey'>{answeredQuestions.length}</Label>}
        </Menu.Item>
      </Menu>
      <Segment attached='bottom'>
        <Grid columns={2}>          
          {activeItem === 'unanswered' &&
            <QuestionCard questions={unansweredQuestions} />}
          {activeItem === 'answered' && 
            <QuestionCard questions={answeredQuestions} />}
        </Grid>
      </Segment>
    </div>
  );
}

export default Home;