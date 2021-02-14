//General imports
import {BrowserRouter, Route, Switch, useHistory, Redirect} from 'react-router-dom'
import React, {useEffect, createContext, useReducer, useContext} from 'react';

//CSS imports
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


//Bootstrap imports


//Component imports
import LandingPage from './Components/LandingPage/landing'
import Formboi from './Components/Formboi/Formboi'
import Results from './Components/Results/Results'
import Navvy from './Components/Nav/navbar'
import Map from './Components/Map/Map'
import Confirmation from './Components/Confirmation/confirmation'

const Routing = () => {

  const history = useHistory()


  return (
    <Switch>
      <Route exact path="/home"><LandingPage/></Route>
      <Route exact path="/form"><Formboi/></Route>
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
