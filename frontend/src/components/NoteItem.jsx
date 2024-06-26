import { useSelector } from "react-redux"


function NoteItem({note}) {
    const {user} = useSelector(state => state.auth)
  return (
    <div className="note" style={{
        background: note.isStaff ? "rgba(0, 0, 0, 0.9)" : "#fff",
        color: note.isStaff ? "#fff" : "#000"
        }}>
        <h4>Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}</h4>
        <p>{note.text}</p>
        <div className="note-date">{new Date(note.createdAt).toLocaleString("de-DE")}</div>
    </div>
  )
}

export default NoteItem