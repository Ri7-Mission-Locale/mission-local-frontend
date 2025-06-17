import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminDashboardPage from "@pages/admin/AdminDashboardPage.jsx";
import UserManagementPage from "@pages/admin/UserManagementPage.jsx";
import UserProfil from "@pages/user/UserProfil.jsx";
import NewsList from "@pages/news/NewsList.jsx";
import NewsDetail from "@pages/news/NewsDetail.jsx";
import NewsAdd from "@pages/news/NewsAdd.jsx";
import LoginPage from "@pages/authentication/LoginPage.jsx";
import RegisterPage from "@pages/authentication/RegisterPage.jsx";

const client = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={client}>
            <BrowserRouter>
                <Routes>

                    {/* Authentication routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />


                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminDashboardPage />} />
                    <Route path="/admin/users" element={<UserManagementPage />} />

                    {/* User Routes */}
                    <Route path="/user/profil" element={<UserProfil />} />

                    {/* News Routes */}
                    <Route path="/news/list" element={<NewsList />} />
                    <Route path="/news/detail/:id" element={<NewsDetail />} />
                    <Route path="/news/add" element={<NewsAdd />} />


                    {/* Default Route TODO home */}
                    <Route path="/" element={<Navigate to="/login" replace />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />

                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
