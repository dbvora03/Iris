import React, {useState, useEffect} from 'react'
import NavBar from '../Partials/navbar'
import './landing.css'
import {Card, Button} from 'react-bootstrap'
import people from './people.gif'
import {Link, useHistory} from 'react-router-dom'


const LandingPage = () => {
    return (
        <div>
            <div id="main">
            <div className="container" id="homecont">
                <Card className="text-center" id="homecard"> 
                    <Card.Body>
                    <img src={people} style={{height:'400px'}} className="float-left"/>
                        <Card.Title><h1>DaBabyThon</h1></Card.Title>
                        <Card.Text>I don't know what to write here.</Card.Text>
                        <Button href="/form" variant="primary">Continue</Button>
                    </Card.Body>
                </Card>

            
            </div>
        </div>
            
        <div className="infopart">
            <div className="container ">
                <div classname="row darow">
                    <div className="col-md-12">
                    <div>  <h4 className="text-white">Lol, howd you find me</h4> </div>
                    <Card className="text-center">
                        <Card.Body id="homecard">
                            <Card.Title><h4>A reliable calculator for determining blah blah blah blah</h4></Card.Title>
                        </Card.Body>
                    </Card>

                        
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row thatrow">
                    
                    <div className="col-md-4">
                        <Card className="text-center">
                            <Card.Body id="homecard">
                            <Card.Title> <img className="demImages"src="https://www.freeiconspng.com/uploads/bag-money-icon--33.png" alt=""/></Card.Title>
                                <Card.Title><h4>Some basic info</h4></Card.Title>
                            </Card.Body>
                        </Card>

                    </div> 
                    <div className="col-md-4">
                        <Card className="text-center">
                            <Card.Body id="homecard">
                            <Card.Title> <img className="demImages"src="https://www.freeiconspng.com/uploads/bag-money-icon--33.png" alt=""/></Card.Title>
                                <Card.Title><h4>Some basic info</h4></Card.Title>
                            </Card.Body>
                        </Card>

                    </div>   
                    <div className="col-md-4">
                        <Card className="text-center">
                            <Card.Body id="homecard">
                            <Card.Title> <img className="demImages"src="https://www.freeiconspng.com/uploads/bag-money-icon--33.png" alt=""/></Card.Title>
                                <Card.Title><h4>Some basic info</h4></Card.Title>
                            </Card.Body>
                        </Card>

                    </div>                      

                </div>
            </div>
        </div>
        </div>

           
        
        
  );
}

export default LandingPage