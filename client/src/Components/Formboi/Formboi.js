import React, { useState, useEffect } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'
import { useHistory } from 'react-router-dom'
import { Table, Card, Spinner } from 'react-bootstrap';
import './Formboi.css'
import M from 'materialize-css'
import numeral from 'numeral';
import 'mapbox-gl/dist/mapbox-gl.css';

const FormBoi = () => {

    const history = useHistory()

    const [businessType, setBusinessType] = useState("")
    const [age, setAge] = useState("")
    const [income, setIncome] = useState("")
    const [rent, setRent] = useState("")
    const [email, setemail] = useState("")
    const [revenue, setRevenue] = useState("")
    const [address, setAddress] = useState("")
    const [communities, setCommunities] = useState({})
    const [viewport, setViewport] = useState({
        latitude: 45.4211, //enter actual coords here
        longitude: -75.6903, // enter actual coords here
        width: "40vw",
        height:"48vh",
        zoom: 10
    });
    const [spinner, setSpinner] = useState(false)

    var [agepredic, setAgePredic] = useState("hidden")
    var [incomePredic, setIncomePredic] = useState("hidden")


    const AGE_MAP = {
        "Less than 30": 20,
        "30 to 39": 35,
        "40 to 54": 50,
        "55 to 64": 60,
        "65+": 70
    }

    const INCOME_MAP = {
        "0 to 25800": 20000,
        "25801 to 45900": 35000,
        "45901 to 70500": 58000,
        "70501 to 108800": 90000,
        "108800+": 150000
    }

    function handleChange(event) {
        setBusinessType(event.target.value)
    }

    function handleAge(event) {
        setAge(event.target.value)
    }

    function handleIncome(event) {
        setIncome(event.target.value)
    }

    useEffect(() => {



    }, [agepredic, incomePredic])

    const PredictData = () => {
        setSpinner(true)
        fetch("https://calgaryhacks-304803.wl.r.appspot.com/send_data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                businessType: businessType,
            })

        }).then(res => res.json()).then(data => {
            setSpinner(false)
            if (data.error) {
                M.toast({ html: "Enter a valid business type", classes: "#c62828 red darken-3" })
            } else {

                setAge(data.age)
                setIncome(data.income)
                document.getElementById("age").value = data.age
                document.getElementById("income").value = data.income
            }
        })
    }

    const PostData = () => {
        setSpinner(true)
        fetch("https://calgaryhacks-304803.wl.r.appspot.com/get_cluster", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                avg_age: AGE_MAP[age],
                avg_income: INCOME_MAP[income]
            })
        }).then(res => res.json()).then(data => {
            setSpinner(false)
            if (data.error) {
                M.toast({ html: data.error, classes: "#c62828 red darken-3" })
            } else {
                setCommunities(data)
                setViewport({
                    latitude: Object.values(data)[0]['point'][1],
                    longitude: Object.values(data)[0]['point'][0],
                    width: "40vw",
                    height:"48vh",
                    zoom: 12
                })
            }
        })
    }
    return (

        <div class="container register mainpage">
            <div class="row">
                <div class="col-md-3 register-left">
                    <div className="container">
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
                        <h3>Lets get started!</h3>
                        <p><strong>Start by filling in all the relevant information related to your business</strong></p>

                        <input type="submit" class="btnRegister" onClick={() => { PostData() }} value="Submit" />
                    </div>
                </div>
                <div class="col-md-9 register-right">
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="container" style={{ marginBottom: "5px" }}>
                                <h4 class="register-heading">I'll try to predict the income and age </h4>

                                <h4 class="register-heading">Enter in your business type and click on the blue button</h4>
                            </div>
                            <div class="row register-form">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <select onChange={handleChange} class="form-control">
                                            <option class="hidden" selected disabled>Business type</option>
                                            <option value={"Grocery"}>Grocery</option>
                                            <option value={"Restaurant"}>Restaurant</option>
                                            <option value={"Household Help (Cleaning, Lawn Work etc.)"}>Household Help (Cleaning, Lawn Work etc.)</option>
                                            <option value={"Furniture"}>Furniture</option>
                                            <option value={"Household Equipment"}>Household Equipment</option>
                                            <option value={"Appliances"}>Appliances</option>
                                            <option value={"Clothing"}>Clothing</option>
                                            <option value={"Personal Care"}>Personal Care</option>
                                            <option value={"Recreation Equipment"}>Recreation Equipment</option>
                                            <option value={"Home Entertainment Equipment"}>Home Entertainment Equipment</option>
                                            <option value={"Recreation Services"}>Recreation Services</option>
                                            <option value={"Reading Materials (Bookstore)"}>Reading Materials (Bookstore)</option>
                                            <option value={"Tobacco and Alcohol"}>Tobacco and Alcohol</option>
                                            <option value={"Gambling"}>Gambling</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <select onChange={handleAge} id="age" class="form-control">
                                            <option class="hidden" selected disabled>Target market age group</option>
                                            <option value={"Less than 30"}>Less than 30 years</option>
                                            <option value={"30 to 39"}>30 to 39 years</option>
                                            <option value={"40 to 54"}>40 to 54 years</option>
                                            <option value={"55 to 64"}>55 to 64 years</option>
                                            <option value={"65+"}>65 years and over</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <select onChange={handleIncome} class="form-control" id="income">
                                            <option class="hidden" selected disabled>Target market Average Income</option>
                                            <option value={"0 to 25800"}>$0 to $25,800</option>
                                            <option value={"25801 to 45900"}>$25,801 to $45,900</option>
                                            <option value={"45901 to 70500"}>$49,501 to $70,500</option>
                                            <option value={"70501 to 108800"}>$70,501 to $108,800</option>
                                            <option value={"108800+"}>$108,800+</option>
                                        </select>
                                    </div>
                                    <input type="submit" class="btnRegister update" onClick={() => { PredictData() }} value="Predict Income" />
                                </div>
                                {(agepredic != "" && incomePredic != "") ? <p>I think the average age is <strong>{age}</strong> and the average income is <strong>{income}</strong></p> : <p></p>}
                                <br /><br />{spinner ? <Spinner animation="border" /> : null}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <br /><br />
            {Object.keys(communities).length === 0 ? null : <div class="row">
                <div class="col-md-6">
                    <h3 style={{ color: "white" }}>The Communities You Should Operate In Are... </h3>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>Community</th>
                                <th>Average Age</th>
                                <th>Average Income</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.entries(communities).slice(0, 8).map(e => {
                                    return <tr><td>{e[0]}</td><td>{Math.trunc(e[1]['avg_age'])}</td><td>{numeral(e[1]['avg_income']).format("$0,0")}</td></tr>
                                })
                            }
                        </tbody>
                    </Table>
                </div>
                <div class="col-md-6">
                    <Card>
                    <ReactMapGL {...viewport}
                        mapboxApiAccessToken={'pk.eyJ1IjoiZDN2b3JhIiwiYSI6ImNrbDUwNHRzNjFnNTgyb3Q3OTc5bGR1MzkifQ.JBBu1tSrN2ZXoNVZmAScMg'}
                        onViewportChange={viewport => {
                            setViewport(viewport);
                        }}
                    >
                        <Marker latitude={37.78} longitude={-122.41} offsetLeft={-20} offsetTop={-10}>
                            <div>You are here</div>
                        </Marker>
                    </ReactMapGL>
                    </Card>
                </div>
            </div>}
        </div>

    )

}

export default FormBoi