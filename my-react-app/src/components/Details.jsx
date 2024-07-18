import { useNavigate, Navigate } from 'react-router-dom';
import "../styles/Details.css";

function Details() {

    const navigate = useNavigate("");

    const handleLogOut = () => {
        navigate("/logout");
    }

    return(
        <body className='image-background-body'>
            <div className='details-outer-div'>
                <h1>You are already signed in!</h1><br />
                <div className='details-inner-div'>
                    <label>If you want to log out, click on this button 👉 </label>
                    <button onClick={handleLogOut}>Log Out</button>
                </div>
            </div>
        </body>
    );
}

export default Details;