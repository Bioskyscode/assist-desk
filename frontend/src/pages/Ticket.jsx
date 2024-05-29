
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { closeTicket, getTicket, reset, deleteTicket } from '../features/tickets/ticketSlice'
import { getNotes, createNote, reset as notesReset } from '../features/notes/noteSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import NoteItem from '../components/NoteItem'
import Modal from 'react-modal'
import { FaPlus, FaTrashAlt } from 'react-icons/fa'

Modal.setAppElement("#root")

function Ticket() {
    const { ticket, isSuccess, isLoading, isError, message } = useSelector(state => state.ticket)
    const { notes, isLoading: noteLoading } = useSelector(state => state.notes)
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [deletePopupIsOpen, setDeletePopupIsOpen] = useState(false)
    const [closeTicketPopupIsOpen, setCloseTicketPopupIsOpen] = useState(false)
    const [noteText, setNoteText] = useState("")

    const params = useParams()
    const { ticketId } = params
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            toast.error(message)
            toast.clearWaitingQueue()
        }

        if (isSuccess) {
            // dispatch(reset())
            dispatch(notesReset()) //
        }

        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))
    }, [dispatch, isError, message, ticketId, isSuccess])

    if (isLoading || noteLoading) {
        <Spinner />
    }

    if (isError) {
        <h3>Something went wrong</h3>
    }

    const onTicketclose = () => {
            dispatch(closeTicket(params.ticketId))
            if (isSuccess) {
                toast.success("Ticket closed successfully")
                toast.clearWaitingQueue()
            }
            navigate("/tickets")
    }

    const onNoteSubmit = (e) => {
        e.preventDefault()
        dispatch(createNote({ noteText, ticketId }))
        setNoteText("")
        closeModal()
        dispatch(getNotes(ticketId)) //
    }
    //open/close delete-ticket popup
    const deletePopup = () => setDeletePopupIsOpen(true)
    const closeDeletePopup = () => setDeletePopupIsOpen(false)

    //open/close add-note popup
    const openModal = () => setModalIsOpen(true)
    const closeModal = () => setModalIsOpen(false)

    //open/close close-icket popup
    const closeTicketPopup = () => setCloseTicketPopupIsOpen(true)
    const cancelCloseTicketPopup = () => setCloseTicketPopupIsOpen(false)

    const onDelete = () => {
        dispatch(deleteTicket(params.ticketId))
        toast.success("Ticket deleted successfully")
        navigate("/tickets")
    }

    return (
        <div className='ticket-page'>
            <header className='ticket-header'>
                <div className='backDelete'>
                    <BackButton url="/tickets" />
                    <FaTrashAlt style={{ fontSize: "20px", color: "#ef4444", cursor: "pointer" }} onClick={deletePopup} />
                    <Modal className="modal modal-x" isOpen={deletePopupIsOpen} onRequestClose={closeDeletePopup} contentLabel="Delete ticket">
                        <form>
                            <div className='alert'>Are you sure you want to delete this ticket?</div>

                            <div className='form-group alert-btns'>
                                <button className='btn' onClick={onDelete}>Delete</button>
                                <button className='btn' onClick={closeDeletePopup}>Cancel</button>
                            </div>
                        </form>
                    </Modal>
                </div>
                <h2>
                    Ticket ID: {ticket._id}
                    <span className={`status status-${ticket.status}`}>{ticket.status}</span>
                </h2>
                <h3>{new Date(ticket.createdAt).toLocaleString("de-DE")}</h3>
                <h3>Device: {ticket.product}</h3>
                <hr />
                <div className='ticket-desc'>
                    <h3>Description of Issue</h3>
                    <p>{ticket.description}</p>
                </div>
                <h2>{ticket.status !== "closed" && "Notes"}</h2>
            </header>
            {ticket.status !== "closed" && <button onClick={openModal} className='btn'><FaPlus /> Add Note</button>}

            <Modal className="modal" isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Add Note">
                <h2>Add Note</h2>
                <button className='btn-close' onClick={closeModal}>X</button>
                <form onSubmit={onNoteSubmit}>
                    <div className='form-group'>
                        <textarea rows="10" name='noteText' id='noteText'
                            className='form-control textarea' placeholder='Note text'
                            value={noteText} onChange={e => setNoteText(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className='form-group'><button className='btn' type='submit'>Submit</button></div>
                </form>
            </Modal>

            {notes.map(note => (
                <NoteItem key={note._id} note={note} />
            ))}
            {ticket.status !== "closed" && <button onClick={closeTicketPopup} className='btn btn-block btn-danger'>Close Ticket</button>}
            <Modal className="modal modal-x" isOpen={closeTicketPopupIsOpen} onRequestClose={cancelCloseTicketPopup} contentLabel="close ticket">
                <form>
                    <div className='alert'>Are you sure you want to close this ticket?</div>

                    <div className='form-group alert-btns'>
                        <button className='btn' onClick={onTicketclose}>Close</button>
                        <button className='btn' onClick={cancelCloseTicketPopup}>Cancel</button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default Ticket