import React, {useState, useEffect} from 'react'
import "./results.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Map from '../Map/Map';
import { Card } from 'react-bootstrap';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import EventNoteIcon from '@material-ui/icons/EventNote';

const Results = () => {

    return (
        <div id="body">
            <div className="row" id="contents">
                <div className="col-sm-6">
                    <div className="row">
                    <Card className="cards shadow-lg">
                        <Card.Body>
                            <h4><MonetizationOnIcon/> Income</h4>
                            
                        </Card.Body>
                    </Card>
                    </div>
                    <div className="row">
                    <Card className="cards shadow-lg">
                        <Card.Body>
                            <h4><EventNoteIcon/> Age</h4>
                        </Card.Body>
                    </Card>
                    </div>
                    <div className="row">
                    <Card className="cards shadow-lg">
                        <Card.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales pretium bibendum. Aliquam lacus turpis, suscipit in iaculis ac, ultricies sed nisi. Mauris nec tortor consectetur massa ultrices pellentesque. Donec fringilla eleifend erat sit amet tincidunt. Nunc volutpat eros eros, sed ornare risus malesuada quis. Fusce sit amet quam dictum, mollis elit sed, congue leo. Aenean vel lacus eu tellus porta posuere id ut diam. Curabitur tristique massa ut sodales fermentum. Sed nec pretium leo, ac maximus enim.
                        </Card.Body>
                    </Card>
                    </div>
                </div>
                
                <div className="col-sm-6 map">
                <Card>
                    <Card.Body className="cards shadow-lg">
                        <Map/>
                    </Card.Body>
                </Card>
                    
                </div>
            </div>
            
        </div>


    )

}

export default Results