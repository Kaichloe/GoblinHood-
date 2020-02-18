import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import configureStore from './store/store'

document.addEventListener('DOMContentLoaded', () => {
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.id]: window.currentUser }
      },
      session: { id: window.currentUser.id }
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore();
  }
  // const newsAPIkey = window.newsAPIkey;
  // window.newsAPIkey = " "
  ReactDOM.render(<h1>Nothing to see here</h1>, document.getElementById('important-info'));
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
})


