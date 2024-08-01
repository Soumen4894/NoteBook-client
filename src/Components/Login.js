import React, { useState } from 'react'
import { useNavigate, Link  } from 'react-router-dom';

const Login = (props) => {
    const [cerdentials, setCredentials] = useState({email:"", password:""});
    let negative = useNavigate();
    const handelSubmit = async (e) => {
        e.preventDefault();
            const response = await fetch("https://notebook-server-hufu.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                   "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0ZTYyNjk1NGQxN2M2ZTQ5MjVkOTQzIn0sImlhdCI6MTcwMDE5ODQyN30.Pe-XnWIInFIYbJpV_sqwUDKbO50svUz6iX1UP9InVUM"
            },
            body: JSON.stringify({email: cerdentials.email, password: cerdentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token', json.authToken);
            props.showAlert("Loged in Successfully", "success")
            negative('/');
        }
        else{
            props.showAlert("Invalid Credintials", "danger")
        }

    }
    const onChange = (e)=>{
        setCredentials({...cerdentials, [e.target.name]: e.target.value})
    }
    return (
        <div className='wrapper'>
            <div className="logo">
            {/* <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt=""/> */}
            <img src='data:image/jpeg;base64,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' alt=""/>
        </div>
        <div className="text-center mt-4 name">
            Note-book
        </div>
            <form className='p-3 mt-3' onSubmit={handelSubmit}>
            <div className="form-field d-flex align-items-center">
                {/* <label htmlFor="email">Email address</label> */}
                <span className="far fa-envelope"></span>
                <input type="email"  id="email" name="email" value={cerdentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Email" />
            </div>
            <div className="form-field d-flex align-items-center">
                {/* <label htmlFor="password">Password</label> */}
                <span className="fas fa-key"></span>
                <input type="password" name="password" value={cerdentials.password} onChange={onChange} id="password" placeholder="Password" />
            </div>
            <h6>Don't have an account?
                <Link className='text-center fs-6' to="/signup"> signup</Link></h6>
            <button type="submit" className="btn mt-3" >login</button>
        </form></div>
    )
    /* return (
        <div><form onSubmit={handelSubmit}>
            <div className="form-group my-2">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" name="email" value={cerdentials.email} onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group my-2">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password" value={cerdentials.password} onChange={onChange} id="password" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary my-2" >Submit</button>
        </form></div>

        //mongodb://localhost:27017
    )*/
}

export default Login
