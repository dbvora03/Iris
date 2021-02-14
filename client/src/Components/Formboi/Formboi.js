import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import './Formboi.css'
import M from 'materialize-css'


const FormBoi = () => {

    const history = useHistory()

    const [businessType, setBusinessType] = useState("")

    function handleChange(event){
        setBusinessType(event.target.value)
      }

    const PostData = () => {

        fetch("/data", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                "Hello": "World"
            })
        }).then(res=> res.json()).then(data=> {

            if(data.error) {
                M.toast({html: data.error,classes:"#c62828 red darken-3"})
            } else {

                ///////Reducer function here 

                /////// End reducer function

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
                        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
                        <h3>Lets get started!</h3>
                        <p>Start by filling in all the relevent information related to your business</p>
        
                    </div>
                    <div class="col-md-9 register-right">
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <h3 class="register-heading">Fill in the information below</h3>
                                <div class="row register-form">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <select class="form-control">
                                                <option class="hidden"  selected disabled>Target market age group</option>
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
                                            <input type="text" class="form-control" placeholder="Last Name *" value="" />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control" placeholder="Password *" value="" />
                                        </div>
                                        <div class="form-group">
                                            <input type="password" class="form-control"  placeholder="Confirm Password *" value="" />
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <input type="email" class="form-control" placeholder="Your Email *" value="" />
                                        </div>
                                        <div class="form-group">
                                            <input type="text" minlength="10" maxlength="10" name="txtEmpPhone" class="form-control" placeholder="Your Phone *" value="" />
                                        </div>
                                        <div class="form-group">
                                            <select class="form-control">
                                                <option class="hidden"  selected disabled>What Category is your business?</option>
                                                <option>What is your Birthdate?</option>
                                                <option>What is Your old Phone Number</option>
                                                <option>What is your Pet Name?</option>
                                            </select>
                                        </div>
                                        <div class="form-group">
                                            <input type="text" class="form-control" placeholder="Enter Your Answer *" value="" />
                                        </div>
                                        <input type="submit" class="btnRegister" onClick={()=> {PostData()}} value="Submit"/>
                                    </div>
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