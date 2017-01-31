import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import Content from './Content';
import Sort from './Sort';
import './styles/index.css';

ReactDOM.render(
  <div>
  <Header/>
  <Sort/>
  <Content/>
</div>, document.getElementById('root'));
