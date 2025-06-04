import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import SignInPage from "@pages/authentication/SignInPage.jsx";
import SignUpPage from "@pages/authentication/SignUpPage.jsx";
import AdminDashboardPage from "@pages/admin/AdminDashboardPage.jsx";
import UserManagementPage from "@pages/admin/UserManagementPage.jsx";


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

                    {/* Default Route TODO home */}
                    <Route path="/" element={<Navigate to="/signin" replace />} />
                    <Route path="*" element={<Navigate to="/signin" replace />} />

                    {/* User Routes */}
                    <Route path="/user/profil" element={<UserProfil/>} />
                    
                    {/* News Routes */}
                    <Route path="/news/list" element={<NewsList/>} />
                    <Route path="/news/detail/:id" element={<NewsDetail/>} />
                    <Route path="/news/add" element={<NewsAdd/>} />

                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
