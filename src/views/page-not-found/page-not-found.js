import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 3000)
  }, [navigate])

  return(
    <div style={{margin: '55px auto', color: 'red'}}>
      <h2>Page Not Found</h2>
    </div>
  );
}

export default PageNotFound;
