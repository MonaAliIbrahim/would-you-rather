import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import PollCard from "./poll_card";
import ResultVotes from "./result_votes";
import PropTypes from 'prop-types';

function QuestionDetails() {

  const [question, setQuestion] = useState({});
  const [avatar, setAvatar] = useState('');
  const [firstVoteResult, setFirstVoteResult] = useState(0);
  const [secondVoteResult, setSecondVoteResult] = useState(0);
  const authUser = useSelector(state => state.user.user);
  let location = useLocation();

  useEffect(() => {
    if(location.state.question) {
      setQuestion(location.state.question)
      setAvatar(location.state.userAvatarURL)

      const firstVoteResult = question.optionOne?.votes.filter(user => user === authUser.id).length;
      setFirstVoteResult(firstVoteResult);

      const secondVoteResult = question.optionTwo?.votes.filter(user => user === authUser.id).length;
      setSecondVoteResult(secondVoteResult);
    }
  },[location.state, question, authUser]);

  return(
    <React.Fragment>
      {(firstVoteResult === 0 && secondVoteResult === 0) &&
        <PollCard question={question} avatar={avatar} />}
      {(firstVoteResult === 1 || secondVoteResult === 1) &&
        <ResultVotes question={question} avatar={avatar} />}
    </React.Fragment>
  )
}

QuestionDetails.propTypes = {
  question: PropTypes.object,
}

export default QuestionDetails;