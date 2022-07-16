import React, { useEffect, useState } from 'react';
import { Card, Image, Progress, Segment, Label } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function ResultVotes(props) {

  const authUser = useSelector(state => state.user.user);
  const [total, setTotal] = useState(0);
  const [firstOptionVotes, setFirstOptionVotes] = useState(0);
  const [secondOptionVotes, setSecondOptionVotes] = useState(0);
  const [userVote, setUserVote] = useState('');

  useEffect(() => {
    setFirstOptionVotes(props.question.optionOne?.votes.length);
    setSecondOptionVotes(props.question.optionTwo?.votes.length);
    setTotal(firstOptionVotes + secondOptionVotes);
    // Set User Vote Flag
    for(let i = 0; i < firstOptionVotes; i++) {
      if(props.question.optionOne?.votes[i] === authUser.id) {
        setUserVote('option1');
        break;
      }
    }
    if(!userVote) {
      for(let i = 0; i < secondOptionVotes; i++) {
        if(props.question.optionTwo?.votes[i] === authUser.id) {
          setUserVote('option2');
          break;
        }
      }
    }
  }, [props, total, firstOptionVotes, secondOptionVotes, userVote, authUser])

  return (
    <Card className="centered">
      <Card.Content>
        <Image floated='right' size='tiny'
          src={props.avatar}/>
        <Card.Header>
          <strong>{props.question?.author}</strong> asks
        </Card.Header>
        <Card.Meta>Would you rather</Card.Meta>
        <Card.Description>
          <Segment>
            {userVote === 'option1' &&
            <Label as='a' color='red' ribbon='right' 
              style={{left: 'calc(100% - 45px)'}}>
              Your Vote
            </Label>}
            <h4>{props.question.optionOne?.text}</h4>
            <Progress 
              percent={(firstOptionVotes / total) * 100} 
              style={{'margin': '10px', 'height': 'auto'}} progress />
            <strong>
              {firstOptionVotes} out of {total} votes
            </strong>
          </Segment>
          <Segment>
            {userVote === 'option2' &&
            <Label as='a' color='red' ribbon='right' 
              style={{left: 'calc(100% - 45px)'}}>
              Your Vote
            </Label>}
            <h4>{props.question.optionTwo?.text}</h4>
            <Progress 
              percent={(secondOptionVotes / total) * 100} 
              style={{'margin': '10px', 'height': 'auto'}} progress />
            <strong>
              {secondOptionVotes} out of {total} votes
            </strong>
          </Segment>
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

ResultVotes.prototypes = {
  authUser: PropTypes.object.isRequired
}

export default ResultVotes;