import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Dimmer, Loader } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import store from './redux/store/index';

const Loading = () => {
  return (
    <Dimmer active inverted style={{position: 'initial'}}>
      <Loader inverted content='Loading' />
    </Dimmer>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={Loading()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Suspense>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
