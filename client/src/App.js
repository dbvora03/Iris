//General imports
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'
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


const Routing = () => {

  const history = useHistory()


  return (
    <Switch>
      <Route exact path="/home"><LandingPage/></Route>
      <Route exact path="/form"><Formboi/></Route>
      <Route exact path="/results"><Results/></Route>
      <Route exact path="/map"><Map/></Route>
      <Route exact path="/confirmation"><Map/></Route>
    </Switch>
  )
}


function App() {

  return (

      <BrowserRouter>
      <Navvy></Navvy>
        <Routing />
      </BrowserRouter>

  );
}

export default App;
