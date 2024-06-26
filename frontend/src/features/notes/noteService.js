import axios from 'axios'

const API_URL = "https://assist-desk.vercel.app/api/tickets/"

const getNotes = async (ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL + ticketId + "/notes", config)
    return response.data
}

const createNote = async (noteText, ticketId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL + ticketId + "/notes",
        {
            text: noteText
        },
        config
    )

    // if (!response.ok) {
    //     throw new Error(`HTTP error status: ${response.status}`)
    // }
    return response.data
}

const noteService = {
    getNotes, createNote
}

export default noteService