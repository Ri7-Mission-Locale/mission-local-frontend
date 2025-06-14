import {Navigate} from "react-router";

export default function ProtectedRoute({ children }) {
    return localStorage.getItem("access_token") ? children : <Navigate to="/signin" replace />;
}