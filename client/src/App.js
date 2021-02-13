//General imports
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
import React, {useEffect, createContext, useReducer, useContext} from 'react';

//CSS imports
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

//Bootstrap imports
import { Button } from 'react-bootstrap';

//Component imports
import LandingPage from './Components/LandingPage/landing'

const Routing = () => {

  const history = useHistory()


  return (
    <Switch>
      <Route exact path="/home"><LandingPage/></Route>
    </Switch>
  )
}


function App() {



  return (

      <BrowserRouter>
        <Routing />
      </BrowserRouter>

  );
}

export default App;
