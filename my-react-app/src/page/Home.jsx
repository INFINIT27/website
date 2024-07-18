import { useState, useEffect } from 'react';
import Note from "../components/Note"
import api from '../api';
import "../styles/Home.css";

function Home() {

    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api.get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {setNotes(data); console.log(data)})
            .catch((data) => alert(data));
    }

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`)
            .then((res) => {
                if (res.status < 300) alert("Note was deleted");
                else alert("Failed to delete note!");
                getNotes();
            })
            .catch((err) => alert(err));
    }

    const createNote = (e) => {
        e.preventDefault();
        api.post("/api/notes/", {content, title})
            .then((res) => {
                if (res.status < 300) alert("Note created!");
                else alert("Failed to make note.");
                getNotes();
            })
            .catch((err) => alert(err));
    }

    return(
        <div className="outer-div">
            <div>
                <h2 style={{fontSize: "2.5em", textAlign: "center", color: "white", borderBottom: "5px solid  rgb(104, 51, 197)"}}>Notes</h2>
                {notes.map((note) => (
                    <Note note={note} onDelete={deleteNote} key={note.id} />
                ))}
            </div>
            <h2 style={ {textAlign: "center", color: "white", marginTop: "10px", marginBottom: "10px"} }>Create a Note</h2>
            <form onSubmit={createNote} className="note-form">
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    style={ {maxWidth: "100%", minWidth: "100%", minHeight: "50px"} }
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default Home