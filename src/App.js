import React from 'react';
import './App.css';
import RoutesApp from './routes';
import Login from './views/login/login';
import MenuApp from './components/menu/menu';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function App() {

  const authUser = useSelector(state => state.user.user);
  
  if(Object.keys(authUser).length > 0) {
    return (
      <div className="App">
        <MenuApp />
        <RoutesApp />
      </div>
    );
  }else {
    return <Login />;
  }
}

App.prototypes = {
  authUser: PropTypes.object.isRequired
}

export default App;