import { useState, useContext } from "react"
import { APIContext } from "../context/APIContext.js"

export default function CreateTicketForm({ getTickets }) {
    const [title, setTitle] = useState("")
    const { client } = useContext(APIContext)

    function submitTicket(e) {
        e.preventDefault()
        client.post("tickets/", {
            "title": title
        },
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then((response) => {
                console.log(response)
                setTitle("")
                getTickets()
            })
    }

    return (
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mb-5">
            <legend className="fieldset-legend text-xl sm:text-3xl ">Create a ticket</legend>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="input w-full sm:w-120" name="title" placeholder="What's your issue?" />
            <button onClick={submitTicket} className="btn btn-block btn-neutral mt-3">Submit</button>
        </fieldset>
    )
}
