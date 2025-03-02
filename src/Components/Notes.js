import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
  const context = useContext(noteContext);
  let negative = useNavigate();
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes()
    }
    else {
      negative("/login")
    }
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })


  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });


  }

  const handleClick = (e) => {
    // console.log("Updating note", note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Updated Successfully", "success")
    // addNote(note.title, note.description, note.tag);
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                {/* <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div> */}
                {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Add</button> */}
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} type="button" className="btn btn-warning" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="row my-3">
          <h2>Your Notes</h2>
          <div className='container mx-2'>
            {notes.length === 0 && 'No notes to display'}
          </div>
          {/* {notes.map((note) => {
            return <NoteItem key={note._id} updateNote={updateNote} showAlert= {props.showAlert} note={note} />
          })} */}
          {/* {Array.isArray(notes) && notes.length > 0 ? (
            notes.map((note) => {
              return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
            })
          ) : (
            <div className="no-notes-message">
              <h2>No Notes Found</h2>
              <p>Please add some notes to get started.</p>
            </div>
          )} */}
          {Array.isArray(notes) ? (
            notes.map((note) => (
              <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
            ))
          ) : (
            // Optionally, render a fallback or log an error message
            console.error("Expected notes to be an array, but got:", notes)
          )}


        </div>
      </div>
    </>
  )
}

export default Notes
