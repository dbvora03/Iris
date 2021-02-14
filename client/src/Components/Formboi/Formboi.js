import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import './Formboi.css'
import M from 'materialize-css'


const FormBoi = () => {

    const history = useHistory()

    const [businessType, setBusinessType] = useState("")
    const [age, setAge] = useState("")
    const [income, setIncome] = useState("")
    const [rent, setRent] = useState("")
    const [email, setemail] = useState("")
    const [revenue, setRevenue] = useState("")
    const [address, setAddress] = useState("")

    const [agepredic, setAgePredic] = useState("")
    const [incomePredic, setIncomePredic] = useState("")

    function handleChange(event){
        setBusinessType(event.target.value)
      }

    function handleAge(event) {
        setAge(event.target.value)
    }

    function handleIncome(event) {
        setAge(event.target.value)
    }

    useEffect(()=> {



    }, [agepredic, incomePredic])

    const PredictData = () => {

        fetch("https://calgaryhacks-304803.wl.r.appspot.com/send_data", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                businessType: businessType,
            })

        }).then(res=> res.json()).then(data=> {
            if(data.error) {
                M.toast({html: "Enter a valid business type",classes:"#c62828 red darken-3"})
            } else {

                agepredic = data.body.age
                incomePredic = data.body.income
            }
        })
    }

    const PostData = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "Invalid Email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/datasubmit", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                businessType: businessType,
                age: age,
                income: income,
                rent: rent,
                email: email,
                revenue: revenue,
                address: address
            })
        }).then(res=> res.json()).then(data=> {

            if(data.error) {
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            } else {
                localStorage.setItem("input", JSON.stringify({
                    businessType: businessType,
                    age: age,
                    income: income,
                    rent: rent,
                    email: email,
                    revenue: revenue,
                    address: address
                }))
                localStorage.setItem("results", JSON.stringify(data.body))
                M.toast({html:"New account added",classes:"#43a047 green darken-1"})

                history.push("/results")
            }
        })
    }
    return (
        <>
        <div class="container register mainpage">
                <div class="row">
                    <div class="col-md-3 register-left">
                        <div className="container">
                            <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                            <h3>Lets get started!</h3>
                            <p><strong>Start by filling in all the relevant information related to your business</strong></p>

                            <input type="submit" class="btnRegister" onClick={()=> {PostData()}} value="Submit"/>
                        </div>
                    </div>
                    <div class="col-md-9 register-right">
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="container" style={{marginBottom:"5px"}}>
                                <h4 class="register-heading">I'll try to predict the income and age </h4>

                                <h4 class="register-heading">Enter in your business type and click on the blue button</h4>
                                </div>
                                <div class="row register-form">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <select onChange={handleChange} class="form-control">
                                                <option class="hidden"  selected disabled>Business type</option>
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
                                            <select onChange={handleAge} class="form-control">
                                                    <option class="hidden"  selected disabled>Target market age group</option>
                                                    <option value={"Less than 30 years"}>Less than 30 years</option>
                                                    <option value={"30 to 39 years"}>30 to 39 years</option>
                                                    <option value={"40 to 54 years"}>40 to 54 years</option>
                                                    <option value={"55 to 64 years"}>55 to 64 years</option>
                                                    <option value={"65 years and over"}>65 years and over</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <select onChange={handleIncome} class="form-control">
                                                <option class="hidden"  selected disabled>Target market Average Income</option>
                                                <option value={"25800 or less"}> $25,800 or less</option>
                                                <option value={"25801 to 45900"}>$25,801 to $45,900</option>
                                                <option value={"45901 to 70500"}>$45,901 to $70,500</option>
                                                <option value={"70501 to 108800"}>$70,501 to $108,800</option>
                                                <option value={"108800+"}>$108,800+</option>
                                            </select>                                        
                                        </div>
                                        <div class="form-group">
                                            <input value={rent} onChange={(e)=>setRent(e.target.value)} type="number" class="form-control" placeholder="Max rent cost *" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                    <div class="form-group">
                                            <input type="submit" class="btnRegister update" onClick={()=> {PredictData()}} value="Predict Income"/>
                                        </div>
                                        <div class="form-group">
                                            <input value={email} onChange={(e)=>setemail(e.target.value)} type="email" class="form-control" placeholder="Your Email *" />
                                        </div>
                                        <div class="form-group">
                                            <input  value={revenue} onChange={(e)=>setRevenue(e.target.value)} type="number" class="form-control" placeholder="Annual revenue *" />
                                        </div>
   
                                        <div class="form-group">
                                            <input value={address} onChange={(e)=>setAddress(e.target.value)} type="text" className="form-control " placeholder="Address *" value="" />
                                        </div>
                                    </div>
                                    {(agepredic != "" && incomePredic != "")? <p>I think the average age is <strong>{agepredic}</strong> and the average income is <strong>{incomePredic}</strong></p> : <p></p>}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default FormBoi