import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Menu, Image } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import './menu.scss';

function MenuApp() {

  const items = [
    {name: 'home', path: ''},
    {name: 'new question', path: 'add'},
    {name: 'leader Board', path: 'leaderboard'},
  ]
  const user = useSelector(state => state.user.user);
  const [activeItem, setActiveItem] = useState('home');

  const handleItemClick = (e, { name }) => { 
    setActiveItem(name);
  }

  const logOut = () => {
    window.location.href = '/login';
  }

  const renderMenuItems = () => {
    return(
      items.map((item, index) => {
        return(
          <Menu.Item as={Link}
            key={index}
            to={item.path} 
            name={item.name} 
            active={activeItem === `${item.name}`} 
            onClick={handleItemClick}>
              {item.name}
          </Menu.Item>        
        )
      })
    )
  }

  return (
    <div>
      <Menu pointing>
        {renderMenuItems()}  
        {user &&
        <Menu.Menu position='right'>
          <Menu.Item className="avatar-container">
            <span>Hello, {user.name}</span>
            <Image src={user.avatarURL} avatar />
          </Menu.Item>
          <Menu.Item>
            <Button inverted color='red' onClick={logOut}>LogOut</Button>
          </Menu.Item>
        </Menu.Menu>}
      </Menu>
    </div>
  )

}

export default MenuApp;