import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import React from 'react';
import '../styles/SignUp.css';
import { CgProfile } from "react-icons/cg";
import { MdOutlinePassword } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api from "../api";

function SignUp({route}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    let isLower = false;
    let isUpper = false;
    let isNums = false;
    let isSpec = false;

    function handleUsername(event) {
        setUsername(event.target.value);
    }

    function handlePassword(event) {
        setPassword(event.target.value);
    }

    function handleRePassword(event) {
        setRePassword(event.target.value);
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, {username, password});
            navigate("/profile");
        }
        catch (error) {
            if(error == "AxiosError: Request failed with status code 400") alert("Username already exists! Choose another one!");
            else alert(error);
        }
        finally {
            setLoading(false);
        }
    }

    function handlePasswordMatch(event) {
        event.preventDefault();
        if(username === '') {
            alert("Ensure that you entered a username!");
        }

        else if(password === '' || repassword === '') {
            alert("Please ensure you entered the password twice!");
        }

        else if(password !== repassword) {
            alert("Your passwords do not match!");
        }

        else if(!CheckPasswordRequirements(password) || password.length < 10) {
            alert(`You are missing password requirements. Ensure you have the following:\n
                ${password.length < 10 ? "- At least 10 characters.\n" : ""}
                ${isSpec ? "" : "- At least one special character. (., -, /, !, etc)\n"}
                ${isUpper ? "" : "- At least one uppercase letter.\n"}
                ${isLower ? "" : "- At least one lowercase letter.\n"}
                ${isNums ? "" : "- At least one number.\n"}
                `);
        }
        else {
            handleSubmit(event);
            isLower = false;
            isUpper = false;
            isNums = false;
            isSpec = false;
        }
    }

    function CheckPasswordRequirements(password) {
        const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercase = "abcdefghijklmnopqrstuvwxyz";
        const numbers = "0123456789";
        const special = "-_/#~|\\=+*.()&^%$£!<>";
        
        for(let i = 0; i < password.length; i++) {
            if (uppercase.includes(password.charAt(i))) isUpper = true;
            if (lowercase.includes(password.charAt(i))) isLower = true;
            if (numbers.includes(password.charAt(i))) isNums = true;
            if (special.includes(password.charAt(i))) isSpec = true;
        }

        if(isUpper && isLower && isSpec && isNums) {
            return true;
        }
        else {
            return false;
        }
    }

    return(
        <div className="outer">
            <div className="wrapper">
                <form action="">
                    <h1>Sign Up</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Enter Username" required onChange={(e) => handleUsername(e)}/>
                        <CgProfile className="icon"/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Enter Password" required onChange={(e) => handlePassword(e)}/>
                        <MdOutlinePassword className="icon"/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Re-enter Password" required onChange={(e) => handleRePassword(e)}/>
                        <MdOutlinePassword className="icon"/>
                    </div>

                    <button onClick={(e) => handlePasswordMatch(e)}>Sign Up</button>

                    <div className="register-link">
                        <p>Already have an account? <Link className='link' to="/profile">Log In</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
} 

export default SignUp