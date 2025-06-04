import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import SignInPage from "@pages/authentication/SignInPage.jsx";
import SignUpPage from "@pages/authentication/SignUpPage.jsx";
import AdminDashboardPage from "@pages/admin/AdminDashboardPage.jsx";
import UserManagementPage from "@pages/admin/UserManagementPage.jsx";
import UserProfil from "@pages/user/UserProfil.jsx";
import NewsList from "@pages/news/NewsList.jsx";
import NewsDetail from "@pages/news/NewsDetail.jsx";
import NewsAdd from "@pages/news/NewsAdd.jsx";


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

                    {/* User Routes */}
                    <Route path="/user/profil" element={<UserProfil/>} />
                    
                    {/* News Routes */}
                    <Route path="/news/list" element={<NewsList/>} />
                    <Route path="/news/detail/:id" element={<NewsDetail/>} />
                    <Route path="/news/add" element={<NewsAdd/>} />

                    {/* Default Route TODO home */}
                    <Route path="/" element={<Navigate to="/signin" replace />} />
                    <Route path="*" element={<Navigate to="/signin" replace />} />

                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
