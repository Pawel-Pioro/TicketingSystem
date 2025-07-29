import { useContext } from "react"
import BusinessDashboard from "../components/Dashboard/BusinessDashboard"
import CustomerDashboard from "../components/Dashboard/CustomerDashboard"
import { AuthContext } from "../context/AuthContext.js"

export default function Dashboard() {
    const { user } = useContext(AuthContext)
    return (
        <div>
            {user.is_staff ?
                <BusinessDashboard />
                : <CustomerDashboard />
            }
        </div>
    )
}
