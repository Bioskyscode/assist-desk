import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '../features/tickets/ticketSlice'
import { useEffect } from 'react'

function Home() {
    const {user} = useSelector(state=>state.auth)
    const dispatch = useDispatch() 
    useEffect(()=>{
        dispatch(reset())
    }, [dispatch])
    return (
        <>
            <section className="heading">
                <h1>{user ? `Welcome to the Help-Desk, ${user.name}!` : "What do you need help with?"}</h1>
                <p>Please choose from an option below</p>
            </section>

            <Link to="/new-ticket" className='btn btn-reverse btn-block'>
                <FaQuestionCircle /> create New Ticket
            </Link>

            <Link to="/tickets" className='btn btn-block'>
                <FaQuestionCircle /> View My Tickets
            </Link>
        </>
    )
}

export default Home