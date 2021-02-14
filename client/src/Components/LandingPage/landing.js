import React, { useState, useEffect } from 'react'
import './landing.css'
import { Card, Button, Navbar } from 'react-bootstrap'
import people from './people.gif'
import logo from './default.png'
import wave from './wave.svg'
import { Link, useHistory } from 'react-router-dom'


const LandingPage = () => {
    return (
        <div>
            <div>
                <div className="container justify-content-center" id="homecont">
                    <Card className="text-center rounded-top" id="homecard">
                        <Card.Body>
                            <img src={people} style={{ height: '400px' }} className="float-left" />
                            <Card.Title><img src={logo} style={{ height: '130px', marginTop:"50px" }}/></Card.Title>
                            <Card.Text><h6>Hi I'm Iris! 👋</h6></Card.Text>
                            <Card.Text><h6>An AI powered virtual assistant that provides local Calgary businesses the intel needed to conduct business better. 📈 🚀</h6></Card.Text>
                            <Button href="/form" variant="primary">Get Started</Button>
                        </Card.Body>
                    </Card>
                    
                </div>
                <img src={wave} className="wave"/>
                <div className="infopart">
                    <div className="container ">
                        <div classname="row darow">
                            <div className="col-md-12 ">
                                <div>  <h4 className="text-white">Lol, howd you find me</h4> </div>
                                <Card className="text-center">
                                    <Card.Body id="homecard">
                                        <Card.Title><p className="lead">Iris provides an effective and cost-friendly solution for businesses when it comes to outreach.
                                             <br/>  This tool tackles the economic challenges that local businesses face when competing against large corporations for a customer base. 
                                             <br/> We accomplish this by collecting and presenting rich consumer data for free, a service that corporations tend to pay millions of dollars for. With our information, businesses will be able to figure out what location and demographics they should market towards. 
                                             </p></Card.Title>
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
                                        <Card.Title> <img className="demImages" src="https://image.flaticon.com/icons/png/512/126/126333.png" alt="" /></Card.Title>
                                        <Card.Title><h4>Market to your customer better</h4></Card.Title>
                                    </Card.Body>
                                </Card>

                            </div>
                            <div className="col-md-4">
                                <Card className="text-center">
                                    <Card.Body id="homecard">
                                        <Card.Title> <img className="demImages" src="https://www.freeiconspng.com/uploads/bag-money-icon--33.png" alt="" /></Card.Title>
                                        <Card.Title><h4>Save costs marketing to the right group</h4></Card.Title>
                                    </Card.Body>
                                </Card>

                            </div>
                            <div className="col-md-4">
                                <Card className="text-center">
                                    <Card.Body id="homecard">
                                        <Card.Title> <img className="demImages" src="https://www.shareicon.net/data/512x512/2015/12/24/692592_group_512x512.png" alt="" /></Card.Title>
                                        <Card.Title><h4>Expand your customer base faster</h4></Card.Title>
                                    </Card.Body>
                                </Card>

                            </div>

                        </div>
                    </div>
                    <br/>
                    <br/>
                </div>
            </div>
        </div>
    );
}

export default LandingPage