import { useNavigate } from "react-router";
import useCurrentUser from "../hooks/useCurrentUser";

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate()
    const { data } = useCurrentUser();
    if (!data) navigate("/login");
    return children;
}