import React, { Fragment } from 'react';
import { boards, notes } from './constants';
import Header from './components/Header';
import Boards from './components/Boards';
import './App.css';

const App = () => (
    <Fragment>
      	<Header />
      	<Boards boards={ boards } notes={ notes } />
    </Fragment>
);

App.displayName = "App";

export default App;