import React, { useState, useEffect } from 'react';
import { Grid, Card, Image, Label, Dimmer, Loader } from 'semantic-ui-react';
import './users.scss';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../redux/actions/userAction';

function Users() {

  const [colors, setColor] = useState([]);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users?.sort((a, b) => 
                (Object.keys(a.answers).length + a.questions.length < Object.keys(b.answers).length + b.questions.length) ? 1 : -1));
  
  useEffect(()=> {
    dispatch(fetchUsers());
    setColor(['red', 'orange', 'blue']);
  }, [dispatch]);

  return (
    <div className="userContainer">
      {/* Loadin */}
      {!users &&
        <Dimmer active inverted style={{position: 'initial'}}>
          <Loader inverted content='Loading' />
        </Dimmer>}
      {/* User Card */}
      <Grid columns={3}>
        {users?.length > 0 && users.map((user, index) => {
          return (
            <Grid.Column key={index}>
              <Card>
                <Image 
                  label={{ as: 'a', color: colors[index], corner: 'left', icon: 'trophy' }}
                  src= {user.avatarURL} wrapped ui={false} />
                <Card.Content>
                  <Card.Header>{user.name}</Card.Header>
                  <Card.Meta style={{color: colors[index]}}>
                    Rank: {index + 1}th
                  </Card.Meta>
                  <Card.Description>
                    <div>
                      <p>answered questions <span>{Object.keys(user.answers).length}</span></p>
                      <p>created questions <span>{user.questions.length}</span></p>
                    </div>
                    <div className="score">
                      <p>Score</p>
                      <Label as='a' color={colors[index]} circular>
                        {Object.keys(user.answers).length + user.questions.length}
                      </Label>
                    </div>
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            )
          })
        }
      </Grid>
    </div>
  );
}

Users.propTypes = {
  users: PropTypes.array,
  fetchUsers: PropTypes.func
}

export default Users;