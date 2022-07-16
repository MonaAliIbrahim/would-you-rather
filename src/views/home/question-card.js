import React, { useEffect } from 'react';
import { Card, Image, Button, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ProtoTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/actions/userAction'

function QuestionCard(props) {

  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);

  useEffect(() => { 
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    props.questions?.sort((a,b) => b.timestamp - a.timestamp).map((question) => {
      const user = users?.filter(user => user.id === question.author)[0]
      return(
        <Grid.Column key={question.id}>
          <Card className='question-card'>
            <Card.Content>
              <Card.Description>
                <Image
                  floated='right'
                  size='tiny'
                  src={user?.avatarURL} />
                  <div>
                    <h4 className='title'>
                      {question.author} asks
                    </h4>
                    <p>
                      Would you rather {question.optionOne?.text} or {question.optionTwo?.text} ?
                    </p>
                  </div>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button basic fluid>
                <Link 
                  to= {`/question/${question.id}`} 
                  state= {{question: question, userAvatarURL: user?.avatarURL}}
                  className= 'd-block'>
                  View Poll
                </Link>
              </Button>
            </Card.Content>
          </Card>
        </Grid.Column>
      )
    })

  );
}

QuestionCard.prototype = {
  questions: ProtoTypes.array
}

export default QuestionCard;