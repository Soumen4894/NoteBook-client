// import React from "react";

import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://notebook-server-hufu.onrender.com"
  //const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)
  //Get Note
  const getNotes = async () => {
    // console.log("Adding new note")
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //"auth-token": localStorage.getItem('token'),
         "auth-Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4NmVkZjhmOTYzNGE3YWFmODZjNGJmIn0sImlhdCI6MTcwMzM0MjA1Nn0.EIapbEgXr_Z7fmnLPDPThPcjYqfLXR4E_PT0brMroBs"
      }
    });
    // const json =  response.json();

    const json = await response.json()
    // console.log(json);
    setNotes(json);

  }

  //Add Note
  const addNote = async (title, description, tag) => {
    // console.log("Adding new note")
    //API Call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //"auth-token": localStorage.getItem('token')
         "auth-Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4NmVkZjhmOTYzNGE3YWFmODZjNGJmIn0sImlhdCI6MTcwMzM0MjA1Nn0.EIapbEgXr_Z7fmnLPDPThPcjYqfLXR4E_PT0brMroBs"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json()
    setNotes(notes.concat(note))

  }
  //Delete Note
  const deleteNote =async (id) => {
    //API call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        //"auth-token": localStorage.getItem('token')
         "auth-Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4NmVkZjhmOTYzNGE3YWFmODZjNGJmIn0sImlhdCI6MTcwMzM0MjA1Nn0.EIapbEgXr_Z7fmnLPDPThPcjYqfLXR4E_PT0brMroBs"
      }
    });
    const json = await response.json();
    console.log(json)

    // console.log("Deleting the note " + id)
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote);

  }
  //Edit Note
  const editNote = async (id, title, description, tag) => {
    //API Call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        //"auth-token": localStorage.getItem('token')
        "auth-Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4NmVkZjhmOTYzNGE3YWFmODZjNGJmIn0sImlhdCI6MTcwMzM0MjA1Nn0.EIapbEgXr_Z7fmnLPDPThPcjYqfLXR4E_PT0brMroBs"
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json)


    //Logic
    let newNOtes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNOtes.length; index++) {
      const elements = newNOtes[index];
      if (elements._id === id) {
        newNOtes[index].title = title;
        newNOtes[index].description = description;
        newNOtes[index].tag = tag;
        break;
      }
    }
    console.log(newNOtes);
    setNotes(newNOtes);

  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
