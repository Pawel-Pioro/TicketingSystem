import { Link } from "react-router-dom"


export default function LandingPage() {
    return (
        <div className="">
            <div>
                <p className="text-4xl text-center font-bold mt-[10vh]">Welcome</p>
                <p className="text-3xl text-center font-semibold">to the Ticketing System</p>
            </div>
            <div className="my-10 flex items-center flex-col">
                <p className="text-3xl font-medium mb-3">Have an issue?</p>
                <p className="text-2xl">Create an account or login to an existing one</p>
                <Link to="/login" className="btn btn-neutral mt-4 text-xl px-10 mt-[5vh]">Login</Link>
            </div>
        </div>
    )
}
