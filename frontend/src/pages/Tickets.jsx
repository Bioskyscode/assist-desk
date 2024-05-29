import { useEffect } from 'react'
import { getTickets, reset } from '../features/tickets/ticketSlice'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import TicketItem from '../components/TicketItem'

function Tickets() {
    const { tickets, isLoading, isSucess } = useSelector(state => state.ticket)

    const dispatch = useDispatch()

    useEffect(() => {
        if (isSucess) {
            dispatch(reset())
        }
        dispatch(getTickets())
    }, [dispatch, isSucess])

    if (isLoading) {
        <Spinner />
    }
    return (
        <>
            <BackButton url="/" />
            <h1>Tickets</h1>
            <div className='tickets'>
                <div className='ticket-headings'>
                    <div>Date</div>
                    <div>Device</div>
                    <div>status</div>
                    <div></div>
                </div>
                {tickets.map(ticket => (
                    <TicketItem key={ticket._id} ticket={ticket} />
                ))}
            </div>
        </>
    )
}

export default Tickets