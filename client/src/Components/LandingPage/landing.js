import React, {useState, useEffect} from 'react'
import NavBar from '../Partials/navbar'
import './landing.css'
import {Card, Button} from 'react-bootstrap'


const LandingPage = () => {

    return (
        <div id="main">
            <NavBar/>
            <div className="container" id="homecont">
                <Card className="text-center">
                    <Card.Body id="homecard">
                        <Card.Title><h1>DaBabyThon</h1></Card.Title>
                        <Card.Text>I don't know what to write here.</Card.Text>
                        <Button variant="primary">Go to Dhruv's Form</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
  );
}

export default LandingPage