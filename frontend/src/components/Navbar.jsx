import { useContext } from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
    const { user, logoutHandler } = useContext(AuthContext)
    const navigate = useNavigate()

    function logoutOnClick() {
        logoutHandler()
        navigate('/login')
    }

    return (
        <div className="navbar bg-base-300 shadow-lg flex justify-around">
            <div className="">
                <Link to="/" className="btn btn-ghost text-xl">Ticketing</Link>
                <ul className="menu menu-horizontal px-1 md:pl-10">
                    <li>
                        {user.logged_in === true
                            ? (
                                <Link to="/tickets">Tickets</Link>
                            )
                            : (
                                <>
                                </>
                            )
                        }
                    </li>
                </ul>
            </div>
            {
                user.logged_in === true
                    ? (
                        <details className="dropdown">
                            <summary className="btn m-1">{user.username}</summary>
                            <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                <li><a onClick={logoutOnClick}>Logout</a></li>
                            </ul>
                        </details>
                    )
                    : (
                        <>
                            <Link to="/login" className="btn mr-[5%]">Sign in</Link>
                        </>
                    )
            }
        </div >
    )
}
