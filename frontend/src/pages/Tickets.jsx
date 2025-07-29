import { useEffect, useState, useContext } from "react";
import { APIContext } from "../context/APIContext.js";
import { AuthContext } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import TimeAgo from 'react-timeago';

import TicketView from "./TicketView";
import CreateTicketForm from "../components/CreateTicketForm";

export default function Tickets() {
    const { client } = useContext(APIContext)
    const { user } = useContext(AuthContext)
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [tickets, setTickets] = useState([])
    const Navigate = useNavigate()

    function getTickets() {
        client.get('tickets/').then((response) => {
            setTickets(response.data.tickets)
            if (selectedTicket !== null) {
                const ticketID = selectedTicket.id
                const foundTicket = response.data.tickets.find((ticket) => ticket.id === ticketID)
                setSelectedTicket(foundTicket)
            }
        })
    }

    useEffect(() => {
        getTickets()
    }, [])

    function ticketViewClose() {
        setSelectedTicket(null)
        Navigate('/tickets')
    }

    function ticketOnClick(ticket) {
        setSelectedTicket(ticket)
    }

    return (
        <div>{selectedTicket
            ? <>
                <TicketView ticket={selectedTicket} ticketViewClose={ticketViewClose} getTickets={getTickets} />
            </>
            :
            <>
                <p className="text-3xl text-center font-bold my-7">Open Tickets</p>
                {!user.is_staff && (
                    <div className="flex justify-center">
                        < CreateTicketForm getTickets={getTickets} />
                    </div>
                )
                }
                <div className="overflow-x-auto rounded-box border border-base-content/5">
                    <table className="table ">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Title</th>
                                <th>Ticket Author</th>
                                <th>Time Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((ticket, index) => (
                                <tr key={index} className="cursor-pointer hover:bg-base-300" onClick={() => ticketOnClick(ticket)}>
                                    <th>{index + 1}</th>
                                    <td>{ticket.title}</td>
                                    <td>{ticket.ticketAuthor}</td>
                                    <td><TimeAgo date={ticket.timeCreated} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        }
        </div>
    )
}
