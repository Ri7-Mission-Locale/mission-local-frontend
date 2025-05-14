import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import UserManagementPage from "./pages/admin/UserManagementPage.jsx";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage.jsx";
import LoginPage from "./pages/authentication/LoginPage.jsx";
import SignUpPage from "./pages/authentication/SignUpPage.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const client = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <Routes>
                    {/* Authentication Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />

                    {/* Admin Routes */}
                    <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                    <Route path="/admin/users" element={<UserManagementPage />} />

                    {/* Default Route */}
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
