import TimeAgo from 'react-timeago';
import { useState, useContext } from 'react';
import { APIContext } from "../context/APIContext.js";
import { AuthContext } from '../context/AuthContext.js';

export default function TicketView({ ticket, ticketViewClose, getTickets }) {

    const [messageInput, setMessageInput] = useState("")
    const { client } = useContext(APIContext)
    const { user } = useContext(AuthContext)

    function sendMessage(e) {
        e.preventDefault()
        if (messageInput) {
            client.post("sendMessage/", {
                "content": messageInput,
                "ticketID": ticket.id
            },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                })
                .then((response) => {
                    setMessageInput("")
                    getTickets()
                })
        }
    }

    function deleteTicket(ticketID) {
        if (user.is_staff) {
            client.delete(`tickets/${ticket.id}/`).then((response) => {
                ticketViewClose()
                getTickets()
            })
        }
    }

    console.log(ticket)
    return (
        <div>
            <button className="btn btn-ghost my-3" onClick={ticketViewClose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5" />
                </svg>
                Go back
            </button>
            <div className="card card-border bg-base-100  shadow-2xl">
                <div className='flex justify-between items-center'>
                    <div className="card-body">
                        <h2 className="card-title text-2xl">{ticket.title}</h2>
                        <p className="text-md">created by <span className="font-bold">{ticket.ticketAuthor}</span> <TimeAgo date={ticket.timeCreated} /></p>
                    </div>
                    {user.is_staff && <button className="btn btn-error mr-5" onClick={deleteTicket}>Delete</button>}
                </div>
            </div>

            <div className="card card-border bg-base-100 shadow-2xl mt-10">
                <div className="card-body">
                    <p className="text-2xl font-semibold">Messages </p>
                    <div className="card  bg-base-100 shadow-2xl p-5">
                        <form onSubmit={sendMessage}>
                            <textarea onChange={(e) => setMessageInput(e.target.value)} value={messageInput} className="textarea textarea-bordered w-full" placeholder="Add message" />
                            <button type="submit" className="btn btn-block mt-3">Send</button>
                        </form>
                    </div>
                    <div className="px-3 mt-5 ">
                        {ticket.messages.map((message, index) => (
                            <div className={`chat ${message.messageAuthor === ticket.ticketAuthor ? "chat-start" : "chat-end"}`} key={index}>
                                <div className="chat-header">
                                    <span className="text-sm">{message.messageAuthor}</span>
                                    <TimeAgo className="text-xs opacity-50" date={message.timeSent} />
                                </div>
                                <div className="chat-bubble">{message.content}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
