import React, {useState, useEffect} from 'react'
import "./confirmation.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const Confirmation = () => {

    const [age, setAge] = useState("")
    const [income, setIncome] = useState("")


    useEffect(()=> {
        const conf = JSON.parse(localStorage.getItem("confirmation"))

        if(!conf) {
            setAge("")
            setIncome("")
        } else {
            setAge(conf.age)
            setIncome(conf.income)
        }

 

    }, [])


    return (

        <>
        <div className="mycard">
            <div className="card auth-card">
                <h4>I think your average age is {age} and the average income is {income}</h4>
                <h6>If I'm wrong, what are the corrent values?</h6>

                <div className="container inputgroup">
                    <input  type="email" class="form-control" placeholder="Your Email *" />
                </div>

                <div className="container inputgroup">
                    <input  type="email" class="form-control" placeholder="Your Email *" />
                </div>
               
            </div>
        </div>

        
        </>
    )

}

export default Confirmation