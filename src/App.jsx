import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import UserManagementPage from "./pages/admin/UserManagementPage.jsx";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage.jsx";
import SignInPage from "./pages/authentication/SignInPage.jsx";
import SignUpPage from "./pages/authentication/SignUpPage.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const client = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <Routes>
                    {/* Authentication Routes */}
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/signup" element={<SignUpPage />} />

                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminDashboardPage />} />
                    <Route path="/admin/users" element={<UserManagementPage />} />

                    {/* Default Route
                    <Route path="/" element={<Navigate to="/signin" replace />} />
                    <Route path="*" element={<Navigate to="/signin" replace />} />
                     */}
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
