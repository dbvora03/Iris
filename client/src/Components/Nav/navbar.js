import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav, Navbar} from 'react-bootstrap'

const Navvy = () => {

    return (
        <>
        <Navbar bg="light">
            <Navbar.Brand>
                LocalIncel
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="#home"><Link to="/home">About</Link></Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Nav.Link href="#home"><Link to="/form">Get Started</Link></Nav.Link>
        </Navbar>
        </>


    )

}

export default Navvy