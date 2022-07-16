import React, { useState, useEffect } from 'react';
import { Grid, Card, Form, Select, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, addAuthUser } from '../../redux/actions/userAction';
import { useNavigate  } from "react-router-dom";
import PropTypes from 'prop-types';
import './login.scss';

function Login() {

  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const generateOptions = () => {
    return users?.map(user => ({
      key: user.id,
      text: user.name,
      value: user.id,
      image: { avatar: true, src: user.avatarURL }
    }));
  };

  const renderOptions = () => {
    return (
      <Select placeholder='Select User Name'
        options={generateOptions()} 
        value={inputValue} 
        onChange={(e, {value}) => setInputValue(value)}/>
    )
  };

  const handleLoginAction = () => {
    users.forEach((user) => {
      if(user.id === inputValue) {
        dispatch(addAuthUser(user));
        navigate('/');
      }
    })
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Card className='loginCard'>
            <Card.Content>
              <Card.Header>
                Welcome to the Would You Rather App !
              </Card.Header>
              <Card.Meta>
                Please sign in to continue
              </Card.Meta>
            </Card.Content>
            <Card.Content>
              <Form>
                {renderOptions()}
                <Button color="teal" fluid onClick={handleLoginAction}>Submit</Button>
              </Form>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

Login.propTypes = {
  fetchUsers: PropTypes.func,
  addAuthUser: PropTypes.func,
  users: PropTypes.array,
}

export default Login;