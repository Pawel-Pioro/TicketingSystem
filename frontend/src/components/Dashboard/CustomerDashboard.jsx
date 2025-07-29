import { Link } from "react-router-dom"
import CreateTicketForm from "../CreateTicketForm"

export default function CustomerDashboard() {
    return (
        <div className="grid place-items-center">
            <p className="text-4xl  font-bold my-7">Customer Portal</p>
            <div>
                <p className="text-3xl  font-semibold mb-3">Have an issue?</p>
                <CreateTicketForm />
            </div>
            <p className="text-lg">View your created tickets <Link to="/tickets" className="font-bold underline">here</Link></p>
        </div>
    )
}
