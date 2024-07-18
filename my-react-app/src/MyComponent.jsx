import React, { useState, useEffect } from "react";

function MyComponent() {

    const handleChoice = () => {
        return(
            <h1>Here</h1>
        );
    };

    return(
        <nav className="navigation-bar">
            <ul>
                <li><a href="" onClick={handleChoice}>Home</a></li>
                <li>About</li>
                <li>Contact</li>
                <li>Others</li>
            </ul>
        </nav>
    );

}

export default MyComponent