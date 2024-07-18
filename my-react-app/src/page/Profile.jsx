import { useState } from "react";
import {Link} from "react-router-dom";
import React from 'react';
import './Profile.css';
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { CgProfile } from "react-icons/cg";
import { MdOutlinePassword } from "react-icons/md";

function Profile({route}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, {username: username, password: password});
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
            navigate("/");
        }
        catch (error) {
            alert(error);
        }
        finally {
            setLoading(false);
        }
    }

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    
    return(
        
        <div className="outer">
            <div className="wrapper">
                <form action="" onSubmit={handleSubmit}>
                    <h1>Log In</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required onChange={(e) => handleUsername(e)}/>
                        <CgProfile className="icon"/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required onChange={(e) => handlePassword(e)}/>
                        <MdOutlinePassword className="icon"/>
                    </div>
                    
                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember Me</label>
                        <a href="">Forgot Password</a>
                    </div>

                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p>Don't have an account? <Link className='link' to="/signup">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
} 

export default Profile