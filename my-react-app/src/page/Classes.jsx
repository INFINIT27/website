import api from "../api";
import React from "react";
import { useState, useEffect } from "react";
import "../styles/Classes.css";
import ClassDetails from "../components/ClassDetails";

function Classes() {
    const [class_number, setClassNumber] = useState("");
    const [class_name, setClassName] = useState("");
    const [class_description, setClassDescription] = useState("");
    const [classes, setClasses] = useState([]);
    const [targetedClass, setTargetedClass] = useState("");
    
    useEffect(() => {
        getClasses();
        console.log(classes);
    }, []);

    const getClasses = () => {
        api.get("/api/classes/")
            .then((res) => res.data)
            .then((data) => {
                setClasses(data);
                console.log(classes);
            })
            .catch((data) => alert(data));
    }

    const createClass = (e) => {
        e.preventDefault();
        api.post("/api/classes/", {class_number, class_name, class_description})
            .then((res) => {
                if (res.status < 300) alert("Class created!");
                else alert("Failed to create class!");
                getClasses();
            })
            .catch((err) => alert(err));
    }

    const removeClass = (id) => {
        api.delete(`/api/classes/delete/${id}/`)
            .then((res) => {
                if (res.status < 300) {
                    alert("Class was deleted");
                }
                else alert("Failed to delete Class!");
                getClasses();
            })
            .catch((err) => alert(err));
    }

    const handleRemoveClass = (e) => {
        setTargetedClass(e.target.value);
    } 

    const handleRemoveSubmit = () => {
        if(classes.length === 0) {
            alert("There is no class to remove!");
        }
        else {
            let found = false;

            for(let i = 0; i < classes.length; i++) {
                if(classes[i].class_number === targetedClass) {
                    removeClass(classes[i].id);
                    found = true;
                }
            }

            if(!found) {
                alert("The class you entered was not found. Search another keyword.");
            }
        }
    }

    return(
        <div className="background-class">
            <ClassDetails data={classes}/>
            <div className="remove-div">
                <div className="inner-remove-div">
                    <label className="remove-label">Type Class Number To Remove</label>
                    <input type="text" placeholder="Enter Class Number" className="remove-text-area" onChange={(e) => handleRemoveClass(e)}/>
                </div><br />
                <button onClick={handleRemoveSubmit} className="remove-button">Remove</button>
            </div>
            <div className="outer-add-class">
                <form onSubmit={createClass}>
                    <div className="inner-div">
                        <label className="class-label">Class Number</label>
                        <input 
                            placeholder="Enter Class Number"
                            type="text"
                            id="class-number"
                            className="class-input"
                            required
                            onChange={(e) => setClassNumber(e.target.value)}
                            value={class_number}
                        />
                    </div>
                    <br />
                    <div className="inner-div">
                        <label className="class-label">Class Name</label>
                        <input 
                            placeholder="Enter Class Name"
                            type="text"
                            id="class-name"
                            className="class-input"
                            required
                            onChange={(e) => setClassName(e.target.value)}
                            value={class_name}
                        />
                        <br />
                    </div><br />
                    <div className="inner-div">
                        <label className="class-description">Class Description</label><br />
                        <textarea 
                            placeholder="Enter Class Description"
                            id="class-description"
                            className="class-input-description"
                            required
                            onChange={(e) => setClassDescription(e.target.value)}
                            value={class_description}
                        />
                        <br />
                    </div>
                    <div className="inner-div">
                        <input type="submit" value="Submit" className="submit-button"/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Classes